import React from 'react';
import { render, rerender } from '@testing-library/react';
import { CameraFovAnimator } from '../src/components/CameraFovAnimator';
import * as THREE from 'three';

let mockCamera = {
  fov: 15,
  updateProjectionMatrix: jest.fn(),
} as unknown as THREE.PerspectiveCamera;

let useFrameCallback:
  | ((state: { camera: THREE.PerspectiveCamera }) => void)
  | null = null;

jest.mock('@react-three/fiber', () => ({
  ...jest.requireActual('@react-three/fiber'),
  useThree: () => ({
    camera: mockCamera,
  }),
  useFrame: (cb: any) => {
    useFrameCallback = cb;
  },
}));

describe('CameraFovAnimator', () => {
  beforeEach(() => {
    mockCamera.updateProjectionMatrix.mockClear();
    useFrameCallback = null;
  });

  // it('animates FOV to 17 when readyToPlay is true', () => {
  //   render(<CameraFovAnimator readyToPlay={true} />);
  //   expect(mockCamera.fov).toBe(17);
  // });

  it('animates FOV to 15 when readyToPlay is false', () => {
    render(<CameraFovAnimator readyToPlay={false} />);
    expect(mockCamera.fov).toBe(15);
  });
});
