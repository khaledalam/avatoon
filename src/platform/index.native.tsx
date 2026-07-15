/**
 * React Native platform bindings (resolved by the native build via extension
 * priority: `.native.tsx` wins over `.ts`).
 *
 * These come from the `/native` entry points, which render through `expo-gl`
 * instead of a DOM `<canvas>`. The consuming app must install the native-capable
 * peers (see `package.json` `peerDependenciesMeta`): `@react-three/fiber`
 * (native entry), `@react-three/drei`, `expo`, `expo-gl`, `expo-av`,
 * `expo-asset`, and `expo-file-system`.
 */
export { Canvas, useFrame, useThree } from '@react-three/fiber/native';
export { OrbitControls, useGLTF, Environment } from '@react-three/drei/native';
export { createAudioClock } from '../audio/expoAudioClock';
export type { AudioClock, AudioSource } from '../audio/types';
