import { resolveGateway } from '../gateway/resolveGateway'
import { Done } from '../location'
import { HttpTransport } from '../../utils/HttpTransport'
import { AlarmKey, AlarmSeverity, SetAlarmSeverity } from './models/PostCommand'

interface AlarmApi {
  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done>
}

export class AlarmService implements AlarmApi {
  private readonly httpTransport: HttpTransport<SetAlarmSeverity>

  constructor() {
    this.httpTransport = new HttpTransport<SetAlarmSeverity>(resolveGateway)
  }

  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done> {
    return this.httpTransport.requestRes(new SetAlarmSeverity(alarmKey, severity))
  }
}
