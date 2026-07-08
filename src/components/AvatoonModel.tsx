import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Bone, Group, Object3D } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { AvatoonModelProps, RawVisemeEntry } from '../types';
import { phonemeToViseme } from '../constants/phonemeToViseme';

export function AvatoonModel({
  url,
  goal,
  onRenderComplete,
  shouldPlay,
  visemeJson,
}: AvatoonModelProps) {
  const [hasRendered, setHasRendered] = useState(false);
  const calledRef = useRef(false);
  const { gl } = useThree();

  const [isTalking, setIsTalking] = useState(false);
  const [visemeData, setVisemeData] = useState<
    Array<{ time: number; viseme: string | null }>
  >([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const group = useRef<Group | null>(null);
  const { scene } = useGLTF(url) as unknown as GLTF;

  const leftArm = useRef<Object3D | null>(null);
  const leftHand = useRef<Object3D | null>(null);
  const rightArm = useRef<Object3D | null>(null);
  const rightHand = useRef<Object3D | null>(null);
  const leftForearm = useRef<Object3D | null>(null);
  const rightForearm = useRef<Object3D | null>(null);
  const head = useRef<Object3D | null>(null);

  const leftEye = useRef<Object3D | null>(null);
  const rightEye = useRef<Object3D | null>(null);

  const mouthMeshes = useRef<
    { mesh: THREE.Mesh; visemes: Record<string, number> }[]
  >([]);

  const lastVisemeRef = useRef<string | null>(null);

  const isBone = (obj: Object3D): obj is Bone => {
    return (obj as Bone).isBone === true;
  };

  useEffect(() => {
    const loadData = () => {
      if (!visemeJson) return;

      const parsed = visemeJson.visemes
        .map((entry: RawVisemeEntry) => ({
          time: entry.time,
          viseme: phonemeToViseme[entry.viseme || ''] || null,
        }))
        .filter(v => v.viseme !== null);

      setVisemeData(parsed);

      if (visemeJson && visemeJson.audio_base64) {
        const audio = new Audio(
          `data:audio/wav;base64,${visemeJson.audio_base64}`
        );
        audioRef.current = audio;
      }
    };

    loadData();
  }, [visemeJson]);

  useEffect(() => {
    if (shouldPlay && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsTalking(true);
        })
        .catch(e => {
          console.warn('User interaction required to start audio:', e);
        });
    } else if (!shouldPlay && audioRef.current) {
      audioRef.current.pause();
      setIsTalking(false);
    }
  }, [shouldPlay]);

  useEffect(() => {
    if (!scene) return;
    scene.traverse((obj: Object3D) => {
      const name = obj.name.toLowerCase();

      if (obj.name === 'Head') {
        head.current = obj;
      }
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const morphDict = mesh.morphTargetDictionary;

        if (morphDict) {
          const visemes: Record<string, number> = {};
          for (const viseme of Object.keys(phonemeToViseme)) {
            const visemeKey = phonemeToViseme[viseme];
            if (morphDict[visemeKey] !== undefined) {
              visemes[visemeKey] = morphDict[visemeKey];
            }
          }
          if (Object.keys(visemes).length > 0) {
            mouthMeshes.current.push({ mesh, visemes });
          }
        }
      }

      if (isBone(obj)) {
        switch (obj.name) {
          case 'LeftArm':
            leftArm.current = obj;
            break;
          case 'RightArm':
            rightArm.current = obj;
            break;
          case 'LeftForeArm':
            leftForearm.current = obj;
            break;
          case 'RightForeArm':
            rightForearm.current = obj;
            break;
          case 'LeftHand':
            leftHand.current = obj;
            break;
          case 'RightHand':
            rightHand.current = obj;
            break;
          case 'Head':
            head.current = obj;
            break;
          case 'LeftEye':
            leftEye.current = obj;
            break;
          case 'RightEye':
            rightEye.current = obj;
            break;
        }

        if (name.includes('leftarm')) {
          obj.quaternion.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
        }
        if (name.includes('rightarm')) {
          obj.quaternion.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
        }
      }
    });
  }, [scene]);

  useFrame(() => {
    if (!calledRef.current && scene && gl && !hasRendered) {
      calledRef.current = true;
      setHasRendered(true);
      requestAnimationFrame(() => {
        onRenderComplete?.();
      });
    }
    if (!isTalking || !audioRef.current || mouthMeshes.current.length === 0)
      return;

    const currentTime = audioRef.current.currentTime;

    // Find the most recent viseme
    const current = [...visemeData].reverse().find(v => v.time <= currentTime);

    if (!current || current.viseme === lastVisemeRef.current) return;
    lastVisemeRef.current = current.viseme;

    for (const { mesh, visemes } of mouthMeshes.current) {
      if (!mesh.morphTargetInfluences) continue;

      for (const key of Object.keys(visemes)) {
        const index = visemes[key];
        mesh.morphTargetInfluences[index] = 0;
      }
    }

    for (const { mesh, visemes } of mouthMeshes.current) {
      if (!mesh.morphTargetInfluences || !current.viseme) continue;

      const index = visemes[current.viseme];
      if (index === undefined) continue;

      mesh.morphTargetInfluences[index] = 0.6;
      setTimeout(() => {
        if (mesh.morphTargetInfluences) {
          mesh.morphTargetInfluences[index] = 0;
        }
      }, 50);
    }
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Subtle head motion while speaking
    if (isTalking && head.current) {
      const basePitch = -0.2; // lift head slightly upward (negative X is up in Three.js)

      const nod = 0.03 * Math.sin(t * 2); // small vertical nod
      const tilt = 0.015 * Math.sin(t * 2.2); // subtle head tilt (Z)
      const turn = 0.025 * Math.sin(t * 1.5); // subtle head turn (Y)

      head.current.rotation.set(basePitch + nod, turn, tilt);
    }

    if (goal === 'Muscle') {
      const pulse = Math.sin(t * 4) * 0.03; // optional flex movement

      // Upper arms (shoulder raise)
      if (leftArm.current)
        leftArm.current.rotation.set(0, 0, Math.PI / 2 + pulse); // 90° up
      if (rightArm.current)
        rightArm.current.rotation.set(0, 0, -Math.PI / 2 - pulse);

      // Forearms (elbow curl up)
      if (leftForearm.current)
        leftForearm.current.rotation.set(0, 0, Math.PI / 2); // up
      if (rightForearm.current)
        rightForearm.current.rotation.set(0, 0, -Math.PI / 2); // up

      // Hands/fists rotated inward
      if (leftHand.current) leftHand.current.rotation.set(0, 0, Math.PI / 2); // tweak if needed
      if (rightHand.current) rightHand.current.rotation.set(0, 0, -Math.PI / 2);

      // Optional head control
      if (head.current) head.current.rotation.set(0, 0, 0); // facing forward
    } else if (goal === 'Sleep') {
      // breathing motion
      if (head.current) head.current.rotation.x = Math.sin(t * 1.5) * 0.05;
    } else {
      if (leftForearm.current) leftForearm.current.rotation.set(0, 0, 0); // Forearm up
      if (rightForearm.current) rightForearm.current.rotation.set(0, 0, 0);
    }
  });

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      <primitive object={scene} />
    </group>
  );
}
