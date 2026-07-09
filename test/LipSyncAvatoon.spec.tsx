import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as THREE from 'three';
import LipSyncAvatoon from '../src/components/LipSyncAvatoon';

const frameCallbacks: Array<(state: any, delta: number) => void> = [];

function makeScene() {
  const scene = new THREE.Group();
  const mesh = new THREE.Mesh();
  mesh.name = 'Wolf3D_Head';
  (mesh as any).isMesh = true;
  mesh.morphTargetDictionary = { viseme_aa: 0, viseme_PP: 1, eyeBlinkLeft: 2 };
  mesh.morphTargetInfluences = [0, 0, 0];

  const head = new THREE.Object3D();
  head.name = 'Head';
  const arm = new THREE.Object3D();
  arm.name = 'LeftArm';
  scene.add(mesh, head, arm);
  return scene;
}

jest.mock('@react-three/fiber', () => ({
  ...jest.requireActual('@react-three/fiber'),
  Canvas: ({ children }: any) => (
    <div data-testid="lipsync-canvas">{children}</div>
  ),
  useFrame: (cb: any) => {
    frameCallbacks.push(cb);
  },
}));

jest.mock('@react-three/drei', () => ({
  useGLTF: () => ({ scene: makeScene() }),
  Environment: () => null,
  OrbitControls: () => null,
}));

jest.mock('../src/components/SceneEnvironment', () => ({
  SceneEnvironment: () => null,
}));

function runFrames(state: any, delta = 0.016) {
  act(() => {
    frameCallbacks.forEach(cb => cb(state, delta));
  });
}

describe('LipSyncAvatoon', () => {
  beforeEach(() => {
    frameCallbacks.length = 0;
  });

  it('renders a canvas and the Start Talking button', () => {
    render(<LipSyncAvatoon glbUrl="dummy.glb" />);
    expect(screen.getByTestId('lipsync-canvas')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /start talking/i })
    ).toBeInTheDocument();
  });

  it('toggles the button and drives talking + idle frames', () => {
    render(<LipSyncAvatoon glbUrl="dummy.glb" />);

    // Idle: run frames (closes mouth, blinks).
    expect(() =>
      runFrames({ clock: { getElapsedTime: () => 3.2 } }, 3.2)
    ).not.toThrow();

    // Start talking → exercises the active lip-sync path.
    fireEvent.click(screen.getByRole('button', { name: /start talking/i }));
    expect(
      screen.getByRole('button', { name: /stop talking/i })
    ).toBeInTheDocument();
    expect(() =>
      runFrames({ clock: { getElapsedTime: () => 4 } }, 0.8)
    ).not.toThrow();
  });

  it('falls back to a default glb url when none is provided', () => {
    render(<LipSyncAvatoon />);
    expect(screen.getByTestId('lipsync-canvas')).toBeInTheDocument();
  });
});
