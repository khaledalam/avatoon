import type { VisemeData } from '../types';

/**
 * Helpers that convert viseme/mouth-shape timing from common speech engines
 * into Avatoon's `visemeJson` format. Each returns `{ visemes: [...] }` with
 * `time` in **seconds** and a `viseme` code understood by `phonemeToViseme`.
 */

// ---------------------------------------------------------------------------
// Azure Cognitive Services (Speech SDK viseme events)
// ---------------------------------------------------------------------------

export interface AzureVisemeEvent {
  /** Azure viseme id (0–21). */
  visemeId: number;
  /** Audio offset in 100-nanosecond ticks (as provided by the Speech SDK). */
  audioOffset: number;
}

// Azure viseme id → Oculus viseme code.
const AZURE_VISEME_TO_CODE: Record<number, string> = {
  0: 'sil',
  1: 'aa',
  2: 'aa',
  3: 'O',
  4: 'E',
  5: 'RR',
  6: 'I',
  7: 'U',
  8: 'O',
  9: 'aa',
  10: 'O',
  11: 'aa',
  12: 'sil',
  13: 'RR',
  14: 'nn',
  15: 'SS',
  16: 'CH',
  17: 'TH',
  18: 'FF',
  19: 'DD',
  20: 'kk',
  21: 'PP',
};

/** Convert Azure Speech SDK viseme events into `visemeJson`. */
export function fromAzureVisemes(events: AzureVisemeEvent[]): VisemeData {
  return {
    visemes: events.map(e => ({
      time: e.audioOffset / 1e7, // 100-ns ticks → seconds
      viseme: AZURE_VISEME_TO_CODE[e.visemeId] ?? 'sil',
    })),
  };
}

// ---------------------------------------------------------------------------
// AWS Polly (speech marks of type "viseme")
// ---------------------------------------------------------------------------

export interface PollySpeechMark {
  type?: string;
  /** Time offset in milliseconds. */
  time: number;
  /** Polly viseme value. */
  value: string;
}

const POLLY_VISEME_TO_CODE: Record<string, string> = {
  p: 'PP',
  t: 'DD',
  S: 'CH',
  T: 'TH',
  f: 'FF',
  k: 'kk',
  i: 'I',
  r: 'RR',
  s: 'SS',
  u: 'U',
  '@': 'E',
  a: 'aa',
  e: 'E',
  E: 'E',
  o: 'O',
  O: 'O',
  sil: 'sil',
};

/** Convert AWS Polly speech marks into `visemeJson` (non-viseme marks ignored). */
export function fromPollySpeechMarks(marks: PollySpeechMark[]): VisemeData {
  return {
    visemes: marks
      .filter(m => m.type === undefined || m.type === 'viseme')
      .map(m => ({
        time: m.time / 1000, // ms → seconds
        viseme: POLLY_VISEME_TO_CODE[m.value] ?? 'sil',
      })),
  };
}

// ---------------------------------------------------------------------------
// Rhubarb Lip Sync (JSON output with mouthCues)
// ---------------------------------------------------------------------------

export interface RhubarbMouthCue {
  /** Start time in seconds. */
  start: number;
  end: number;
  /** Rhubarb mouth shape (A–H, X). */
  value: string;
}

export interface RhubarbOutput {
  mouthCues: RhubarbMouthCue[];
}

const RHUBARB_SHAPE_TO_CODE: Record<string, string> = {
  A: 'PP', // closed: p, b, m
  B: 'I', // slightly open, teeth: consonants / "ee"
  C: 'E', // open: eh, ae
  D: 'aa', // wide open: ah
  E: 'O', // rounded: oh
  F: 'U', // puckered: oo, w
  G: 'FF', // upper teeth on lower lip: f, v
  H: 'nn', // l
  X: 'sil', // idle / rest
};

/** Convert Rhubarb Lip Sync output (or its `mouthCues`) into `visemeJson`. */
export function fromRhubarb(
  input: RhubarbOutput | RhubarbMouthCue[]
): VisemeData {
  const cues = Array.isArray(input) ? input : input.mouthCues;
  return {
    visemes: cues.map(cue => ({
      time: cue.start, // already in seconds
      viseme: RHUBARB_SHAPE_TO_CODE[cue.value] ?? 'sil',
    })),
  };
}
