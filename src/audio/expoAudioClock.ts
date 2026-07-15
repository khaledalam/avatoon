import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import type { AudioClock, AudioSource, CreateAudioClock } from './types';

// Unique-per-clip temp filenames without relying on Date/Math at module load.
let fileCounter = 0;

/**
 * React Native {@link AudioClock} backed by `expo-av`.
 *
 * Two platform differences from the web version are handled here:
 *  1. `expo-av` cannot reliably play `data:` URIs, so a base64 WAV is written to
 *     a temp file via `expo-file-system` first.
 *  2. There is no synchronous `currentTime`; position arrives via playback
 *     status updates. We cache the last reported position and interpolate with
 *     wall-clock time so `getCurrentTime()` stays smooth every frame.
 */
export const createAudioClock: CreateAudioClock = (source: AudioSource) => {
  const inlineUri = source.uri ?? null;
  const base64 = source.audioBase64 ?? null;
  if (!inlineUri && !base64) return null;

  let sound: Audio.Sound | null = null;
  let loading: Promise<void> | null = null;
  let disposed = false;

  let positionSec = 0;
  let lastSyncAt = 0; // Date.now() when positionSec was last reported
  let playing = false;

  const now = () => (typeof Date !== 'undefined' ? Date.now() : 0);

  const resolveUri = async (): Promise<string> => {
    if (inlineUri) return inlineUri;
    const fileUri = `${FileSystem.cacheDirectory}avatoon-${fileCounter++}.wav`;
    await FileSystem.writeAsStringAsync(fileUri, base64 as string, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return fileUri;
  };

  const ensureLoaded = async (): Promise<void> => {
    if (sound || disposed) return;
    if (!loading) {
      loading = (async () => {
        const uri = await resolveUri();
        if (disposed) return;
        const created = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: false }
        );
        if (disposed) {
          await created.sound.unloadAsync();
          return;
        }
        sound = created.sound;
        sound.setOnPlaybackStatusUpdate(status => {
          if (!status.isLoaded) return;
          positionSec = (status.positionMillis ?? 0) / 1000;
          lastSyncAt = now();
          playing = status.isPlaying ?? false;
        });
      })();
    }
    await loading;
  };

  const clock: AudioClock = {
    play: async () => {
      await ensureLoaded();
      if (!sound || disposed) return;
      playing = true;
      lastSyncAt = now();
      await sound.playAsync();
    },
    pause: () => {
      playing = false;
      void sound?.pauseAsync();
    },
    getCurrentTime: () => {
      // Interpolate between status updates so lip-sync doesn't step at the
      // status interval (~100ms).
      if (playing && lastSyncAt) {
        return positionSec + (now() - lastSyncAt) / 1000;
      }
      return positionSec;
    },
    dispose: () => {
      disposed = true;
      playing = false;
      const s = sound;
      sound = null;
      if (s) {
        s.setOnPlaybackStatusUpdate(null);
        void s.unloadAsync();
      }
    },
  };

  return clock;
};
