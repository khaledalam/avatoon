import { Environment } from '../platform';
import type { AvatoonEnvironmentProps } from '../types';

/**
 * Renders the scene lighting environment — either a custom HDR/EXR file set
 * (`environmentFiles`) or one of drei's built-in presets (`environmentPreset`,
 * default `"sunset"`).
 */
export function SceneEnvironment({
  environmentPreset = 'sunset',
  environmentFiles,
  environmentBackground = false,
}: AvatoonEnvironmentProps) {
  if (environmentFiles) {
    return (
      <Environment
        files={environmentFiles}
        background={environmentBackground}
      />
    );
  }
  return (
    <Environment
      preset={environmentPreset}
      background={environmentBackground}
    />
  );
}
