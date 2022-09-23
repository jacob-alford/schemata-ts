module.exports = {
  collectCoverageFrom: ['src/**'],
  coverageReporters: ['json-summary'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.ts'],
}
