import { resolveGateway } from '../gateway/ResolveGateway'
import { Done } from '../location'
import { HttpTransport } from '../../utils/HttpTransport'
import { AlarmKey, AlarmSeverity, SetAlarmSeverity } from './models/PostCommand'
import { SetAlarmSeverityFailureD } from '../gateway/GatewayException'

interface AlarmApi {
  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done>
}

export class AlarmService implements AlarmApi {
  private readonly httpTransport: HttpTransport<SetAlarmSeverity>

  constructor() {
    this.httpTransport = new HttpTransport<SetAlarmSeverity>(resolveGateway)
  }

  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done> {
    return this.httpTransport.requestRes(
      new SetAlarmSeverity(alarmKey, severity),
      Done,
      SetAlarmSeverityFailureD
    )
  }
}
