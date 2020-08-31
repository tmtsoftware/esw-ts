import { agentServiceConnection } from '../../../config/Connections'
import { extractHostPort } from '../../../utils/Utils'
import { resolve } from '../../location/LocationUtils'

export const resolveAgentService: () => Promise<{ port: number; host: string }> = async () => {
  const location = await resolve(agentServiceConnection)
  return extractHostPort(location.uri)
}
