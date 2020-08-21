import { HttpConnection } from '../clients/location'
import { Prefix } from '../models'

export const gatewayConnection = HttpConnection(new Prefix('ESW', 'EswGateway'), 'Service')
export const authConnection = HttpConnection(new Prefix('CSW', 'AAS'), 'Service')
export const configConnection = HttpConnection(new Prefix('CSW', 'ConfigServer'), 'Service')
export const sequenceManagerConnection = HttpConnection(
  new Prefix('ESW', 'sequence_manager'),
  'Service'
)
