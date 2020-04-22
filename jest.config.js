module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>'],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  // setupFilesAfterEnv: [
  //     "@testing-library/react/cleanup-after-each",
  //     "@testing-library/jest-dom/extend-expect"
  // ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80
  //   }
  // },
  // coverageReporters: ['json', 'lcov', 'text', 'clover'],
  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
}
