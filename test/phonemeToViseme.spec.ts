import { phonemeToViseme } from '../src/constants/phonemeToViseme';

describe('phonemeToViseme', () => {
  it('maps every code to a non-empty viseme_ morph-target name', () => {
    for (const target of Object.values(phonemeToViseme)) {
      expect(typeof target).toBe('string');
      expect(target).toMatch(/^viseme_/);
    }
  });

  it('maps the silence codes H and X to viseme_sil', () => {
    expect(phonemeToViseme.H).toBe('viseme_sil');
    expect(phonemeToViseme.X).toBe('viseme_sil');
  });

  it('exposes the expected vowel/consonant codes', () => {
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I', 'J', 'K'].forEach(code => {
      expect(phonemeToViseme[code]).toBeDefined();
    });
  });

  it('maps A (open vowel) to viseme_aa', () => {
    expect(phonemeToViseme.A).toBe('viseme_aa');
  });

  it('returns undefined for an unknown code', () => {
    expect(phonemeToViseme['Z']).toBeUndefined();
  });
});
