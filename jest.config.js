// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // Emit a single canonical report. Uploading clover.xml + coverage-final.json
  // alongside lcov.info made Codecov double-count paths (absolute vs relative),
  // registering phantom 0% files that roughly halved the reported coverage.
  coverageReporters: ['text', 'lcov', 'json-summary'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: true,
    }],
  },
  testPathIgnorePatterns: ['/node_modules/', '/.history/', '/example'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^three/examples/jsm/utils/SkeletonUtils$':
      '<rootDir>/test/__mocks__/skeletonUtils.ts',
    // Optional native peers aren't installed; map them to manual mocks so the
    // React Native audio clock can be unit-tested in jsdom.
    '^expo-av$': '<rootDir>/test/__mocks__/expo-av.ts',
    '^expo-file-system$': '<rootDir>/test/__mocks__/expo-file-system.ts',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
