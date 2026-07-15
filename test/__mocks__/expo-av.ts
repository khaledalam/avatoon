// Manual mock of `expo-av` for jest (the real package isn't installed — it's an
// optional native peer). Lets us unit-test the React Native audio clock in
// jsdom and drive playback-status updates manually.

export const __soundInstances: MockSound[] = [];

export class MockSound {
  _cb: ((s: unknown) => void) | null = null;
  playAsync = jest.fn(async () => {});
  pauseAsync = jest.fn(async () => {});
  unloadAsync = jest.fn(async () => {});
  setOnPlaybackStatusUpdate = jest.fn((cb: ((s: unknown) => void) | null) => {
    this._cb = cb;
  });

  /** Test helper: emit a playback status update to the registered callback. */
  __emit(status: unknown) {
    this._cb?.(status);
  }

  static createAsync = jest.fn(async () => {
    const sound = new MockSound();
    __soundInstances.push(sound);
    return { sound };
  });
}

export const Audio = { Sound: MockSound };

/** Test helper: reset recorded instances and mock call history. */
export function __reset() {
  __soundInstances.length = 0;
  MockSound.createAsync.mockClear();
}
