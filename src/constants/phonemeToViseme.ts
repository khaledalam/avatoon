export const phonemeToViseme: Record<string, string> = {
  A: 'viseme_aa', // e.g., "a" as in "apple"
  B: 'viseme_PP', // lips together
  C: 'viseme_CH', // "ch", "sh", "j"
  D: 'viseme_DD', // "d", "t", "th"
  E: 'viseme_E', // "eh", "ae"
  F: 'viseme_FF', // "f", "v"
  G: 'viseme_kk', // "g", "k"
  H: 'viseme_sil', // silence or breath
  I: 'viseme_I', // "ee" sound
  J: 'viseme_RR', // "r", "l", "y"
  K: 'viseme_oo', // "oo", "u"
  X: 'viseme_sil', // default fallback or silent frame
};
