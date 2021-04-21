import { GATEWAY_CONNECTION } from '../../config/Connections'
import type {
  ComponentId,
  ContainerLifecycleState,
  Done,
  Prefix,
  SupervisorLifecycleState
} from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { extractHostPort, getPostEndPoint } from '../../utils/Utils'
import type { Location } from '../location'
import { resolve } from '../location/LocationUtils'
import type { Level, LogMetadata } from '../logger'
import { AdminServiceImpl } from './AdminServiceImpl'

/**
 * Admin service provides admin related APIs which includes logging APIs
 * @interface
 * @category Service
 */
export interface AdminService {
  /**
   * Restarts the given component(HCD, Assembly or Container)
   *
   * @param componentId   The component id of the component.
   * @return              Done as promise
   */
  restart(componentId: ComponentId): Promise<Done>

  /**
   * Sets the current Lifecycle state of the given component(HCD, Assembly or Container) to Offline
   *
   * @param componentId   the component id of the component which needs to be offline
   * @return              Done as promise
   */
  goOffline(componentId: ComponentId): Promise<Done>

  /**
   * Sets the current Lifecycle state of the given component(HCD, Assembly or Container) to Online
   *
   * @param componentId   the component id of the component which needs to be offline
   * @return              Done as promise
   */
  goOnline(componentId: ComponentId): Promise<Done>

  /**
   * Fetches the current Lifecycle state of the given container
   *
   * @param prefix        the prefix of the container whose lifecycle state needs to be fetched
   * @return             ContainerLifecycleState as promise
   */
  getContainerLifecycleState(prefix: Prefix): Promise<ContainerLifecycleState>

  /**
   * Fetches the current Lifecycle state of the given Assembly or HCD
   *
   * @param componentId  the component id of the component whose lifecycle state needs to be fetched
   * @return             SupervisorLifecycleState as promise
   */
  getComponentLifecycleState(componentId: ComponentId): Promise<SupervisorLifecycleState>

  /**
   * Shuts down the given component(HCD, Assembly or Container)
   *
   * @param componentId   The component id of the component.
   * @return              Done as promise
   */
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
  const location = await resolve(GATEWAY_CONNECTION)
  return createAdminService(location)
}

export const createAdminService = (location: Location): AdminService => {
  const { host, port } = extractHostPort(location.uri)
  const postEndpoint = getPostEndPoint({ host, port })

  return new AdminServiceImpl(new HttpTransport(postEndpoint))
}
