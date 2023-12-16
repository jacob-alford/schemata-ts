module.exports = {
  collectCoverageFrom: [
    'src/**',
    '!src/schemata.ts',
    '!src/internal/either.ts',
    '!src/internal/option.ts',
    '!src/internal/task-either.ts',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.ts'],
  moduleNameMapper: {
    '^schemata-ts$': '<rootDir>/src/index.ts',
    '^schemata-ts/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
}
