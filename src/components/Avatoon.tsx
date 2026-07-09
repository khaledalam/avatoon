import {
  useState,
  Suspense,
  forwardRef,
  useImperativeHandle,
  type CSSProperties,
} from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { AvatoonModel } from './AvatoonModel';
import { CameraFovAnimator } from './CameraFovAnimator';
import type { AvatoonProps, AvatoonHandle } from '../types';

// Inline styles keep the component zero-config for consumers — no separate
// stylesheet import required (mirrors LipSyncAvatoon's approach).
const talkButtonStyle: CSSProperties = {
  position: 'absolute',
  top: 5,
  left: 5,
  padding: '10px 20px',
  background: 'white',
  border: '1px solid #d0d0d0',
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 14,
  color: '#222',
  cursor: 'pointer',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.2s ease',
  zIndex: 999,
};

const Avatoon = forwardRef<AvatoonHandle, AvatoonProps>(function Avatoon(
  {
    glbUrl,
    goal,
    onRenderComplete,
    visemeJson,
    showPlayVoiceButton = false,
    fov = 24,
    cameraPosition = [0, 1.45, 2.3],
    cameraTarget = [0, 1.35, 0],
  },
  ref
) {
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [isFullyRendered, setIsFullyRendered] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      play: () => setReadyToPlay(true),
      stop: () => setReadyToPlay(false),
      toggle: () => setReadyToPlay(prev => !prev),
    }),
    []
  );

  return (
    <>
      {showPlayVoiceButton && isFullyRendered && (
        <button
          style={talkButtonStyle}
          onClick={() => setReadyToPlay(!readyToPlay)}
        >
          {!readyToPlay ? '▶️ Talk with me now' : '⏹️ Stop talking'}
        </button>
      )}

      <Canvas
        data-testid="avatoon-canvas"
        camera={{ position: cameraPosition, fov }}
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
        <CameraFovAnimator readyToPlay={readyToPlay} baseFov={fov} />
        <OrbitControls
          target={cameraTarget}
          enablePan
          enableZoom
          enableRotate
        />
      </Canvas>
    </>
  );
});

export default Avatoon;
