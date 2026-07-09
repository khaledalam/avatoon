/** Goal-based motion preset applied to the avatar. */
export type AvatoonGoal = 'Normal' | 'Muscle' | 'Sleep';

/**
 * Imperative handle exposed via a `ref` on `<Avatoon>`, for controlling
 * voice playback from outside the component.
 */
export interface AvatoonHandle {
  /** Start audio playback and lip-sync. */
  play: () => void;
  /** Stop audio playback and lip-sync. */
  stop: () => void;
  /** Toggle playback on/off. */
  toggle: () => void;
}

export interface VisemeData {
  /** Time-ordered viseme keyframes (see the phoneme-to-viseme map). */
  visemes: Array<{ time: number; viseme: string | null }>;
  /** Base64-encoded WAV audio played in sync with the visemes. */
  audio_base64?: string;
}

export interface RawVisemeEntry {
  time: number;
  viseme: string | null;
}

export interface AvatoonModelProps {
  url: string;
  goal?: AvatoonGoal | null;
  onRenderComplete?: () => void;
  shouldPlay: boolean;
  visemeJson?: VisemeData;
}

/** Camera framing options shared by the avatar components. */
export interface AvatoonCameraProps {
  /** Perspective camera vertical field-of-view. Defaults to `17`. */
  fov?: number;
  /** Camera position `[x, y, z]`. Defaults to `[0, 1.5, 2.2]`. */
  cameraPosition?: [number, number, number];
  /** OrbitControls look-at target `[x, y, z]`. Defaults to `[0, 1.2, 0]`. */
  cameraTarget?: [number, number, number];
}

export interface AvatoonProps extends AvatoonCameraProps {
  /** URL to the `.glb` avatar file (T1 or T2). */
  glbUrl: string;
  /** Goal-based motion preset. Defaults to `"Normal"`. */
  goal?: AvatoonGoal | null;
  /** Fired once when the avatar has finished its first render. */
  onRenderComplete?: () => void;
  /** Fired if the avatar model fails to load (e.g. a bad `glbUrl`). */
  onError?: (error: Error) => void;
  /** Viseme keyframes (and optional audio) used to drive lip-sync. */
  visemeJson?: VisemeData;
  /** Render a built-in play/stop voice button in the scene. Defaults to `false`. */
  showPlayVoiceButton?: boolean;
}
