import { createAudioClock } from '../src/audio/expoAudioClock';
// Import through the same module mapper the code-under-test uses, so we share
// the one mock singleton (jest.requireMock would hand back a separate copy).
import * as ExpoAv from 'expo-av';
import * as ExpoFs from 'expo-file-system';

/* eslint-disable @typescript-eslint/no-explicit-any */
const expoAv: any = ExpoAv;
const fs: any = ExpoFs;

describe('createAudioClock (native / expo-av)', () => {
  beforeEach(() => {
    expoAv.__reset();
    fs.writeAsStringAsync.mockClear();
  });

  it('returns null when no source is provided', () => {
    expect(createAudioClock({})).toBeNull();
  });

  it('writes a base64 WAV to a temp file and plays it', async () => {
    const clock = createAudioClock({ audioBase64: 'UklGRg==' })!;
    expect(clock).not.toBeNull();

    await clock.play();

    // base64 payload written to the cache dir with Base64 encoding
    expect(fs.writeAsStringAsync).toHaveBeenCalledTimes(1);
    const [uri, contents, opts] = fs.writeAsStringAsync.mock.calls[0];
    expect(uri).toContain('file:///cache/');
    expect(contents).toBe('UklGRg==');
    expect(opts.encoding).toBe('base64');

    // sound created and played
    expect(expoAv.Audio.Sound.createAsync).toHaveBeenCalledTimes(1);
    expect(expoAv.__soundInstances[0].playAsync).toHaveBeenCalledTimes(1);
  });

  it('plays a direct uri source without writing a temp file', async () => {
    const clock = createAudioClock({ uri: 'https://example.com/a.wav' })!;
    await clock.play();
    expect(fs.writeAsStringAsync).not.toHaveBeenCalled();
    const [source] = expoAv.Audio.Sound.createAsync.mock.calls[0];
    expect(source.uri).toBe('https://example.com/a.wav');
  });

  it('reports 0 before any playback status arrives', () => {
    const clock = createAudioClock({ uri: 'x' })!;
    expect(clock.getCurrentTime()).toBe(0);
  });

  it('tracks and interpolates position from status updates', async () => {
    const clock = createAudioClock({ uri: 'x' })!;
    await clock.play();
    expoAv.__soundInstances[0].__emit({
      isLoaded: true,
      positionMillis: 2000,
      isPlaying: true,
    });
    // At least the reported 2s, plus any interpolated wall-clock delta.
    expect(clock.getCurrentTime()).toBeGreaterThanOrEqual(2);
  });

  it('pauses without interpolating further', async () => {
    const clock = createAudioClock({ uri: 'x' })!;
    await clock.play();
    expoAv.__soundInstances[0].__emit({
      isLoaded: true,
      positionMillis: 1500,
      isPlaying: false,
    });
    clock.pause();
    expect(expoAv.__soundInstances[0].pauseAsync).toHaveBeenCalled();
    expect(clock.getCurrentTime()).toBeCloseTo(1.5, 5);
  });

  it('ignores unloaded status updates', async () => {
    const clock = createAudioClock({ uri: 'x' })!;
    await clock.play();
    expoAv.__soundInstances[0].__emit({ isLoaded: false });
    // paused (isPlaying never became true via a loaded status) → stays 0
    clock.pause();
    expect(clock.getCurrentTime()).toBe(0);
  });

  it('unloads the sound on dispose', async () => {
    const clock = createAudioClock({ uri: 'x' })!;
    await clock.play();
    const sound = expoAv.__soundInstances[0];
    clock.dispose();
    expect(sound.setOnPlaybackStatusUpdate).toHaveBeenLastCalledWith(null);
    expect(sound.unloadAsync).toHaveBeenCalled();
  });
});
