import { CommandService } from 'clients/command'
import { ComponentId, Prefix, Setup } from 'models'
import { startComponent, startServices, stopServices } from 'utils/backend'

jest.setTimeout(100000)

const hcdPrefix = new Prefix('CSW', 'testHcd')

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  // setup location service and gateway
  await startServices(['Gateway'])
  // setup test hcd
  await startComponent(hcdPrefix, 'HCD', 'testHcd.conf')
})

afterAll(() => {
  stopServices()
  jest.clearAllMocks()
})

describe('Command Client', () => {
  test('should get accepted response on oneway command', async () => {
    const componentId = new ComponentId(hcdPrefix, 'HCD')
    const commandService = new CommandService(componentId)
    const setupCommand = new Setup('CSW.testHcd', 'c1', [], ['obsId'])

    const actualResponse = await commandService.oneway(setupCommand)
    expect(actualResponse._type).toEqual('Accepted')
  })
})
