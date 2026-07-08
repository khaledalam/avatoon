# 🧠 Avatoon


[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]


**Avatoon** is a lightweight React Three Fiber component for rendering animated 3D avatars with real-time viseme-driven lip-sync. It supports lifelike head movements, morph target control, and optional goal-based gestures (e.g., flexing, sleeping), making it ideal for voice assistants, interactive characters, or storytelling apps.

### 🎮 [**Try the live demo →**](https://khaledalam.github.io/avatoon/)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/khaledalam/avatoon/tree/main/example)

<img src="https://raw.githubusercontent.com/khaledalam/avatoon/main/test/assets/avatoon.gif" />

[demo video](https://youtu.be/9ODqu2EZvtw)


## ✨ Features
- 🎤 Real-time lip-sync using phoneme-viseme mapping  
- 🧍 Subtle head motion animation while talking  
- 🌐 GLTF model support via `useGLTF`  
- ⚛️ Plug-and-play with React Three Fiber + Drei  
- 🎯 Goal-based gestures like "Muscle" or "Sleep"

## 📦 Installation

```bash
npm install avatoon
```

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

### To run the example app locally:
```bash
npm run example
```

## 🧩 API

### `Avatoon(props)`

| Prop                  | Type         | Default      | Description                                            |
| --------------------- | ------------ | ------------ | ------------------------------------------------------ |
| `glbUrl`              | `string`     | *(required)* | URL to the `.glb` avatar file (T1 or T2)               |
| `goal`                | `string`     | `"Normal"`   | Goal-based motion preset: `"Muscle"`, `"Sleep"`, etc.  |
| `onRenderComplete`    | `() => void` | `undefined`  | Callback fired when avatar finishes rendering          |
| `visemeJson`          | `VisemeData` | `undefined`  | JSON structure for syncing visemes with audio playback |
| `showPlayVoiceButton` | `boolean`    | `false`      | If true, renders a play/stop voice button in the scene |

### `LipSyncAvatoon(props)`

A lightweight, self-contained variant that drives procedural mouth movement
(no `visemeJson` or audio needed) and renders its own Start/Stop button.

| Prop     | Type     | Default        | Description                          |
| -------- | -------- | -------------- | ------------------------------------ |
| `glbUrl` | `string` | `"/avatar.glb"` | URL to the `.glb` avatar file (T2)  |

## 👤 Avatar Types
- T1 (Static Face - Realistic)
    - Most photorealistic
    - No facial morphing
    - Lightweight
    - <img src="https://raw.githubusercontent.com/khaledalam/avatoon/main//test/assets/V1_bg.jpg" width="100"/>
- T2 (Blendshape Face - Expressive)
  - Separate eyeballs and mouth
  - Supports morph targets / ARKit visemes
  - Slightly less realistic but animatable
  - <img src="https://raw.githubusercontent.com/khaledalam/avatoon/main//test/assets/V2_bg.jpg" width="100"/>

## 📘 Types

```ts
interface VisemeData {
  visemes: Array<{ time: number; viseme: string | null }>;
  audio_base64?: string;
}
```


## 🤝 Contribution
Pull requests are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for local
setup and development workflow, and please review our
[Code of Conduct](./CODE_OF_CONDUCT.md). To report a security issue, see
[SECURITY.md](./SECURITY.md).


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