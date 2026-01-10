# Android 3D Avatar Lip Sync Implementation Guide

This guide explains how to implement the 3D Avatar with "Lip Sync Only" mode (random mouth movement, no audio) and locked camera panning in a native Android application using Kotlin and [Sceneview](https://github.com/Sceneview/sceneview).

## 1. Project Setup

### Dependencies (build.gradle.kts)
Ensure you have the Sceneview dependency in your module-level `build.gradle.kts`:

```kotlin
dependencies {
    implementation("io.github.sceneview.android:sceneview:2.0.3") // Check for latest version
}
```

## 2. Helper Class
We have created a helper class `LipSyncManager` that handles the morph target manipulation. 
Copy the file `LipSyncManager.kt` into your source set (e.g., `app/src/main/java/com/example/yourapp/LipSyncManager.kt`).

**Key Features of LipSyncManager:**
- **Randomized Visemes**: Picks random mouth shapes to simulate talking.
- **Smooth Interpolation**: Uses `lerp` to smoothly transition between mouth shapes so it looks natural, not robotic.
- **Toggle Control**: `setTalking(true/false)` to start/stop.

## 3. Implementation Steps

1.  **Layout XML**: Add a `io.github.sceneview.SceneView` and a `Button` to your layout.
2.  **Activity/Fragment**:
    -   Load your `.glb` model into a `ModelNode`.
    -   Add the node to the `SceneView`.
    -   Initialize `LipSyncManager` with the node.
    -   Set up the Button `OnClickListener` to toggle `lipSyncManager.setTalking(isActive)`.
    -   **Disable Panning**: Configure the camera manipulator to disallow panning/movement if essentially "locking" the view is desired, or simply don't attach a manipulator that allows it.

## 4. AI Prompt for Integration

If you need to generate the specific Activity/Fragment code for your existing Android project, use the prompt below. Copy and paste this into your AI coding assistant (like Android Studio Bot, ChatGPT, or Cursor).

---
### 📋 Copy This Prompt:

```text
I have a Kotlin Android project using Sceneview. 
I need to implement a 3D Avatar viewer with the following specific requirements:

1. **Load Avatar**: Load a GLB model (e.g., "avatar.glb") into the SceneView.
2. **Lock Camera**: The user should NOT be able to pan or move the camera. The camera should be fixed on the avatar's head/upper body.
3. **Lip Sync Feature**:
   - Use the provided `LipSyncManager` class (I will provide this class definition).
   - I need a toggle Button on the UI (overlaying the 3D view).
   - When clicked, it should start the random lip-sync animation (no audio) using `lipSyncManager.setTalking(true)`.
   - When clicked again, it should stop it.
4. **UI Layout**: Please provide the XML layout with a SceneView and a styled floating button at the bottom.

Here is the helper class I have:

class LipSyncManager(private val avatarNode: ModelNode, private val scope: CoroutineScope) {
    // ... (Your AI agent will infer the methods setTalking) ...
    // It uses standard morph target setting on the node.
}

Please write the MainActivity.kt and activity_main.xml code.
```
---

## 5. Sample Usage Code

Here is a quick preview of how the `MainActivity` might look:

```kotlin
class MainActivity : AppCompatActivity() {

    private lateinit var sceneView: SceneView
    private lateinit var lipSyncManager: LipSyncManager
    private var isTalking = false
    private val modelUrl = "models/avatar.glb" // In assets folder

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        sceneView = findViewById(R.id.sceneView)
        val toggleButton = findViewById<Button>(R.id.btnToggleTalk)

        lifecycleScope.launchWhenCreated {
            val modelInstance = sceneView.modelLoader.loadModelInstance(modelUrl) ?: return@launchWhenCreated
            val modelNode = ModelNode(
                modelInstance = modelInstance,
                scaleToUnits = 1.0f
            ).apply {
                // Position avatar so head is visible
                position = Position(y = -1.0f) 
            }
            
            sceneView.addChild(modelNode)
            
            // Initialize Manager
            lipSyncManager = LipSyncManager(modelNode, lifecycleScope)
            
            // Lock Camera (Disable manipulation)
            sceneView.cameraNode.manipulator = null 
        }

        toggleButton.setOnClickListener {
            isTalking = !isTalking
            lipSyncManager.setTalking(isTalking)
            toggleButton.text = if (isTalking) "Stop Talking" else "Start Talking"
        }
    }
}
```
