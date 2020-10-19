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
  log(prefix: Prefix, level: Level, message: string, metadata?: Record<string, any>): Promise<Done>
}

export const LoggingService: () => Promise<LoggingService> = async () => {
  const { host, port } = await resolveConnection(gatewayConnection)
  const postEndpoint = getPostEndPoint({ host, port })

  return new LoggingServiceImpl(new HttpTransport(postEndpoint))
}
