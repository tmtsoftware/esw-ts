import 'whatwg-fetch'
import { AlarmKey, AlarmService } from '../../src/clients/alarm'
import { APP_CONFIG_PATH, setAppConfigPath } from '../../src/config/AppConfigPath'
import { Done, Prefix } from '../../src/models'
import { startServices, stopServices } from '../utils/backend'

jest.setTimeout(30000)

const OLD_APP_CONFIG_PATH = APP_CONFIG_PATH

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  setAppConfigPath('../../test/assets/appconfig/AppConfig.ts')
  // setup location service and gateway
  await startServices(['Gateway'])
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
  setAppConfigPath(OLD_APP_CONFIG_PATH)
})

describe('Alarm Client', () => {
  const trombonePrefix = new Prefix('NFIRAOS', 'trombone')
  test('set severity for the given component | ESW-314', async () => {
    const alarmService = await AlarmService()
    const alarmKey = new AlarmKey(trombonePrefix, 'tromboneAxisHighLimitAlarm')

    const response: Done = await alarmService.setSeverity(alarmKey, 'Okay')

    expect(response).toEqual('Done')
  })
})
