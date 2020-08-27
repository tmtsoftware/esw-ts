import { Prefix } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint } from '../../utils/Utils'
import { resolveGateway } from '../gateway/ResolveGateway'
import { Done } from '../location'
import { LoggingServiceImpl } from './LoggingServiceImpl'
import { Level } from './models/Level'

export interface LoggingService {
  log(prefix: Prefix, level: Level, message: string, metadata?: Record<string, any>): Promise<Done>
}

export const LoggingService: () => Promise<LoggingService> = async () => {
  const { host, port } = await resolveGateway()
  const postEndpoint = getPostEndPoint({ host, port })

  return new LoggingServiceImpl(new HttpTransport(postEndpoint))
}
