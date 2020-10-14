import { gatewayConnection, resolveConnection } from '../../config/Connections'
import type { ComponentId, Done } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint } from '../../utils/Utils'
import type { Level, LogMetadata } from '../logger'
import { AdminServiceImpl } from './AdminServiceImpl'

/**
 * Admin service provides admin related APIs which includes logging related APIs
 */
export interface AdminService {
  /**
   * Get basic logging configuration values of the component.
   *
   * @param componentId The component id of the component.
   * @return LogMetadata containing all the log configuration values
   */
  getLogMetadata(componentId: ComponentId): Promise<LogMetadata>

  /**
   * Set new log level of a component.
   *
   * @param componentId  The component id of the component
   * @param level Expected Log level for the component.
   * @return Promise of Done as a confirmation of action.
   */
  setLogLevel(componentId: ComponentId, level: Level): Promise<Done>
}

export const AdminService: () => Promise<AdminService> = async () => {
  const { host, port } = await resolveConnection(gatewayConnection)
  const postEndpoint = getPostEndPoint({ host, port })
  return new AdminServiceImpl(new HttpTransport(postEndpoint))
}
