/**
 * Ambient shims for the React Native / Expo peers.
 *
 * These packages are only used by the native build (`*.native.tsx` +
 * `expoAudioClock.ts`), where they are kept external and resolved from the
 * consuming app's own install. Declaring them here lets `tsc --noEmit` and the
 * native bundle build succeed without adding heavy Expo dev dependencies to
 * this library.
 *
 * The `/native` entry points expose the same API surface as their web
 * counterparts, so we simply re-export the real (installed) types.
 */
declare module '@react-three/fiber/native' {
  export * from '@react-three/fiber';
}

declare module '@react-three/drei/native' {
  export * from '@react-three/drei';
}

declare module 'expo-av' {
  export namespace Audio {
    interface PlaybackStatus {
      isLoaded: boolean;
      positionMillis?: number;
      isPlaying?: boolean;
    }
    class Sound {
      static createAsync(
        source: { uri: string },
        initialStatus?: { shouldPlay?: boolean }
      ): Promise<{ sound: Sound }>;
      setOnPlaybackStatusUpdate(
        cb: ((status: PlaybackStatus) => void) | null
      ): void;
      playAsync(): Promise<unknown>;
      pauseAsync(): Promise<unknown>;
      unloadAsync(): Promise<unknown>;
    }
  }
}

declare module 'expo-file-system' {
  export const cacheDirectory: string | null;
  export enum EncodingType {
    UTF8 = 'utf8',
    Base64 = 'base64',
  }
  export function writeAsStringAsync(
    fileUri: string,
    contents: string,
    options?: { encoding?: EncodingType }
  ): Promise<void>;
}
