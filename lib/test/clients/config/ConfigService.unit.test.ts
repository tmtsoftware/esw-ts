import { mocked } from 'ts-jest/utils'
import type { TokenFactory } from '../../../src'
import { ConfigService } from '../../../src/clients/config-service'
import { ConfigServiceImpl } from '../../../src/clients/config-service/ConfigServiceImpl'
import { resolveConnection } from '../../../src/config/Connections'

jest.mock('../../../src/clients/config-service/ConfigServiceImpl')
jest.mock('../../../src/config/Connections')
jest.mock('../../../src/utils/Utils')
const mockResolveConfigServer = mocked(resolveConnection)
const mockImpl = mocked(ConfigServiceImpl)

const uri = { host: '123', port: 1234 }
const tokenFactory: TokenFactory = () => 'validToken'
mockResolveConfigServer.mockResolvedValue(uri)

const configServiceImpl = new ConfigServiceImpl(uri.host, uri.port, tokenFactory)

describe('Config Service Factory', () => {
  test('create config service | ESW-320', async () => {
    mockImpl.mockReturnValue(configServiceImpl)
    const a = await ConfigService(tokenFactory)

    expect(a).toEqual(configServiceImpl)
    expect(mockResolveConfigServer).toBeCalledTimes(1)
  })
})

afterAll(() => jest.resetAllMocks())
