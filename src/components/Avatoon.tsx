import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { AvatoonModel } from './AvatoonModel';
import { CameraFovAnimator } from './CameraFovAnimator';
import type { AvatoonProps } from '../types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './Avatoon.module.css';

export default function Avatoon({
  glbUrl,
  goal,
  onRenderComplete,
  visemeJson,
  showPlayVoiceButton = false,
}: AvatoonProps) {
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [isFullyRendered, setIsFullyRendered] = useState(false);

  return (
    <>
      {showPlayVoiceButton && isFullyRendered && (
        <button
          className={'talk-button'}
          onClick={() => setReadyToPlay(!readyToPlay)}
        >
          {!readyToPlay ? '▶️ Talk with me now' : '⏹️ Stop talking'}
        </button>
      )}

      <Canvas
        data-testid="avatoon-canvas"
        camera={{ position: [0, 1.5, 2.2], fov: 17 }}
      >
        <ambientLight intensity={0.6} />
        <Suspense fallback={null}>
          <AvatoonModel
            url={glbUrl}
            goal={goal}
            onRenderComplete={() => {
              setIsFullyRendered(true);
              onRenderComplete?.();
            }}
            shouldPlay={readyToPlay}
            visemeJson={visemeJson}
          />
          {/* <Environment files={'@assets/venice_sunset_1k.hdr'} background /> */}
          <Environment preset="sunset" />
        </Suspense>
        <CameraFovAnimator readyToPlay={readyToPlay} />
        <OrbitControls target={[0, 1.2, 0]} enablePan enableZoom enableRotate />
      </Canvas>
    </>
  );
}
