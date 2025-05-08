# 🧠 Avatoon


[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]


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

## 📌 Badges & Metadata

[build-img]:https://github.com/khaledalam/avatoon/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/khaledalam/avatoon/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/typescript-npm-package-template
[downloads-url]:https://www.npmtrends.com/typescript-npm-package-template
[npm-img]:https://img.shields.io/npm/v/typescript-npm-package-template
[npm-url]:https://www.npmjs.com/package/typescript-npm-package-template
[issues-img]:https://img.shields.io/github/issues/ryansonshine/typescript-npm-package-template
[issues-url]:https://github.com/ryansonshine/typescript-npm-package-template/issues
[codecov-img]:https://codecov.io/gh/ryansonshine/typescript-npm-package-template/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/ryansonshine/typescript-npm-package-template
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
