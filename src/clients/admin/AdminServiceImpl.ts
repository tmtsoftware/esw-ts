import { ContainerLifecycleStateD, SupervisorLifecycleStateD } from '../../decoders/AdminDecoders'
import { DoneD } from '../../decoders/CommonDecoders'
import { LogMetadataD } from '../../decoders/LoggerDecoders'
import type {
  ComponentId,
  ContainerLifecycleState,
  Done,
  Prefix,
  SupervisorLifecycleState
} from '../../models'
import type { HttpTransport } from '../../utils/HttpTransport'
import type { GatewayAdminPostRequest } from '../gateway/models/Gateway'
import type { Level, LogMetadata } from '../logger'
import type { AdminService } from './AdminService'
import {
  GetComponentLifecycleState,
  GetContainerLifecycleState,
  GetLogMetadata,
  GoOffline,
  GoOnline,
  Restart,
  SetLogLevel,
  Shutdown
} from './models/PostCommand'

export class AdminServiceImpl implements AdminService {
  constructor(private readonly httpTransport: HttpTransport<GatewayAdminPostRequest>) {}

  restart(componentId: ComponentId): Promise<Done> {
    return this.httpTransport.requestRes(new Restart(componentId), DoneD)
  }

  goOffline(componentId: ComponentId): Promise<Done> {
    return this.httpTransport.requestRes(new GoOffline(componentId), DoneD)
  }

  goOnline(componentId: ComponentId): Promise<Done> {
    return this.httpTransport.requestRes(new GoOnline(componentId), DoneD)
  }

  getContainerLifecycleState(prefix: Prefix): Promise<ContainerLifecycleState> {
    return this.httpTransport.requestRes(
      new GetContainerLifecycleState(prefix),
      ContainerLifecycleStateD
    )
  }

  getComponentLifecycleState(componentId: ComponentId): Promise<SupervisorLifecycleState> {
    return this.httpTransport.requestRes(
      new GetComponentLifecycleState(componentId),
      SupervisorLifecycleStateD
    )
  }

  shutdown(componentId: ComponentId): Promise<Done> {
    return this.httpTransport.requestRes(new Shutdown(componentId), DoneD)
  }

  getLogMetadata(componentId: ComponentId): Promise<LogMetadata> {
    return this.httpTransport.requestRes(new GetLogMetadata(componentId), LogMetadataD)
  }

  setLogLevel(componentId: ComponentId, level: Level): Promise<Done> {
    return this.httpTransport.requestRes(new SetLogLevel(componentId, level), DoneD)
  }
}
