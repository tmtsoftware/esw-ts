module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/test', '<rootDir>/integration'],
  preset: 'ts-jest',
  testRegex: [
    '(/(test|integration)/.*|(\\.|/)(test|spec))\\.ts?$'
  ],
  testPathIgnorePatterns: ['test/utils/MockHelpers.ts', 'integration/utils/*'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src', 'test', 'integration'],
  verbose: true,
  reporters: ['default','<rootDir>/test/testReporter.js'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  coveragePathIgnorePatterns: ['/node_modules/', 'test/utils/MockHelpers.ts', '/integration/']
}
