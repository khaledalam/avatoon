# 🧠 Avatoon


[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]


**Avatoon** is a lightweight React Three Fiber component for rendering animated 3D avatars with real-time viseme-driven lip-sync. It supports lifelike head movements, morph target control, and optional goal-based gestures (e.g., flexing, sleeping), making it ideal for voice assistants, interactive characters, or storytelling apps.

### 🎮 [**Try the live demo →**](https://khaledalam.net/avatoon/)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/khaledalam/avatoon/tree/main/example)

<img src="https://raw.githubusercontent.com/khaledalam/avatoon/main/test/assets/avatoon.gif" />

[demo video](https://youtu.be/9ODqu2EZvtw)


## ✨ Features
- 🎤 Real-time lip-sync using phoneme-viseme mapping  
- 🧍 Subtle head motion animation while talking  
- 👁️ Automatic eye-blinking (when the model exposes blink morph targets)  
- 🎛️ Imperative `play()` / `stop()` control via a `ref`  
- 🌐 GLTF model support via `useGLTF`  
- ⚛️ Plug-and-play with React Three Fiber + Drei  
- 🎯 Goal-based gestures like "Muscle" or "Sleep"

## 📦 Installation

```bash
npm install avatoon
```

### Requirements (peer dependencies)

Avatoon builds on React and the React Three Fiber ecosystem. Install these
alongside it if your project doesn't already have them:

```bash
npm install react react-dom three @react-three/fiber @react-three/drei
```

| Peer dependency       | Supported version |
| --------------------- | ----------------- |
| `react` / `react-dom` | `>=18`            |
| `three`               | `>=0.153.0`       |
| `@react-three/fiber`  | `>=8.0.0`         |
| `@react-three/drei`   | `>=9.0.0`         |

> Runs in any browser with WebGL support. Written in TypeScript — type
> definitions ship with the package.

## 🚀 Usage

### `Avatoon` — full avatar with audio-synced lip-sync

```jsx
import { Avatoon } from "avatoon";

const visemeJson = {
  visemes: [
    { time: 0, viseme: "X" },
    { time: 1.3, viseme: "A" },
    { time: 1.367, viseme: "C" },
  ],
  audio_base64: "", // base64-encoded WAV (optional)
};

export default function App() {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <Avatoon
        glbUrl="https://raw.githubusercontent.com/khaledalam/avatoon/main/test/assets/placeholder-avatar.glb"
        goal="Normal"
        visemeJson={visemeJson}
        showPlayVoiceButton
        onRenderComplete={() => console.log("Render Completed!")}
      />
    </div>
  );
}
```

### `LipSyncAvatoon` — standalone lip-sync (no audio required)

A self-contained component with a built-in Start/Stop button that animates
procedural mouth movement. Great for quick demos or "talking head" idle states.

```jsx
import { LipSyncAvatoon } from "avatoon";

export default function App() {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <LipSyncAvatoon glbUrl="/avatar.glb" />
    </div>
  );
}
```

### Imperative control (ref)

Drive playback from your own UI instead of the built-in button by passing a
`ref` — it exposes `play()`, `stop()`, and `toggle()`:

```jsx
import { useRef } from "react";
import { Avatoon, type AvatoonHandle } from "avatoon";

function App() {
  const avatar = useRef<AvatoonHandle>(null);

  return (
    <>
      <button onClick={() => avatar.current?.play()}>Speak</button>
      <button onClick={() => avatar.current?.stop()}>Stop</button>
      <div style={{ width: "100%", height: 400 }}>
        <Avatoon ref={avatar} glbUrl="/avatar.glb" visemeJson={visemeJson} />
      </div>
    </>
  );
}
```

### To run the example app locally:
```bash
npm run example
```

## 🧩 API

### `Avatoon(props)`

| Prop                  | Type         | Default      | Description                                            |
| --------------------- | ------------ | ------------ | ------------------------------------------------------ |
| `glbUrl`              | `string`     | *(required)* | URL to the `.glb` avatar file (T1 or T2)               |
| `goal`                | `AvatoonGoal`| `"Normal"`   | Motion preset: `"Normal"`, `"Muscle"`, or `"Sleep"`    |
| `onRenderComplete`    | `() => void` | `undefined`  | Callback fired when avatar finishes rendering          |
| `visemeJson`          | `VisemeData` | `undefined`  | JSON structure for syncing visemes with audio playback |
| `showPlayVoiceButton` | `boolean`    | `false`      | If true, renders a play/stop voice button in the scene |
| `fov`                 | `number`     | `24`         | Camera vertical field-of-view                          |
| `cameraPosition`      | `[number, number, number]` | `[0, 1.45, 2.3]` | Camera position `[x, y, z]`             |
| `cameraTarget`        | `[number, number, number]` | `[0, 1.35, 0]`   | OrbitControls look-at target `[x, y, z]` |

> Tune `fov` / `cameraPosition` / `cameraTarget` to frame your own avatar model.
> You can also drive playback imperatively via a [`ref`](#imperative-control-ref).

### `LipSyncAvatoon(props)`

A lightweight, self-contained variant that drives procedural mouth movement
(no `visemeJson` or audio needed) and renders its own Start/Stop button.

| Prop             | Type     | Default        | Description                          |
| ---------------- | -------- | -------------- | ------------------------------------ |
| `glbUrl`         | `string` | `"/avatar.glb"` | URL to the `.glb` avatar file (T2)  |
| `fov`            | `number` | `24`           | Camera vertical field-of-view        |
| `cameraPosition` | `[number, number, number]` | `[0, 1.45, 2.3]` | Camera position `[x, y, z]`  |
| `cameraTarget`   | `[number, number, number]` | `[0, 1.35, 0]`   | OrbitControls look-at target |

## 👤 Avatar Types
- T1 (Static Face - Realistic)
    - Most photorealistic
    - No facial morphing
    - Lightweight
    - <img src="https://raw.githubusercontent.com/khaledalam/avatoon/main/test/assets/V1_bg.jpg" width="100"/>
- T2 (Blendshape Face - Expressive)
  - Separate eyeballs and mouth
  - Supports morph targets / ARKit visemes
  - Slightly less realistic but animatable
  - <img src="https://raw.githubusercontent.com/khaledalam/avatoon/main/test/assets/V2_bg.jpg" width="100"/>

## 📘 Types

```ts
interface VisemeData {
  visemes: Array<{ time: number; viseme: string | null }>;
  audio_base64?: string;
}
```

## 🎚️ Generating viseme data

`visemeJson` is what drives the mouth animation. Each entry pairs a **`time`**
(in seconds, from the start of the audio) with a single-letter **viseme code**.
Codes are mapped onto the model's morph targets; unknown or silent codes simply
rest the mouth.

| Code       | Mouth shape / example sound   |
| ---------- | ----------------------------- |
| `A`        | open — "**a**" as in *apple*  |
| `B`        | lips together — *p, b, m*     |
| `C`        | *ch, sh, j*                   |
| `D`        | *d, t, th*                    |
| `E`        | "*eh*", "*ae*"                |
| `F`        | *f, v*                        |
| `G`        | *g, k*                        |
| `I`        | "*ee*"                        |
| `J`        | *r, l, y*                     |
| `K`        | "*oo*", "*u*"                 |
| `H` / `X`  | silence / rest                |

Entries must be ordered by ascending `time`. Optionally provide the spoken audio
as a base64-encoded WAV via `audio_base64` to play it in sync (used when
`showPlayVoiceButton` is enabled).

```jsonc
{
  "visemes": [
    { "time": 0.00, "viseme": "X" },
    { "time": 0.12, "viseme": "B" },
    { "time": 0.20, "viseme": "A" },
    { "time": 0.35, "viseme": "I" }
  ],
  "audio_base64": "UklGR... (optional WAV)"
}
```

You can produce this timing from any speech engine that emits phoneme/viseme
timestamps (e.g. a text-to-speech service with viseme output) by mapping its
events onto the codes above.

> **Model requirement (T2):** audio-synced lip-sync needs a `.glb` whose mesh
> exposes `viseme_*` morph targets (ARKit / Oculus / Ready Player Me naming —
> e.g. `viseme_aa`, `viseme_PP`, `viseme_CH`). T1 models have no morph targets,
> so use `LipSyncAvatoon` or head-motion only.


## 🤝 Contribution
Pull requests are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for local
setup and development workflow, and please review our
[Code of Conduct](./CODE_OF_CONDUCT.md). To report a security issue, see
[SECURITY.md](./SECURITY.md).


## 💖 Support

If Avatoon is useful to you, consider supporting its development — it helps a lot
and keeps the project maintained:

- ⭐ **Star the repo** — the easiest way to help
- 💛 [**Sponsor on GitHub**](https://github.com/sponsors/khaledalam)
- ☕ [**Buy Me a Coffee**](https://www.buymeacoffee.com/khaledalam)
- 💵 [**PayPal**](https://paypal.me/khaledalam)


## 📄 License

[MIT](./LICENSE) © [Khaled Alam](https://khaledalam.net/)


## 🛡️ Author

**Khaled Alam**

📧 [khaledalam.net@gmail.com](mailto:khaledalam.net@gmail.com)<br />
🌍 [Website](https://khaledalam.net/) | [LinkedIn](https://www.linkedin.com/in/khaledalam/) | [X(Twitter)](https://x.com/khaledalamxyz)

[build-img]:https://github.com/khaledalam/avatoon/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/khaledalam/avatoon/actions/workflows/release.yml
[npm-img]:https://img.shields.io/npm/v/avatoon
[npm-url]:https://www.npmjs.com/package/avatoon
[issues-img]:https://img.shields.io/github/issues/khaledalam/avatoon
[issues-url]:https://github.com/khaledalam/avatoon/issues
[codecov-img]:https://codecov.io/gh/khaledalam/avatoon/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/khaledalam/avatoon