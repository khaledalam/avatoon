import { useRef, useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Avatoon, type AvatoonHandle } from 'avatoon';

/**
 * Minimal Expo example for avatoon on React Native.
 *
 * The 3D scene renders through `@react-three/fiber/native` (expo-gl) and audio
 * plays through `expo-av` — both selected automatically via the package's
 * `react-native` export condition. Playback is driven imperatively through the
 * `ref`, since the built-in DOM play button is web-only.
 */
export default function App() {
  const avatar = useRef<AvatoonHandle>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    avatar.current?.toggle();
    setPlaying(p => !p);
  };

  return (
    <View style={styles.container}>
      <Avatoon
        ref={avatar}
        glbUrl="https://models.readyplayer.me/YOUR_MODEL.glb"
        // visemeJson carries the viseme keyframes + base64 WAV; fetch it from
        // your TTS pipeline (Azure / Polly / Rhubarb — see the converters).
        visemeJson={undefined}
        environmentPreset="sunset"
      />

      <Pressable style={styles.button} onPress={toggle}>
        <Text style={styles.buttonText}>
          {playing ? '⏹  Stop talking' : '▶  Talk with me'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  button: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    backgroundColor: '#3b82f6',
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
