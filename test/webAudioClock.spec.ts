import { createAudioClock } from '../src/audio/webAudioClock';

describe('createAudioClock (web)', () => {
  it('returns null when no source is provided', () => {
    expect(createAudioClock({})).toBeNull();
  });

  it('builds a clock from a base64 WAV source', () => {
    const clock = createAudioClock({ audioBase64: 'UklGRg==' });
    expect(clock).not.toBeNull();
    // Position starts at 0 before playback.
    expect(clock!.getCurrentTime()).toBe(0);
  });

  it('builds a clock from a direct uri source', () => {
    const clock = createAudioClock({ uri: 'https://example.com/a.wav' });
    expect(clock).not.toBeNull();
    expect(typeof clock!.getCurrentTime()).toBe('number');
  });

  it('pause and dispose are safe to call without throwing', () => {
    const clock = createAudioClock({ audioBase64: 'UklGRg==' });
    expect(() => {
      clock!.pause();
      clock!.dispose();
    }).not.toThrow();
  });
});
