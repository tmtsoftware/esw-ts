import { Done } from '../location'
import { HttpTransport } from '../../utils/HttpTransport'
import { AlarmKey, AlarmSeverity, SetAlarmSeverity } from './models/PostCommand'
import { resolveGateway } from '../gateway/ResolveGateway'

interface AlarmService {
  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done>
}

export const AlarmService = async (): Promise<AlarmService> => {
  const { host, port } = await resolveGateway()
  const url = `http://${host}:${port}/post-endpoint`
  return new AlarmServiceImpl(new HttpTransport(url))
}

export class AlarmServiceImpl implements AlarmService {
  constructor(private readonly httpTransport: HttpTransport<SetAlarmSeverity>) {}

  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done> {
    return this.httpTransport.requestRes(new SetAlarmSeverity(alarmKey, severity), Done)
  }
}
