import {
  parseVisemes,
  findActiveViseme,
  blinkPulse,
} from '../src/utils/lipSync';
import { phonemeToViseme } from '../src/constants/phonemeToViseme';

describe('parseVisemes', () => {
  it('maps codes to morph names and drops unresolved codes', () => {
    const out = parseVisemes(
      {
        visemes: [
          { time: 0, viseme: 'A' }, // → viseme_aa
          { time: 1, viseme: 'ZZ' }, // unknown → dropped
          { time: 2, viseme: null }, // null → dropped
        ],
      },
      phonemeToViseme
    );
    expect(out).toEqual([{ time: 0, viseme: 'viseme_aa' }]);
  });
});

describe('findActiveViseme', () => {
  const data = [
    { time: 0, viseme: 'viseme_sil' },
    { time: 1, viseme: 'viseme_aa' },
    { time: 2, viseme: 'viseme_PP' },
  ];

  it('returns the most recent viseme at or before the time', () => {
    expect(findActiveViseme(data, 1.5)?.viseme).toBe('viseme_aa');
    expect(findActiveViseme(data, 2)?.viseme).toBe('viseme_PP');
  });

  it('returns null before the first keyframe', () => {
    expect(findActiveViseme(data, -1)).toBeNull();
    expect(findActiveViseme([], 5)).toBeNull();
  });
});

describe('blinkPulse', () => {
  it('peaks at the middle and is zero at the edges', () => {
    expect(blinkPulse(0, 0.15)).toBe(0);
    expect(blinkPulse(0.075, 0.15)).toBeCloseTo(1);
    expect(blinkPulse(0.15, 0.15)).toBe(0);
  });

  it('is zero outside the blink window', () => {
    expect(blinkPulse(-0.1)).toBe(0);
    expect(blinkPulse(0.5)).toBe(0);
  });
});
