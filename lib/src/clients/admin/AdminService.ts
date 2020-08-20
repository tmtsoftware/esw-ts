import { ComponentId } from '../../models'
import { Level, LogMetadata } from '../logger'
import { resolveGateway } from '../gateway/ResolveGateway'
import { getPostEndPoint } from '../../utils/Utils'
import { HttpTransport } from '../../utils/HttpTransport'
import { AdminServiceImpl } from './AdminServiceImpl'

export interface AdminService {
  getLogMetadata(componentId: ComponentId): Promise<LogMetadata>

  setLogLevel(componentId: ComponentId, level: Level): Promise<void>
}

export const AdminService: () => Promise<AdminService> = async () => {
  const { host, port } = await resolveGateway()
  const postEndpoint = getPostEndPoint({ host, port })

  return new AdminServiceImpl(new HttpTransport(postEndpoint))
}
