import { GATEWAY_CONNECTION } from '../../config/Connections'
import type { AuthData, Done, Prefix } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { extractHostPort, getPostEndPoint } from '../../utils/Utils'
import type { Location } from '../location'
import { resolve } from '../location/LocationUtils'
import { LoggingServiceImpl } from './LoggingServiceImpl'
import type { Level } from './models/Level'

/**
 * Logging service client API.
 * @category Service
 */
export interface LoggingService {
  /**
   * Writes the given message of the given level for the component
   *
   * @param prefix        the Prefix of the component
   * @param level         the log Level. Example - INFO, TRACE etc
   * @param message       the message to be logged
   * @param metadata      optional key-value pairs to be logged along with message
   * @return              Done as Promise
   */
  log(prefix: Prefix, level: Level, message: string, metadata?: Record<string, any>): Promise<Done>
}

/**
 * Instantiate logging service.
 *
 * @return                LoggingService as Promise
 * @constructor
 */
export const LoggingService = async (authData?: AuthData): Promise<LoggingService> => {
  const location = await resolve(GATEWAY_CONNECTION)
  return createLoggingService(location, authData)
}

export const createLoggingService = (location: Location, authData?: AuthData): LoggingService => {
  const { host, port } = extractHostPort(location.uri)
  const postEndpoint = getPostEndPoint({ host, port })

  return new LoggingServiceImpl(new HttpTransport(postEndpoint, authData))
}
