import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { phonemeToViseme } from '../constants/phonemeToViseme';

function LipSyncModel({ url, isTalking }: { url: string; isTalking: boolean }) {
  const { scene } = useGLTF(url);
  const mouthMeshes = useRef<
    { mesh: THREE.Mesh; visemes: Record<string, number> }[]
  >([]);
  const head = useRef<THREE.Object3D | null>(null);

  // Traversal to find head and morph targets
  useEffect(() => {
    if (!scene) return;
    scene.traverse(obj => {
      if (obj.name === 'Head') {
        head.current = obj;
      }

      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh && mesh.morphTargetDictionary) {
        const dict = mesh.morphTargetDictionary;
        const visemes: Record<string, number> = {};

        // Check for our known viseme keys in the morph dictionary
        Object.values(phonemeToViseme).forEach(visemeKey => {
          if (dict[visemeKey] !== undefined) {
            visemes[visemeKey] = dict[visemeKey];
          }
        });

        if (Object.keys(visemes).length > 0) {
          mouthMeshes.current.push({ mesh, visemes });
        }
      }
    });
  }, [scene]);

  const state = useRef({
    nextChange: 0,
    currentViseme: 'viseme_aa',
    targetInfluence: 0,
  });

  useFrame(({ clock }) => {
    // If not talking, smoothly close mouth (reset influences to 0)
    if (!isTalking) {
      mouthMeshes.current.forEach(({ mesh, visemes }) => {
        if (!mesh.morphTargetInfluences) return;
        Object.values(visemes).forEach(idx => {
          if (mesh.morphTargetInfluences![idx] > 0.01) {
            mesh.morphTargetInfluences![idx] = THREE.MathUtils.lerp(
              mesh.morphTargetInfluences![idx],
              0,
              0.2
            );
          } else {
            mesh.morphTargetInfluences![idx] = 0;
          }
        });
      });
      return;
    }

    const t = clock.getElapsedTime();

    // Decide whether to switch viseme
    if (t > state.current.nextChange) {
      // Pick random next change time (faster for realistic speech)
      state.current.nextChange = t + 0.05 + Math.random() * 0.15;

      // Pick a random viseme from the ones we track
      // We can get values from phonemeToViseme, filtering duplicates
      const possibleVisemes = Array.from(
        new Set(Object.values(phonemeToViseme))
      );
      // Filter out silence for active talking if possible, though silence is natural too
      const activeVisemes = possibleVisemes.filter(v => v !== 'viseme_sil');

      const randomViseme =
        activeVisemes[Math.floor(Math.random() * activeVisemes.length)];

      state.current.currentViseme = randomViseme;
      // Random intensity between 0.3 and 1.0
      state.current.targetInfluence = 0.3 + Math.random() * 0.7;
    }

    // Apply influences
    mouthMeshes.current.forEach(({ mesh, visemes }) => {
      if (!mesh.morphTargetInfluences) return;

      Object.entries(visemes).forEach(([key, idx]) => {
        // If this is the current active viseme, lerp towards target intensity
        if (key === state.current.currentViseme) {
          mesh.morphTargetInfluences![idx] = THREE.MathUtils.lerp(
            mesh.morphTargetInfluences![idx],
            state.current.targetInfluence,
            0.2 // speed of transition
          );
        } else {
          // Lerp others to 0
          mesh.morphTargetInfluences![idx] = THREE.MathUtils.lerp(
            mesh.morphTargetInfluences![idx],
            0,
            0.2
          );
        }
      });
    });

    // Optional: Subtle Head Animation while talking
    if (head.current) {
      const nod = 0.05 * Math.sin(t * 3);
      const turn = 0.02 * Math.cos(t * 2);
      // Assuming original rotation was close to 0,0,0 or we add to it.
      // Ideally we should cache initial rotation but for this simple component:
      head.current.rotation.x = -0.2 + nod; // Slight look up + nod
      head.current.rotation.y = turn;
    }
  });

  return <primitive object={scene} position={[0, -0.4, 0]} />;
}

export default function LipSyncAvatoon({
  glbUrl = '/avatar.glb',
}: {
  glbUrl?: string;
}) {
  const [isTalking, setIsTalking] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        minHeight: '400px',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Canvas
        camera={{ position: [0, 1.5, 2.2], fov: 17 }}
        style={{ borderRadius: '8px' }}
      >
        <ambientLight intensity={0.6} />
        <Suspense fallback={null}>
          <LipSyncModel url={glbUrl} isTalking={isTalking} />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls
          target={[0, 1.2, 0]}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
        />
      </Canvas>
      <button
        onClick={() => setIsTalking(!isTalking)}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: isTalking ? '#ef4444' : '#3b82f6',
          border: 'none',
          borderRadius: '25px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'background-color 0.2s',
          zIndex: 10,
        }}
        onMouseOver={e =>
          (e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)')
        }
        onMouseOut={e =>
          (e.currentTarget.style.transform = 'translateX(-50%) scale(1)')
        }
      >
        {isTalking ? 'Stop Talking' : 'Start Talking'}
      </button>
    </div>
  );
}
