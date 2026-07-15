import { render } from '@testing-library/react';
import { CameraFovAnimator } from '../src/components/CameraFovAnimator';
import * as THREE from 'three';

// A real PerspectiveCamera so the `instanceof` guard in the frame loop passes.
let mockCamera = new THREE.PerspectiveCamera(15, 1, 0.1, 1000);

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
    useFrameCallback = null;
  });

  it('animates FOV to 15 when readyToPlay is false', () => {
    render(<CameraFovAnimator readyToPlay={false} />);
    expect(mockCamera.fov).toBe(15);
  });

  it('lerps fov toward the target and updates the projection on each frame', () => {
    mockCamera.fov = 15;
    render(<CameraFovAnimator readyToPlay baseFov={24} />);
    const spy = jest.spyOn(mockCamera, 'updateProjectionMatrix');

    // readyToPlay=true → target is baseFov (24); fov should climb from 15.
    useFrameCallback!({ camera: mockCamera });

    expect(mockCamera.fov).toBeGreaterThan(15);
    expect(mockCamera.fov).toBeLessThan(24);
    expect(spy).toHaveBeenCalled();
  });

  it('ignores non-perspective cameras', () => {
    render(<CameraFovAnimator readyToPlay baseFov={24} />);
    const ortho = new THREE.OrthographicCamera();
    expect(() =>
      useFrameCallback!({
        camera: ortho as unknown as THREE.PerspectiveCamera,
      })
    ).not.toThrow();
  });
});
