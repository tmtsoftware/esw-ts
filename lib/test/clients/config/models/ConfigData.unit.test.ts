import 'whatwg-fetch'
import { ConfigData } from '../../../../src/clients/config/models/ConfigData'

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
})
