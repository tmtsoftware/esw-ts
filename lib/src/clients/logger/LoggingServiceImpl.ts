import { Prefix } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { GatewayLoggingPostRequest } from '../gateway/models/Gateway'
import { Done } from '../location'
import { LoggingService } from './LoggingService'
import { Level } from './models/Level'
import { Log } from './models/PostCommand'

export class LoggingServiceImpl implements LoggingService {
  constructor(private readonly httpTransport: HttpTransport<GatewayLoggingPostRequest>) {}

  log(prefix: Prefix, level: Level, message: string, metadata: Record<string, any>): Promise<Done> {
    return this.httpTransport.requestRes(new Log(prefix, level, message, metadata), Done)
  }
}
