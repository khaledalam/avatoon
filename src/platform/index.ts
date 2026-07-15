/**
 * Web platform bindings.
 *
 * Every renderer/audio dependency that differs between web and React Native is
 * funnelled through this module. The native build swaps in `index.native.tsx`
 * (resolved by extension priority), so the component tree itself stays
 * platform-agnostic — it only ever imports from `../platform`.
 */
export { Canvas, useFrame, useThree } from '@react-three/fiber';
export { OrbitControls, useGLTF, Environment } from '@react-three/drei';
export { createAudioClock } from '../audio/webAudioClock';
export type { AudioClock, AudioSource } from '../audio/types';
