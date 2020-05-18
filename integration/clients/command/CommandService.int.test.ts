import { CommandService } from 'clients/command'
import { callUntil } from 'DiscoverService'
import { ComponentId, Prefix, Setup } from 'models'
import { spawnServices, stopServices } from 'ScriptHelper'

jest.setTimeout(15000)

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  spawnServices(['Gateway'], 'testHcd.conf')
  await callUntil(new Prefix('ESW', 'EswGateway'))
  await callUntil(new Prefix('CSW', 'testHcd'))
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
