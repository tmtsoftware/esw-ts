module.exports = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.ts?$',
  testPathIgnorePatterns: ['test/utils/', 'dist/'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src', 'test']
}
