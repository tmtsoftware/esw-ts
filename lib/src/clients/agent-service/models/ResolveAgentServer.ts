import { agentServerConnection } from '../../../config/Connections'
import { extractHostPort } from '../../../utils/Utils'
import { resolve } from '../../location/LocationUtils'

export const resolveAgentServer: () => Promise<{ port: number; host: string }> = async () => {
  const location = await resolve(agentServerConnection)
  return extractHostPort(location.uri)
}
