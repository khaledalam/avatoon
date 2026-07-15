import { useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Avatoon, type AvatoonGoal } from 'avatoon';

/**
 * React Native example showing goal-based gestures (Normal / Muscle / Sleep).
 *
 * Switching `goal` re-poses the avatar via the same morph/bone logic as web —
 * no audio required. Handy for idle states, reactions, or emotes.
 */
const GOALS: AvatoonGoal[] = ['Normal', 'Muscle', 'Sleep'];

export default function GoalsExample() {
  const [goal, setGoal] = useState<AvatoonGoal>('Normal');

  return (
    <View style={styles.container}>
      <Avatoon
        glbUrl="https://models.readyplayer.me/YOUR_MODEL.glb"
        goal={goal}
        environmentPreset="city"
      />

      <View style={styles.row}>
        {GOALS.map(g => (
          <Pressable
            key={g}
            onPress={() => setGoal(g)}
            style={[styles.chip, goal === g && styles.chipActive]}
          >
            <Text style={[styles.chipText, goal === g && styles.chipTextActive]}>
              {g}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  row: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
  },
  chipActive: { backgroundColor: '#3b82f6' },
  chipText: { color: '#334155', fontWeight: '600' },
  chipTextActive: { color: '#fff' },
});
