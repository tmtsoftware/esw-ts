import { mocked } from 'ts-jest/utils'
import { CommandService } from '../../../src/clients/command'
import { CommandServiceImpl } from '../../../src/clients/command/CommandServiceImpl'
import { resolveGateway } from '../../../src/clients/gateway/ResolveGateway'
import { ComponentId, Prefix } from '../../../src/models'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { getPostEndPoint, getWebSocketEndPoint } from '../../../src/utils/Utils'
import { Ws } from '../../../src/utils/Ws'

jest.mock('../../../src/clients/command/CommandServiceImpl')
jest.mock('../../../src/clients/gateway/ResolveGateway')
jest.mock('../../../src/utils/Utils')
const postMockEndpoint = mocked(getPostEndPoint)
const wsMockEndpoint = mocked(getWebSocketEndPoint)
const mockResolveGateway = mocked(resolveGateway)
const mockImpl = mocked(CommandServiceImpl)

const postEndpoint = 'postEndpoint'
const wsEndpoint = 'wsEndpoint'
const uri = { host: '123', port: 1234 }
const tokenFactory = () => 'validtoken'
mockResolveGateway.mockResolvedValue(uri)
postMockEndpoint.mockReturnValue(postEndpoint)
wsMockEndpoint.mockReturnValue(wsEndpoint)

const componentId = new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')
const commandServiceImpl = new CommandServiceImpl(
  componentId,
  new HttpTransport(postEndpoint, tokenFactory),
  () => new Ws(wsEndpoint)
)

describe('Command Service Factory', () => {
  test('create command service | ESW-305', async () => {
    mockImpl.mockReturnValue(commandServiceImpl)
    const a = await CommandService(componentId, tokenFactory)

    expect(a).toEqual(commandServiceImpl)
    expect(mockResolveGateway).toBeCalledTimes(1)
    expect(postMockEndpoint).toBeCalledWith(uri)
    expect(wsMockEndpoint).toBeCalledWith(uri)
  })
})

afterAll(() => jest.resetAllMocks())
