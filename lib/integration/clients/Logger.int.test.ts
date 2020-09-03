import 'whatwg-fetch'
import { mocked } from 'ts-jest/utils'
import { Done } from '../../src/clients/location'
import { LoggingService } from '../../src/clients/logger'
import { Prefix } from '../../src/models'
import { dynamicImport } from '../../src/utils/DynamicLoader'
import { startServices, stopServices } from '../utils/backend'

jest.setTimeout(30000)

/** Web application name loading is mocked at integration level
 * since the application config does not exist in library and
 * it will be coming at runtime from application source code
 */
jest.mock('../../src/utils/DynamicLoader')
const mockImport = mocked(dynamicImport)
mockImport.mockResolvedValue({ AppConfig: { applicationName: 'example' } })

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  // setup location service and gateway
  await startServices(['Gateway'])
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})

describe('Logging Client ', () => {
  const trombonePrefix = new Prefix('NFIRAOS', 'trombone')
  test('set Logging level | ESW-316', async () => {
    const loggingService = await LoggingService()

    const response: Done = await loggingService.log(
      trombonePrefix,
      'DEBUG',
      'setting log level',
      {}
    )

    expect(response).toEqual('Done')
  })
  test('set Logging level without metadata | ESW-316', async () => {
    const loggingService = await LoggingService()

    const response: Done = await loggingService.log(trombonePrefix, 'DEBUG', 'setting log level')

    expect(response).toEqual('Done')
  })
})
