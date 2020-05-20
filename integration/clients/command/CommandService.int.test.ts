import { CommandService } from 'clients/command'
import { ComponentId, Prefix, Setup } from 'models'
import { startComponent, startServices, stopServices } from 'utils/backend'

jest.setTimeout(30000)

const hcdPrefix = new Prefix('CSW', 'testHcd')

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  await startServices(['Gateway'])
  await startComponent(hcdPrefix, 'HCD', 'testHcd.conf')
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})

test('command client integration test', async () => {
  const componentId = new ComponentId(hcdPrefix, 'HCD')
  const commandService = new CommandService(componentId)
  const setupCommand = new Setup('CSW.testHcd', 'c1', [], ['obsId'])

  const actualResponse = await commandService.oneway(setupCommand)
  expect(actualResponse._type).toEqual('Accepted')
})
