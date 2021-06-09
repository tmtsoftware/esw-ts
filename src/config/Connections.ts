import { resolve } from '../clients/location/LocationUtils'
import { AkkaConnection, Connection, HttpConnection } from '../clients/location/models/Connection'
import { Prefix } from '../models'
import { extractHostPort } from '../utils/Utils'

export const GATEWAY_CONNECTION: Connection = HttpConnection(
  new Prefix('ESW', 'EswGateway'),
  'Service'
)
export const AUTH_CONNECTION = HttpConnection(new Prefix('CSW', 'AAS'), 'Service')
export const CONFIG_CONNECTION = HttpConnection(new Prefix('CSW', 'ConfigServer'), 'Service')
export const SEQUENCE_MANAGER_CONNECTION = HttpConnection(
  new Prefix('ESW', 'sequence_manager'),
  'Service'
)
export const AGENT_SERVICE_CONNECTION = HttpConnection(
  new Prefix('ESW', 'agent_service'),
  'Service'
)
export const ESW_AGENT_CONNECTION = AkkaConnection(new Prefix('ESW', 'esw_machine'), 'Machine')

export const resolveConnection: (
  connection: Connection
) => Promise<{ port: number; host: string }> = async (connection: Connection) => {
  const location = await resolve(connection)
  return extractHostPort(location.uri)
}
