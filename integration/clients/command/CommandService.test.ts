import { sleep, spawnServices, stopServices } from 'ScriptHelper'
import { CommandService } from 'clients/command'
import { ComponentId, Prefix, Setup } from 'models'

jest.setTimeout(30000)
beforeAll(() => {
  spawnServices(['Gateway'])
})

afterAll(async () => {
  await stopServices()
})

test('command client integration test', async () => {
  await sleep(20000)
  const commandService = new CommandService(new ComponentId(new Prefix('CSW', 'testHcd'), 'HCD'))

  const setupCommand = new Setup('esw.test', 'c1', [], ['obsId'])
  await commandService.oneway(setupCommand)
})
