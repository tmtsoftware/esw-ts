import { gatewayConnection, resolveConnection } from '../../config/Connections'
import type { Done, Prefix } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint } from '../../utils/Utils'
import { LoggingServiceImpl } from './LoggingServiceImpl'
import type { Level } from './models/Level'

/**
 * @category Service
 */
export interface LoggingService {
  /**
   * Writes the given message of the given level for the component
   *
   * @param prefix the prefix of the component
   * @param level the log Level. Example - INFO, TRACE etc
   * @param message the message to be logged
   * @param metadata optional key-value pairs to be logged along with message
   * @return Done as Promise value
   */
  log(prefix: Prefix, level: Level, message: string, metadata?: Record<string, any>): Promise<Done>
}

export const LoggingService: () => Promise<LoggingService> = async () => {
  const { host, port } = await resolveConnection(gatewayConnection)
  const postEndpoint = getPostEndPoint({ host, port })

  return new LoggingServiceImpl(new HttpTransport(postEndpoint))
}
