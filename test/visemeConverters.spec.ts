import {
  fromAzureVisemes,
  fromPollySpeechMarks,
  fromRhubarb,
} from '../src/converters/visemeConverters';
import { phonemeToViseme } from '../src/constants/phonemeToViseme';

describe('viseme converters', () => {
  it('converts Azure viseme events (ticks → seconds)', () => {
    const out = fromAzureVisemes([
      { visemeId: 0, audioOffset: 0 },
      { visemeId: 21, audioOffset: 5_000_000 }, // 0.5s, "PP"
      { visemeId: 6, audioOffset: 10_000_000 }, // 1.0s, "I"
    ]);
    expect(out.visemes).toEqual([
      { time: 0, viseme: 'sil' },
      { time: 0.5, viseme: 'PP' },
      { time: 1, viseme: 'I' },
    ]);
  });

  it('converts Polly speech marks (ms → seconds) and ignores non-viseme marks', () => {
    const out = fromPollySpeechMarks([
      { type: 'word', time: 0, value: 'hi' },
      { type: 'viseme', time: 100, value: 'p' },
      { type: 'viseme', time: 250, value: 'i' },
    ]);
    expect(out.visemes).toEqual([
      { time: 0.1, viseme: 'PP' },
      { time: 0.25, viseme: 'I' },
    ]);
  });

  it('converts Rhubarb mouthCues and accepts the raw array', () => {
    const cues = [
      { start: 0, end: 0.2, value: 'X' },
      { start: 0.2, end: 0.4, value: 'D' },
    ];
    expect(fromRhubarb({ mouthCues: cues }).visemes).toEqual([
      { time: 0, viseme: 'sil' },
      { time: 0.2, viseme: 'aa' },
    ]);
    expect(fromRhubarb(cues).visemes).toHaveLength(2);
  });

  it('every produced code maps to a real morph target', () => {
    const codes = [
      ...fromAzureVisemes(
        Array.from({ length: 22 }, (_, i) => ({ visemeId: i, audioOffset: 0 }))
      ).visemes,
      ...fromRhubarb(
        'ABCDEFGHX'.split('').map(v => ({ start: 0, end: 0, value: v }))
      ).visemes,
    ];
    for (const { viseme } of codes) {
      expect(phonemeToViseme[viseme as string]).toMatch(/^viseme_/);
    }
  });
});
