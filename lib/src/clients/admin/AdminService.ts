import { gatewayConnection, resolveConnection } from '../../config/Connections'
import type {
  ComponentId,
  Done,
  Prefix,
  ContainerLifecycleState,
  SupervisorLifecycleState
} from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint } from '../../utils/Utils'
import type { Level, LogMetadata } from '../logger'
import { AdminServiceImpl } from './AdminServiceImpl'

/**
 * Admin service provides admin related APIs which includes logging APIs
 * @interface
 * @category Service
 */
export interface AdminService {
  restart(componentId: ComponentId): Promise<Done>

  goOffline(componentId: ComponentId): Promise<Done>

  goOnline(componentId: ComponentId): Promise<Done>

  getContainerLifecycleState(prefix: Prefix): Promise<ContainerLifecycleState>

  getComponentLifecycleState(componentId: ComponentId): Promise<SupervisorLifecycleState>

  shutdown(componentId: ComponentId): Promise<Done>
  /**
   * Get basic logging configuration values of the component.
   *
   * @param componentId   The component id of the component.
   * @return              LogMetadata as promise
   */
  getLogMetadata(componentId: ComponentId): Promise<LogMetadata>

  /**
   * Set new log level of a component.
   *
   * @param componentId   The component id of the component
   * @param level         Expected Log level for the component.
   * @return              Done as promise
   */
  setLogLevel(componentId: ComponentId, level: Level): Promise<Done>
}

/**
 * Instantiate Admin service.
 *
 * @return                AdminService as Promise
 * @constructor
 */
export const AdminService = async (): Promise<AdminService> => {
  const { host, port } = await resolveConnection(gatewayConnection)
  const postEndpoint = getPostEndPoint({ host, port })
  return new AdminServiceImpl(new HttpTransport(postEndpoint))
}
