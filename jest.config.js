// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
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
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
