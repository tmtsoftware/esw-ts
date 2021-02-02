import { validatePath } from '../../../src/clients/config-service/ConfigUtils'

describe('Config utils validate path', () => {
  test('should return false for invalid path | ESW-410', () => {
    const paths = [
      '/invalidpath!/sample.txt',
      '/invalidpath#/sample.txt',
      '/invalidpath$/sample.txt',
      '/invalidpath/%sample.txt',
      '/invalidpath/&sample.txt',
      "/invalidpath/sa'mple.txt",
      '/invalidpath/samp@le.txt',
      '/invalidpath/samp`le.txt',
      '/invalid+path/sample.txt',
      '/invalid,path/sample.txt',
      '/invalidpath;/sample.txt',
      '/invalidpath/sam=ple.txt',
      '/invalid path/sample.txt',
      '/invalidpath/<sample.txt',
      '/invalidpath/sample>.txt'
    ]
    expect.assertions(paths.length)
    paths.forEach((path) => {
      expect(() => validatePath(path)).toThrow(
        `Input file path '${path}' contains invalid characters. Note, these characters !#<>$%&'@^\`~+,;= or 'white space' are not allowed in file path`
      )
    })
  })

  test('should return true for valid path | ESW-410', () => {
    expect(() => validatePath('/validpath/sample.txt')).not.toThrow()
  })
})
