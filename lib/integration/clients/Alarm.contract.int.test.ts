import { AlarmKey, AlarmService } from '../../src/clients/alarm'
import { Done } from '../../src/clients/location'
import { Prefix } from '../../src/models'
import { startServices, stopServices } from '../utils/backend'

jest.setTimeout(30000)

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
    const alarmService = new AlarmService()
    const alarmKey = new AlarmKey(trombonePrefix, 'tromboneAxisHighLimitAlarm')

    const response: Done = await alarmService.setSeverity(alarmKey, 'Okay')

    expect(response).toEqual('Done')
  })

  test('set severity for the component | ESW-314', async () => {
    const alarmService = new AlarmService()
    const trombonePrefix = new Prefix('TCS', 'trombone')

    const alarmKey = new AlarmKey(trombonePrefix, 'InvalidAlarm')

    let response
    try {
      response = await alarmService.setSeverity(alarmKey, 'Okay')
    } catch (e) {
      console.log(e._type)
    }

    expect(response).toEqual('Done')
  })

  test('set severity for the wcomponent | ESW-314', async () => {
    const alarmService = new AlarmService()
    const trombonePrefix = new Prefix('TCS', 'trombone')

    const alarmKey = new AlarmKey(trombonePrefix, 'InvalidAlarm')

    try {
      await alarmService.setSeverity(alarmKey, 'Okay')
    } catch (e) {
      console.log(e)
    }

    // expect(response).toEqual('Done')
  })
})
