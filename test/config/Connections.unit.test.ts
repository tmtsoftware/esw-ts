import { mocked } from 'ts-jest/utils'
import { GATEWAY_CONNECTION, resolveConnection } from '../../src/config/Connections'
import { LocationConfig } from '../../src/config/LocationConfig'
import { post } from '../../src/utils/Http'
jest.mock('../../src/utils/Http')
jest.mock('../../src/config/LocationConfig')
const postMockFn = mocked(post, true)
const mockedLocationConfig = mocked(LocationConfig)
afterEach(() => {
  jest.clearAllMocks()
})

describe('Connection util', () => {
  test('should resolve location uri of given connection', async () => {
    mockedLocationConfig.host = 'localhost'
    mockedLocationConfig.port = 8080
    postMockFn.mockResolvedValueOnce([
      {
        _type: 'HttpLocation',
        connection: {
          connectionType: 'HttpConnection',
          prefix: {
            subsystem: 'esw',
            name: 'seq'
          },
          componentType: 'sequencer'
        },
        uri: 'http://localhost:8080/asdf',
        metadata: {}
      }
    ])

    const uri: { host: string; port: number } = await resolveConnection(GATEWAY_CONNECTION)
    expect(uri.port).toEqual(8080)
    expect(uri.host).toEqual('localhost')
  })

  test('should throw location not found error when location is resolved', async () => {
    postMockFn.mockResolvedValueOnce([])
    expect.assertions(1)
    await expect(resolveConnection(GATEWAY_CONNECTION)).rejects.toThrow(Error)
  })
})
