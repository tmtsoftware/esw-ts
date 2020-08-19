import { Done } from '../location'
import { HttpTransport } from '../../utils/HttpTransport'
import { AlarmKey, AlarmSeverity } from './models/PostCommand'
import { resolveGateway } from '../gateway/ResolveGateway'
import { getPostEndPoint } from '../../utils/Utils'
import { AlarmServiceImpl } from './AlarmServiceImpl'

export interface AlarmService {
  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done>
}

export const AlarmService = async (): Promise<AlarmService> => {
  const url = getPostEndPoint(await resolveGateway())
  return new AlarmServiceImpl(new HttpTransport(url))
}
