import { Prefix } from '../../models'
import { Done } from '../location'
import { Level } from './models/Level'
import { resolveGateway } from '../gateway/ResolveGateway'
import { getPostEndPoint } from '../../utils/Utils'
import { HttpTransport } from '../../utils/HttpTransport'
import { LoggingServiceImpl } from './LoggingServiceImpl'

export interface LoggingService {
  log(prefix: Prefix, level: Level, message: string, metadata: Record<string, any>): Promise<Done>
}

export const LoggingService: () => Promise<LoggingService> = async () => {
  const { host, port } = await resolveGateway()
  const postEndpoint = getPostEndPoint({ host, port })

  return new LoggingServiceImpl(new HttpTransport(postEndpoint))
}
