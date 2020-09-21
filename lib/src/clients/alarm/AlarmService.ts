import { gatewayConnection, resolveConnection } from '../../config/Connections'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint } from '../../utils/Utils'
import type { Done } from '../location'
import { AlarmServiceImpl } from './AlarmServiceImpl'
import type { AlarmKey, AlarmSeverity } from './models/PostCommand'

export interface AlarmService {
  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done>
}

export const AlarmService = async (): Promise<AlarmService> => {
  const { host, port } = await resolveConnection(gatewayConnection)
  const url = getPostEndPoint({ host, port })
  return new AlarmServiceImpl(new HttpTransport(url))
}
