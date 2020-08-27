import { AlarmKey } from '../../../src/clients/alarm'
import { AlarmServiceImpl } from '../../../src/clients/alarm/AlarmServiceImpl'
import { SetAlarmSeverity } from '../../../src/clients/alarm/models/PostCommand'
import { DoneD } from '../../../src/clients/location'
import { Prefix } from '../../../src/models'
import { mockHttpTransport } from '../../helpers/MockHelpers'

const mockResponse = Math.random().toString()
const requestRes: jest.Mock = jest.fn().mockReturnValue(Promise.resolve(mockResponse))
const alarmService = new AlarmServiceImpl(mockHttpTransport(requestRes))

describe('Alarm service', () => {
  test('should set alarm severity for a given prefix | ESW-314', async () => {
    const alarmKey = new AlarmKey(new Prefix('ESW', 'Comp1'), 'alarm1')
    const severity = 'Okay'

    const response = await alarmService.setSeverity(alarmKey, severity)

    expect(response).toEqual(mockResponse)
    expect(requestRes).toBeCalledWith(new SetAlarmSeverity(alarmKey, severity), DoneD)
  })
})
