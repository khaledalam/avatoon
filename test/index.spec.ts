import { Avatoon, LipSyncAvatoon } from '../src/index';

describe('package entry point', () => {
  it('exports the Avatoon component (forwardRef)', () => {
    expect(Avatoon).toBeDefined();
    // forwardRef components are objects; plain components are functions.
    expect(['function', 'object']).toContain(typeof Avatoon);
  });

  it('exports the LipSyncAvatoon component', () => {
    expect(LipSyncAvatoon).toBeDefined();
    expect(typeof LipSyncAvatoon).toBe('function');
  });
});
