import { callUntil } from 'DiscoverService'
import { Prefix } from 'models'
import { spawnServices, stopServices } from 'ScriptHelper'

//todo: fix this timeout problem
jest.setTimeout(40000)
beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  spawnServices(['Gateway'], 'testHcd.conf')
  await callUntil(new Prefix('ESW', 'EswGateway'))
})

afterAll(() => {
  stopServices()
  jest.clearAllMocks()
})

test('command client integration test', () => {
  console.log('test started')
})
