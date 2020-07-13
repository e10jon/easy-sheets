module.exports = {
  preset: 'ts-jest',
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  testRegex: ['src/__tests__/.*?\\.test\\.tsx?$'],
}
