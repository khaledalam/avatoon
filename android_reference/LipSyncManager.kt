package com.example.avatoon

import android.animation.ValueAnimator
import android.util.Log
import io.github.sceneview.SceneView
import io.github.sceneview.math.MathUtils
import io.github.sceneview.node.ModelNode
import kotlinx.coroutines.*
import kotlin.random.Random

/**
 * A helper class to manage Lip Sync animation for a 3D Avatar using Sceneview.
 *
 * Usage:
 * 1. Initialize with your ModelNode containing the avatar.
 * 2. Call `setTalking(true)` to start random lip movement.
 * 3. Call `setTalking(false)` to stop.
 *
 * Dependencies: io.github.sceneview.android:sceneview:2.0.3 (or later)
 */
class LipSyncManager(
    private val avatarNode: ModelNode,
    private val scope: CoroutineScope = CoroutineScope(Dispatchers.Main)
) {

    private var isTalking = false
    private var updateJob: Job? = null

    // Map of logical phonemes to the actual Morph Target names in your GLB
    // Ensure these match the morph target names exported in your 3D model
    private val visemeMap = mapOf(
        "A" to "viseme_aa",
        "B" to "viseme_PP",
        "C" to "viseme_CH",
        "D" to "viseme_DD",
        "E" to "viseme_E",
        "F" to "viseme_FF",
        "I" to "viseme_I",
        "O" to "viseme_oo",
        "R" to "viseme_RR"
    )

    private val activeVisemes = visemeMap.values.toList()

    // State for smooth animation
    private var currentViseme: String? = null
    private var currentInfluence = 0f
    private var targetInfluence = 0f
    
    // Animation loop speed
    private val updateIntervalMs = 50L 

    fun setTalking(talking: Boolean) {
        if (isTalking == talking) return
        isTalking = talking

        if (talking) {
            startLoop()
        } else {
            stopLoop()
        }
    }

    private fun startLoop() {
        updateJob?.cancel()
        updateJob = scope.launch {
            var nextChangeTime = System.currentTimeMillis()
            
            while (isActive) {
                val now = System.currentTimeMillis()

                // Pick a new random viseme every ~100-200ms
                if (now >= nextChangeTime) {
                    currentViseme = activeVisemes.random()
                    targetInfluence = if (Random.nextBoolean()) {
                        Random.nextFloat() * 0.7f + 0.3f // 0.3 to 1.0
                    } else {
                        0f // Occasionally pause/silence
                    }
                    
                    // Schedule next change
                    nextChangeTime = now + Random.nextLong(50, 200)
                }

                // Interpolate (Lerp) towards target
                // In a real game loop, you'd use delta time. Here we approximate with fixed delay.
                currentInfluence = MathUtils.lerp(currentInfluence, targetInfluence, 0.2f)

                // Apply to model
                updateMorphTargets()

                delay(updateIntervalMs)
            }
        }
    }

    private fun stopLoop() {
        updateJob?.cancel()
        // Smoothly close mouth
        scope.launch {
            targetInfluence = 0f
            while (currentInfluence > 0.01f) {
                currentInfluence = MathUtils.lerp(currentInfluence, 0f, 0.2f)
                updateMorphTargets()
                delay(updateIntervalMs)
            }
            currentInfluence = 0f
            updateMorphTargets()
        }
    }

    private fun updateMorphTargets() {
        // Reset all known visemes to 0 first (or handle blending if your engine supports it)
        activeVisemes.forEach { visemeName ->
             avatarNode.setMorphTargetWeight(visemeName, 0f)
        }

        // Apply current active viseme weight
        currentViseme?.let { visemeName ->
            avatarNode.setMorphTargetWeight(visemeName, currentInfluence)
        }
    }
}
