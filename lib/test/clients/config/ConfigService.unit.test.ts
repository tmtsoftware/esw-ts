import { mocked } from 'ts-jest/utils'
import { ConfigServiceImpl } from '../../../src/clients/config/Impl'
import { ConfigService } from '../../../src/clients/config'
import { TokenFactory } from '../../../src'
import { resolveConfigServer } from '../../../src/clients/config/ConfigUtils'

jest.mock('../../../src/clients/config/Impl')
jest.mock('../../../src/clients/config/ConfigUtils')
jest.mock('../../../src/utils/Utils')
const mockResolveConfigServer = mocked(resolveConfigServer)
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
