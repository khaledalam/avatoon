/**
 * Platform-agnostic audio boundary used to drive lip-sync.
 *
 * The web build backs this with an `HTMLAudioElement`; the React Native build
 * backs it with `expo-av`. `AvatoonModel` only ever talks to this interface, so
 * the lip-sync clock (`getCurrentTime`) works identically on both platforms.
 */
export interface AudioClock {
  /**
   * Start (or resume) playback. Resolves once playback has begun; may reject if
   * the platform blocks autoplay until a user gesture.
   */
  play(): Promise<void>;
  /** Pause playback, retaining the current position. */
  pause(): void;
  /**
   * Current playback position in **seconds**. Read every frame to align visemes
   * with the audio. Returns `0` before playback starts.
   */
  getCurrentTime(): number;
  /** Stop playback and release all underlying resources. */
  dispose(): void;
}

/** Where an {@link AudioClock} sources its audio from. */
export interface AudioSource {
  /** Base64-encoded WAV payload (no data-URI prefix). */
  audioBase64?: string;
  /** A direct audio URL/URI (takes precedence over {@link audioBase64}). */
  uri?: string;
}

/**
 * Factory for an {@link AudioClock}. Returns `null` when audio is unavailable
 * (e.g. server-side rendering, or no source provided), so callers can no-op.
 */
export type CreateAudioClock = (source: AudioSource) => AudioClock | null;
