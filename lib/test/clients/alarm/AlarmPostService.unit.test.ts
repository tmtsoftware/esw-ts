import { AlarmKey } from '../../../src/clients/alarm'
import { AlarmServiceImpl } from '../../../src/clients/alarm/AlarmServiceImpl'
import { SetAlarmSeverity } from '../../../src/clients/alarm/models/PostCommand'
import { DoneD } from '../../../src/clients/location'
import { Prefix } from '../../../src/models'
import { mockHttpTransport } from '../../helpers/MockHelpers'

describe('Alarm service', () => {
  test('should set alarm severity for a given prefix | ESW-314', async () => {
    const requestRes: jest.Mock = jest.fn()
    const alarmService = new AlarmServiceImpl(mockHttpTransport(requestRes))
    const alarmKey = new AlarmKey(new Prefix('ESW', 'Comp1'), 'alarm1')
    const severity = 'Okay'
    await alarmService.setSeverity(alarmKey, severity)

    expect(requestRes).toBeCalledWith(new SetAlarmSeverity(alarmKey, severity), DoneD)
  })
})
