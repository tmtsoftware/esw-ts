import { CommandService } from 'clients/command'
import { ComponentId, Prefix, Setup } from 'models'
import { getToken } from 'utils/auth'
import { startComponent, startServices, stopServices } from 'utils/backend'

jest.setTimeout(80000)

const hcdPrefix = new Prefix('IRIS', 'testHcd')
const componentId = new ComponentId(hcdPrefix, 'HCD')
const validTokenFactory = () =>
  getToken('esw-gateway-client', 'gateway-user1', 'gateway-user1', 'TMT-test')

const tokenWithoutRole = () =>
  getToken('esw-gateway-client', 'gateway-user2', 'gateway-user2', 'TMT-test')

const invalidTokenFactory = () => Promise.resolve('')

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  // setup location service and gateway
  await startServices(['AAS', 'Gateway'])
  // setup test hcd
  await startComponent(hcdPrefix, 'HCD', 'testHcd.conf')
})

afterAll(() => {
  stopServices()
  jest.clearAllMocks()
})

describe('Command Client', () => {
  test('should get accepted response on oneway command', async () => {
    const commandService = new CommandService(componentId, validTokenFactory)
    const setupCommand = new Setup('CSW.testHcd', 'c1', [], ['obsId'])
    const actualResponse = await commandService.oneway(setupCommand)
    expect(actualResponse._type).toEqual('Accepted')
  })

  test('should get unauthorised error on sending invalid token', async () => {
    const commandService = new CommandService(componentId, invalidTokenFactory)
    const setupCommand = new Setup('CSW.testHcd', 'c1', [], ['obsId'])

    await expect(commandService.oneway(setupCommand)).rejects.toThrow(Error('Unauthorized'))
  })

  test('should get forbidden error on sending command to different subsystem', async () => {
    const commandService = new CommandService(componentId, tokenWithoutRole)
    const setupCommand = new Setup('CSW.testHcd', 'c1', [], ['obsId'])

    await expect(commandService.oneway(setupCommand)).rejects.toThrow(Error('Forbidden'))
  })
})
