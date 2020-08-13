import { HttpTransport } from '../../utils/HttpTransport'
import { AlarmKey, AlarmSeverity, SetAlarmSeverity } from './models/PostCommand'
import { Done } from '../location'
import { AlarmService } from './AlarmService'

export class AlarmServiceImpl implements AlarmService {
  constructor(private readonly httpTransport: HttpTransport<SetAlarmSeverity>) {}

  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done> {
    return this.httpTransport.requestRes(new SetAlarmSeverity(alarmKey, severity), Done)
  }
}
