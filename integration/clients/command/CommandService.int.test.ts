import { CommandService } from 'clients/command'
import { ComponentId, Prefix, Setup } from 'models'
import { getToken } from 'utils/auth'
import { startComponent, startServices, stopServices } from 'utils/backend'
import { addBearerToken } from 'utils/post'

jest.setTimeout(50000)

const hcdPrefix = new Prefix('IRIS', 'testHcd')

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
    const token = await getToken('esw-gateway-client', 'gateway-user1', 'gateway-user1', 'TMT-test')
    addBearerToken(token)
    const componentId = new ComponentId(hcdPrefix, 'HCD')
    const commandService = new CommandService(componentId)
    const setupCommand = new Setup('CSW.testHcd', 'c1', [], ['obsId'])

    const actualResponse = await commandService.oneway(setupCommand)
    expect(actualResponse._type).toEqual('Accepted')
  })
})
