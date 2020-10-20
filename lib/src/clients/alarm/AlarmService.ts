import type { Done } from '../..'
import { gatewayConnection, resolveConnection } from '../../config/Connections'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint } from '../../utils/Utils'
import { AlarmServiceImpl } from './AlarmServiceImpl'
import type { AlarmKey, AlarmSeverity } from './models/PostCommand'

/**
 * @category Service
 */
export interface AlarmService {
  /**
   * This API is used to set the given AlarmSeverity of the alarms of the given alarm key.
   *
   * @param alarmKey The AlarmKey of the Alarms.
   * @param severity The AlarmSeverity to set into the Alarms.
   * @return Done as Promise
   */
  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done>
}

export const AlarmService = async (): Promise<AlarmService> => {
  const { host, port } = await resolveConnection(gatewayConnection)
  const url = getPostEndPoint({ host, port })
  return new AlarmServiceImpl(new HttpTransport(url))
}
