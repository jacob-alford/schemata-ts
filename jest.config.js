module.exports = {
  collectCoverageFrom: ['src/**', '!src/schemata.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.ts'],
}
