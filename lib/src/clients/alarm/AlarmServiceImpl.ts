import type { HttpTransport } from '../../utils/HttpTransport'
import type { Done } from '../location'
import { DoneD } from '../location/models/LocationResponses'
import type { AlarmService } from './AlarmService'
import { AlarmKey, AlarmSeverity, SetAlarmSeverity } from './models/PostCommand'

export class AlarmServiceImpl implements AlarmService {
  constructor(private readonly httpTransport: HttpTransport<SetAlarmSeverity>) {}

  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done> {
    return this.httpTransport.requestRes(new SetAlarmSeverity(alarmKey, severity), DoneD)
  }
}
