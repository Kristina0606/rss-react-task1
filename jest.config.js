/** @type {import('jest').Config} */

const config = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js, jsx, ts, tsx}'],
  coveragePathIgnorePatterns: [
    'src/**/*.test.{js,jsx,ts,tsx}',
    'src/**/*.spec.{js,jsx,ts,tsx}',
    'src/index.{js,jsx,ts,tsx}',
    'src/setupTests.{js,ts}',
    'src/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^.+\\.(svg|png)$': 'jest-svg-transformer',
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};

export default config;
