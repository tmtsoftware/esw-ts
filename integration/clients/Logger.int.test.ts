import 'whatwg-fetch'
import { LoggingService } from '../../src/clients/logger'
import { setAppName } from '../../src/config'
import { Done, Prefix } from '../../src/models'
import { startServices, stopServices } from '../utils/backend'

jest.setTimeout(30000)

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  setAppName('test-app')
  // setup location service and gateway
  await startServices(['Gateway'])
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})

describe('Logging Client', () => {
  const trombonePrefix = new Prefix('NFIRAOS', 'trombone')
  test('set Logging level | ESW-316', async () => {
    const loggingService = await LoggingService()

    const response: Done = await loggingService.log(trombonePrefix, 'DEBUG', 'setting log level', {})

    expect(response).toEqual('Done')
  })
  test('set Logging level without metadata | ESW-316', async () => {
    const loggingService = await LoggingService()

    const response: Done = await loggingService.log(trombonePrefix, 'DEBUG', 'setting log level')

    expect(response).toEqual('Done')
  })
})
