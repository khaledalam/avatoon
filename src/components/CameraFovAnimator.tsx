import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

export function CameraFovAnimator({ readyToPlay }: { readyToPlay: boolean }) {
  const { camera } = useThree();
  const [targetFov, setTargetFov] = useState(readyToPlay ? 17 : 15);

  useEffect(() => {
    setTargetFov(readyToPlay ? 17 : 15);
  }, [readyToPlay]);

  useFrame(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov += (targetFov - camera.fov) * 0.05;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
