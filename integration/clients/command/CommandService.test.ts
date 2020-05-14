import { spawnServices, stopServices } from 'ScriptHelper'
import { callUntil } from 'DiscoverService'
import { Prefix } from 'models'
// import { CommandService } from 'clients/command'
// import { ComponentId, Prefix, Setup } from 'models'

jest.setTimeout(35000)
beforeAll(async () => {
  spawnServices(['Gateway'])
  // spawnComponent('testHcd.conf')
  try {
    await callUntil(new Prefix('ESW', 'EswGateway'))
  } catch (e) {
    console.log('errr')
  }
  console.log('assadsad')
})

afterAll(async () => {
  await stopServices()
})

test('command client integration test', async () => {
  console.log('test started')
  // const commandService = new CommandService(new ComponentId(new Prefix('CSW', 'testHcd'), 'HCD'))
  //
  // const setupCommand = new Setup('esw.test', 'c1', [], ['obsId'])
  // await commandService.oneway(setupCommand)
})
