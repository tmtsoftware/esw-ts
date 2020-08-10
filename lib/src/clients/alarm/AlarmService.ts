import { Done } from '../location'
import { HttpTransport } from '../../utils/HttpTransport'
import { AlarmKey, AlarmSeverity, SetAlarmSeverity } from './models/PostCommand'
import { resolveGateway } from '../gateway/ResolveGateway'
import { getPostEndPoint } from '../../utils/Utils'

interface AlarmService {
  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done>
}

export const AlarmService = async (): Promise<AlarmService> => {
  const url = getPostEndPoint(await resolveGateway())
  return new AlarmServiceImpl(new HttpTransport(url))
}

export class AlarmServiceImpl implements AlarmService {
  constructor(private readonly httpTransport: HttpTransport<SetAlarmSeverity>) {}

  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done> {
    return this.httpTransport.requestRes(new SetAlarmSeverity(alarmKey, severity), Done)
  }
}
