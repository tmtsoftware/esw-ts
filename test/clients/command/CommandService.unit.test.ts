import { mocked } from 'ts-jest/utils'
import { CommandService, ComponentId, GATEWAY_CONNECTION, Prefix } from '../../../src'
import { CommandServiceImpl } from '../../../src/clients/command/CommandServiceImpl'
import { resolve } from '../../../src/clients/location/LocationUtils'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { Ws } from '../../../src/utils/Ws'

jest.mock('../../../src/clients/command/CommandServiceImpl')
jest.mock('../../../src/clients/location/LocationUtils')
const mockResolveGateway = mocked(resolve)
const mockImpl = mocked(CommandServiceImpl)

const postEndpoint = 'postEndpoint'
const wsEndpoint = 'wsEndpoint'
const tokenFactory = () => 'validtoken'
mockResolveGateway.mockResolvedValue({
  _type: 'HttpLocation',
  uri: 'http://localhost:1234',
  metadata: {},
  connection: GATEWAY_CONNECTION
})

const componentId = new ComponentId(new Prefix('ESW', 'MoonNight'), 'Sequencer')
const commandServiceImpl = new CommandServiceImpl(
  componentId,
  new HttpTransport(postEndpoint, { tokenFactory }),
  () => new Ws(wsEndpoint)
)

describe('Command Service Factory', () => {
  test('create command service | ESW-305', async () => {
    mockImpl.mockReturnValue(commandServiceImpl)
    const a = await CommandService(componentId, { tokenFactory })

    expect(a).toEqual(commandServiceImpl)
    expect(mockResolveGateway).toBeCalledTimes(1)
  })
})

afterAll(() => jest.resetAllMocks())
