# 🧠 Avatoon


[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]


**Avatoon** is a lightweight React Three Fiber component for rendering animated 3D avatars with real-time viseme-driven lip-sync. It supports lifelike head movements, morph target control, and optional goal-based gestures (e.g., flexing, sleeping), making it ideal for voice assistants, interactive characters, or storytelling apps.

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

```js
import { Avatoon } from "avatoon";

export default App = () => {
    const visemeJson = {
        visemes: [{ 
            { "time": 0, "viseme": "X" },
            { "time": 1.3, "viseme": "A" },
            { "time": 1.367, "viseme": "C" },
         }],
        audio_base64: '',
    };

    return (
        <Avatoon
            glbUrl='https://raw.githubusercontent.com/khaledalam/avatoon/main/test/assets/placeholder-avatar.glb'
            goal={"Normal"}
            onRenderComplete={() => console.log("Render Completed!")}
            visemeJson={visemeJson}
        />
    );
}

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

[build-img]:https://github.com/khaledalam/avatoon/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/khaledalam/avatoon/actions/workflows/release.yml
[npm-img]:https://img.shields.io/npm/v/avatoon
[npm-url]:https://www.npmjs.com/package/avatoon
[issues-img]:https://img.shields.io/github/issues/ryansonshine/avatoon
[issues-url]:https://github.com/ryansonshine/avatoon/issues
[codecov-img]:https://codecov.io/gh/ryansonshine/avatoon/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/ryansonshine/avatoon