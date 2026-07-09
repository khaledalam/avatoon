import type { VisemeData } from '../types';

export interface ParsedViseme {
  time: number;
  viseme: string | null;
}

/**
 * Maps the raw `visemeJson` entries to morph-target names using the provided
 * code→morph map, dropping any codes that don't resolve to a morph.
 */
export function parseVisemes(
  visemeJson: VisemeData,
  map: Record<string, string>
): ParsedViseme[] {
  return visemeJson.visemes
    .map(entry => ({
      time: entry.time,
      viseme: map[entry.viseme || ''] || null,
    }))
    .filter(v => v.viseme !== null);
}

/**
 * Returns the most recent viseme at or before `currentTime` (the timeline is
 * scanned newest-first), or `null` if none applies yet.
 */
export function findActiveViseme(
  visemeData: ParsedViseme[],
  currentTime: number
): ParsedViseme | null {
  for (let i = visemeData.length - 1; i >= 0; i--) {
    if (visemeData[i].time <= currentTime) return visemeData[i];
  }
  return null;
}

/**
 * Triangular blink influence (0 → 1 → 0) for a given time `into` the blink,
 * over `duration` seconds. Returns 0 outside the blink window.
 */
export function blinkPulse(into: number, duration = 0.15): number {
  if (into < 0 || into > duration) return 0;
  return 1 - Math.abs((into / duration) * 2 - 1);
}
