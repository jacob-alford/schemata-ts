module.exports = {
  collectCoverageFrom: ['src/**', '!src/schemata.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    '^schemata-ts$': '<rootDir>/src/index.ts',
    '^schemata-ts/(.*)$': '<rootDir>/src/$1',
  },
}
