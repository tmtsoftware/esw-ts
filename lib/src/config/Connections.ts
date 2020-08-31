import { AkkaConnection, HttpConnection, Connection } from '../clients/location'
import { resolve } from '../clients/location/LocationUtils'
import { Prefix } from '../models'
import { extractHostPort } from '../utils/Utils'

export const gatewayConnection: Connection = HttpConnection(
  new Prefix('ESW', 'EswGateway'),
  'Service'
)
export const authConnection = HttpConnection(new Prefix('CSW', 'AAS'), 'Service')
export const configConnection = HttpConnection(new Prefix('CSW', 'ConfigServer'), 'Service')
export const sequenceManagerConnection = HttpConnection(
  new Prefix('ESW', 'sequence_manager'),
  'Service'
)
export const agentServiceConnection = HttpConnection(new Prefix('ESW', 'agent_service'), 'Service')
export const eswAgentConnection = AkkaConnection(new Prefix('ESW', 'esw_machine'), 'Machine')

export const resolveConnection: (
  connection: Connection
) => Promise<{ port: number; host: string }> = async (connection: Connection) => {
  const location = await resolve(connection)
  return extractHostPort(location.uri)
}
