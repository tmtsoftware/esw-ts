import { CommandService } from 'clients/command'
import { ComponentId, Prefix, Setup } from 'models'
import { spawnComponent, spawnServices, stopServices } from 'ScriptHelper'

jest.setTimeout(20000)

const hcdPrefix = new Prefix('CSW', 'testHcd')

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  await spawnServices(['Gateway'])
  await spawnComponent(hcdPrefix, 'HCD', 'testHcd.conf')
})

afterAll(() => {
  stopServices()
  jest.clearAllMocks()
})

test('command client integration test', async () => {
  const componentId = new ComponentId(new Prefix('CSW', 'testHcd'), 'HCD')
  const commandService = new CommandService(componentId)
  const setupCommand = new Setup('CSW.testHcd', 'c1', [], ['obsId'])

  const actualResponse = await commandService.oneway(setupCommand)
  expect(actualResponse._type).toEqual('Accepted')
})
