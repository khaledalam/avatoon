import { useFrame, useThree } from '../platform';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

export function CameraFovAnimator({
  readyToPlay,
  baseFov = 24,
}: {
  readyToPlay: boolean;
  baseFov?: number;
}) {
  const { camera } = useThree();
  // Zoom in slightly (base − 2) when idle, back to base when playing.
  const [targetFov, setTargetFov] = useState(
    readyToPlay ? baseFov : baseFov - 2
  );

  useEffect(() => {
    setTargetFov(readyToPlay ? baseFov : baseFov - 2);
  }, [readyToPlay, baseFov]);

  useFrame(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov += (targetFov - camera.fov) * 0.05;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
