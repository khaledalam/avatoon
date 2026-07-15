# avatoon — React Native (Expo) example

Minimal Expo app rendering `<Avatoon>` on React Native. The 3D scene runs on
`@react-three/fiber/native` (via `expo-gl`) and audio plays through `expo-av`.
avatoon picks these automatically through its `react-native` package export
condition — you import from `'avatoon'` exactly as on web.

## Setup

```bash
npx create-expo-app avatoon-native --template blank-typescript
cd avatoon-native

# avatoon + the native peers it needs
npx expo install expo-gl expo-av expo-asset expo-file-system \
  @react-three/fiber @react-three/drei three
npm install avatoon
```

Then drop [`App.tsx`](./App.tsx) into your project and run:

```bash
npx expo start
```

## How it differs from web

| | Web | React Native |
|---|---|---|
| Renderer | `@react-three/fiber` (DOM `<canvas>`) | `@react-three/fiber/native` (`expo-gl`) |
| Audio | `HTMLAudioElement` | `expo-av` (base64 WAV → temp file via `expo-file-system`) |
| Play control | `showPlayVoiceButton` or `ref` | `ref` only (the built-in button is DOM) |

## Notes & caveats

- **Playback is imperative on native.** The DOM play button (`showPlayVoiceButton`)
  is web-only; drive playback with the `ref` (`play()` / `stop()` / `toggle()`)
  and your own RN `Pressable`, as in `App.tsx`.
- **`environmentPreset` / HDR lighting** relies on `@react-three/drei/native`,
  whose `Environment` support is more limited than on web. Prefer simple
  lighting (`ambientLight` is added for you) if you hit issues.
- **Models** load over the network via `useGLTF`; make sure the `.glb` URL is
  reachable from the device/simulator.
- R3F's native entry is most battle-tested on the v8 line (React 18 / Expo 51),
  which is what this example pins.
