/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ["lib/*", "node_modules"],
  coverageReporters: ["json-summary", "lcov", "text", "clover"],
};