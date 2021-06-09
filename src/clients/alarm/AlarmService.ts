import type { Done, Location } from '../..'
import { GATEWAY_CONNECTION } from '../../config/Connections'
import { HttpTransport } from '../../utils/HttpTransport'
import { extractHostPort, getPostEndPoint } from '../../utils/Utils'
import { resolve } from '../location/LocationUtils'
import { AlarmServiceImpl } from './AlarmServiceImpl'
import type { AlarmKey, AlarmSeverity } from './models/AlarmModels'

/**
 * Alarm Service client API.
 * @category Service
 */
export interface AlarmService {
  /**
   * This API is used to set the given AlarmSeverity of the alarms of the given alarm key.
   *
   * @param alarmKey    The AlarmKey for the subsystem's Component.
   * @param severity    The AlarmSeverity to set into the Alarms.
   * @return            Done as Promise
   */
  setSeverity(alarmKey: AlarmKey, severity: AlarmSeverity): Promise<Done>
}

/**
 * Instantiate Alarm service.
 *
 * @return              AlarmService as Promise
 * @constructor
 */
export const AlarmService = async (): Promise<AlarmService> => {
  const location = await resolve(GATEWAY_CONNECTION)
  return createAlarmService(location)
}

export const createAlarmService = (location: Location): AlarmService => {
  const { host, port } = extractHostPort(location.uri)
  const url = getPostEndPoint({ host, port })
  return new AlarmServiceImpl(new HttpTransport(url))
}
