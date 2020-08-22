import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint } from '../../utils/Utils'
import { resolveGateway } from '../gateway/ResolveGateway'
import { Done } from '../location'
import { AlarmServiceImpl } from './AlarmServiceImpl'
import { AlarmKey, AlarmSeverity } from './models/PostCommand'

export interface AlarmService {
  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done>
}

export const AlarmService = async (): Promise<AlarmService> => {
  const url = getPostEndPoint(await resolveGateway())
  return new AlarmServiceImpl(new HttpTransport(url))
}
