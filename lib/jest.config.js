module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/test', '<rootDir>/integration'],
  preset: 'ts-jest',
  testRegex: ['(/(test|integration)/.*|(\\.|/)(test|spec))\\.(ts|tsx)?$'],
  testPathIgnorePatterns: ['test/helpers/*', 'integration/utils/*', 'integration/jsons/*'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src', 'test', 'integration'],
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 90,
      statements: 90
    }
  },
  coveragePathIgnorePatterns: ['/node_modules/', 'test/helpers/', '/integration/', 'index.ts']
}
