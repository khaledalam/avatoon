export interface VisemeData {
  visemes: Array<{ time: number; viseme: string | null }>;
  audio_base64?: string;
}

export interface RawVisemeEntry {
  time: number;
  viseme: string | null;
}

export interface AvatoonModelProps {
  url: string;
  goal?: string | null;
  onRenderComplete?: () => void;
  shouldPlay: boolean;
  visemeJson?: VisemeData;
}

export interface AvatoonProps {
  glbUrl: string;
  goal?: string | null;
  onRenderComplete?: () => void;
  visemeJson?: VisemeData;
  showPlayVoiceButton?: boolean;
}
