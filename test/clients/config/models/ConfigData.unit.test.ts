import 'whatwg-fetch'
import { ConfigData } from '../../../../src/clients/config-service'

describe('Config Data', () => {
  test('should be able to create from string and read the same content  | ESW-320', async () => {
    const configData = ConfigData.fromString('File content')

    expect(configData).toBeInstanceOf(ConfigData)
    expect(await configData.fileContentAsString()).toEqual('File content')
  })

  test('should be able to create from file | ESW-320', async () => {
    const configData = ConfigData.fromFile(new File(['File content'], 'file1'))

    expect(configData).toBeInstanceOf(ConfigData)
    expect(await configData.fileContentAsString()).toEqual('File content')
  })

  test('should be able to create from blob | ESW-320', async () => {
    const configData = ConfigData.from(new Blob(['File content']))

    expect(configData).toBeInstanceOf(ConfigData)
    expect(await configData.fileContentAsString()).toEqual('File content')
  })

  test('should be able to get the original from configData using toBlob | ESW-320', () => {
    const blob = new Blob(['File content'])
    const configData = ConfigData.from(blob)

    expect(configData).toBeInstanceOf(ConfigData)
    expect(configData.toBlob()).toEqual(blob)
  })
})
