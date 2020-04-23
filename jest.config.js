module.exports = {
  roots: ['<rootDir>'],

  // Jest transformations -- this adds support for TypeScript using ts-jest
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },

  testRegex: '(/src/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80
  //   }
  // },
  // coverageReporters: ['json', 'lcov', 'text', 'clover'],

  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src']
}
