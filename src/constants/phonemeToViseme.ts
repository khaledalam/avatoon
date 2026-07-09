/**
 * Maps a viseme code (as used in `visemeJson`) to a morph-target name on the
 * model. Both the legacy single-letter codes (A–K, X) and the standard
 * Oculus / Ready Player Me viseme names are accepted, so output from the
 * `fromAzureVisemes` / `fromPollySpeechMarks` / `fromRhubarb` helpers works
 * directly.
 */
export const phonemeToViseme: Record<string, string> = {
  // Legacy single-letter codes
  A: 'viseme_aa', // "a" as in "apple"
  B: 'viseme_PP', // lips together: p, b, m
  C: 'viseme_CH', // ch, sh, j
  D: 'viseme_DD', // d, t, th
  E: 'viseme_E', // eh, ae
  F: 'viseme_FF', // f, v
  G: 'viseme_kk', // g, k
  H: 'viseme_sil', // silence or breath
  I: 'viseme_I', // "ee" sound
  J: 'viseme_RR', // r, l, y
  K: 'viseme_U', // "oo", "u" (was viseme_oo, which standard rigs don't have)
  X: 'viseme_sil', // default fallback / silent frame

  // Oculus / Ready Player Me viseme names (accepted as codes directly)
  sil: 'viseme_sil',
  PP: 'viseme_PP',
  FF: 'viseme_FF',
  TH: 'viseme_TH',
  DD: 'viseme_DD',
  kk: 'viseme_kk',
  CH: 'viseme_CH',
  SS: 'viseme_SS',
  nn: 'viseme_nn',
  RR: 'viseme_RR',
  aa: 'viseme_aa',
  O: 'viseme_O',
  U: 'viseme_U',
};
