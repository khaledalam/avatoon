/** Goal-based motion preset applied to the avatar. */
export type AvatoonGoal = 'Normal' | 'Muscle' | 'Sleep';

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

export interface AvatoonProps {
  /** URL to the `.glb` avatar file (T1 or T2). */
  glbUrl: string;
  /** Goal-based motion preset. Defaults to `"Normal"`. */
  goal?: AvatoonGoal | null;
  /** Fired once when the avatar has finished its first render. */
  onRenderComplete?: () => void;
  /** Viseme keyframes (and optional audio) used to drive lip-sync. */
  visemeJson?: VisemeData;
  /** Render a built-in play/stop voice button in the scene. Defaults to `false`. */
  showPlayVoiceButton?: boolean;
}
