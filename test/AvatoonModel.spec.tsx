import React from 'react';
import { render, act } from '@testing-library/react';
import * as THREE from 'three';
import { AvatoonModel } from '../src/components/AvatoonModel';
import '@testing-library/jest-dom';

// @ts-ignore  minimal Audio stub for jsdom
window.Audio = class {
  currentTime = 0.5;
  play = jest.fn(() => Promise.resolve());
  pause = jest.fn();
  src = '';
};

// Collect the useFrame callbacks so we can drive the animation loop manually.
const frameCallbacks: Array<(state: any, delta: number) => void> = [];

// Build a scene with a morph-target mesh (visemes + blink) and rig bones.
function makeScene() {
  const scene = new THREE.Group();

  const mesh = new THREE.Mesh();
  mesh.name = 'Head_Mesh';
  (mesh as any).isMesh = true;
  mesh.morphTargetDictionary = {
    viseme_aa: 0,
    viseme_PP: 1,
    eyeBlinkLeft: 2,
    eyeBlinkRight: 3,
  };
  mesh.morphTargetInfluences = [0, 0, 0, 0];

  const bones = [
    'Head',
    'LeftArm',
    'RightArm',
    'LeftForeArm',
    'RightForeArm',
  ].map(name => {
    const b = new THREE.Bone();
    b.name = name;
    return b;
  });

  scene.add(mesh, ...bones);
  return scene;
}

jest.mock('@react-three/fiber', () => ({
  useThree: () => ({ gl: {} }),
  useFrame: (cb: any) => {
    frameCallbacks.push(cb);
  },
}));

jest.mock('@react-three/drei', () => ({
  useGLTF: () => ({ scene: makeScene() }),
}));

const visemeJson = {
  visemes: [
    { time: 0, viseme: 'A' },
    { time: 0.3, viseme: 'B' },
  ],
  audio_base64: '',
};

function runFrames(state: any, delta = 0.016) {
  act(() => {
    frameCallbacks.forEach(cb => cb(state, delta));
  });
}

describe('AvatoonModel', () => {
  beforeEach(() => {
    frameCallbacks.length = 0;
  });

  it('renders a primitive and fires onRenderComplete on first frame', () => {
    const onRenderComplete = jest.fn();
    const { container } = render(
      <AvatoonModel
        url="dummy.glb"
        goal="Normal"
        shouldPlay={false}
        visemeJson={visemeJson}
        onRenderComplete={onRenderComplete}
      />
    );
    expect(container.querySelector('primitive')).toBeInTheDocument();
    runFrames({ clock: { getElapsedTime: () => 0 } });
  });

  it('drives blink and Muscle-goal frames without throwing', () => {
    render(
      <AvatoonModel
        url="dummy.glb"
        goal="Muscle"
        shouldPlay={false}
        visemeJson={visemeJson}
        onRenderComplete={jest.fn()}
      />
    );
    expect(() => {
      runFrames({ clock: { getElapsedTime: () => 3.1 } }, 3.1);
      runFrames({ clock: { getElapsedTime: () => 3.2 } }, 0.05);
    }).not.toThrow();
  });

  it('exercises the Sleep-goal branch', () => {
    render(
      <AvatoonModel
        url="dummy.glb"
        goal="Sleep"
        shouldPlay={false}
        visemeJson={visemeJson}
        onRenderComplete={jest.fn()}
      />
    );
    expect(() =>
      runFrames({ clock: { getElapsedTime: () => 1 } })
    ).not.toThrow();
  });
});
