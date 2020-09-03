import 'whatwg-fetch'
import { mocked } from 'ts-jest/utils'
import { AlarmKey, AlarmService } from '../../src/clients/alarm'
import { Done } from '../../src/clients/location'
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

describe('Alarm Client ', () => {
  const trombonePrefix = new Prefix('NFIRAOS', 'trombone')
  test('set severity for the given component | ESW-314', async () => {
    const alarmService = await AlarmService()
    const alarmKey = new AlarmKey(trombonePrefix, 'tromboneAxisHighLimitAlarm')

    const response: Done = await alarmService.setSeverity(alarmKey, 'Okay')

    expect(response).toEqual('Done')
  })
})
