import { Prefix } from 'models'
import { startServices, stopServices } from 'utils/backend'
import { AlarmKey, AlarmService } from 'clients/alarm'
import { Done } from 'clients/location'

jest.setTimeout(80000)

const trombonePrefix = new Prefix('NFIRAOS', 'trombone')

beforeAll(async () => {
  //todo: fix this console.error for jsdom errors
  console.error = jest.fn()
  await startServices(['Alarm', 'Gateway'])
})

afterAll(async () => {
  await stopServices()
  jest.clearAllMocks()
})

describe('Alarm Service', () => {
  test('set severity for the given component', async () => {
    const alarmService = new AlarmService()
    const alarmKey = new AlarmKey(trombonePrefix, 'tromboneAxisHighLimitAlarm')

    const response: Done = await alarmService.setSeverity(alarmKey, 'Okay')

    expect(response).toEqual('done')
  })
})
