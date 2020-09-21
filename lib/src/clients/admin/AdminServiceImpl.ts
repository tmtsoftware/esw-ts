import type { ComponentId } from '../../models'
import type { HttpTransport } from '../../utils/HttpTransport'
import type { GatewayAdminPostRequest } from '../gateway/models/Gateway'
import { Done, DoneD } from '../location'
import { Level, LogMetadata, LogMetadataD } from '../logger'
import type { AdminService } from './AdminService'
import { GetLogMetadata, SetLogLevel } from './models/PostCommand'

export class AdminServiceImpl implements AdminService {
  constructor(private readonly httpTransport: HttpTransport<GatewayAdminPostRequest>) {}

  getLogMetadata(componentId: ComponentId): Promise<LogMetadata> {
    return this.httpTransport.requestRes(new GetLogMetadata(componentId), LogMetadataD)
  }

  setLogLevel(componentId: ComponentId, level: Level): Promise<Done> {
    return this.httpTransport.requestRes(new SetLogLevel(componentId, level), DoneD)
  }
}
