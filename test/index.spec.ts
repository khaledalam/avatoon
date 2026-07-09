import { Avatoon, LipSyncAvatoon } from '../src/index';

describe('package entry point', () => {
  it('exports the Avatoon component', () => {
    expect(Avatoon).toBeDefined();
    expect(typeof Avatoon).toBe('function');
  });

  it('exports the LipSyncAvatoon component', () => {
    expect(LipSyncAvatoon).toBeDefined();
    expect(typeof LipSyncAvatoon).toBe('function');
  });
});
