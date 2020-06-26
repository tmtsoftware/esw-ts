import { HttpConnection } from '../clients/location'
import { Prefix } from '../models'

export const gatewayConnection = new HttpConnection(new Prefix('ESW', 'EswGateway'), 'Service')
export const authConnection = new HttpConnection(new Prefix('CSW', 'AAS'), 'Service')
export const configConnection = new HttpConnection(new Prefix('CSW', 'ConfigServer'), 'Service')
export const eventConnection = new HttpConnection(new Prefix('CSW', 'EventServer'), 'Service')
export const alarmConnection = new HttpConnection(new Prefix('CSW', 'AlarmServer'), 'Service')

export const BackendServices = {
  Gateway: gatewayConnection,
  AAS: authConnection,
  Location: gatewayConnection,
  Alarm: alarmConnection,
  Event: eventConnection,
  Config: configConnection
}

export type ServiceName = keyof typeof BackendServices
