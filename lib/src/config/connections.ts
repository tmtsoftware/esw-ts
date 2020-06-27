import { HttpConnection } from '../clients/location'
import { Prefix } from '../models'

export const gatewayConnection = new HttpConnection(new Prefix('ESW', 'EswGateway'), 'Service')
export const authConnection = new HttpConnection(new Prefix('CSW', 'AAS'), 'Service')
export const configConnection = new HttpConnection(new Prefix('CSW', 'ConfigServer'), 'Service')
