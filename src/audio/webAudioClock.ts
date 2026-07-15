import type { AudioClock, CreateAudioClock } from './types';

/**
 * Web {@link AudioClock} backed by `HTMLAudioElement`. Preserves the original
 * `AvatoonModel` behaviour: a base64 WAV is played from a `data:` URI and the
 * element's `currentTime` drives the viseme clock.
 */
export const createAudioClock: CreateAudioClock = source => {
  // Guard for SSR / non-DOM environments — mirrors the previous inline check.
  if (typeof window === 'undefined' || typeof Audio === 'undefined') {
    return null;
  }

  const uri =
    source.uri ??
    (source.audioBase64 ? `data:audio/wav;base64,${source.audioBase64}` : null);
  if (!uri) return null;

  const el = new Audio(uri);

  const clock: AudioClock = {
    play: () => el.play(),
    pause: () => el.pause(),
    getCurrentTime: () => el.currentTime,
    dispose: () => {
      el.pause();
      el.src = '';
    },
  };

  return clock;
};
