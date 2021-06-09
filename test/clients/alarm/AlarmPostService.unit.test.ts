import { mocked } from 'ts-jest/utils'
import { AlarmKey } from '../../../src/clients/alarm'
import { AlarmServiceImpl } from '../../../src/clients/alarm/AlarmServiceImpl'
import { SetAlarmSeverity } from '../../../src/clients/alarm/models/PostCommand'
import { DoneD } from '../../../src/decoders/CommonDecoders'
import { Prefix } from '../../../src/models'
import { HttpTransport } from '../../../src/utils/HttpTransport'
import { verify } from '../../helpers/JestMockHelpers'

jest.mock('../../../src/utils/HttpTransport')

const httpTransport: HttpTransport<SetAlarmSeverity> = new HttpTransport('')
const alarmService = new AlarmServiceImpl(httpTransport)
const mockedHttpTransport = mocked(httpTransport)

describe('Alarm service', () => {
  test('should set alarm severity for a given prefix | ESW-314', async () => {
    const alarmKey = new AlarmKey(new Prefix('ESW', 'Comp1'), 'alarm1')
    const severity = 'Okay'

    mockedHttpTransport.requestRes.mockResolvedValueOnce('Done')
    const response = await alarmService.setSeverity(alarmKey, severity)

    expect(response).toEqual('Done')
    verify(mockedHttpTransport.requestRes).toBeCalledWith(
      new SetAlarmSeverity(alarmKey, severity),
      DoneD
    )
  })
})
