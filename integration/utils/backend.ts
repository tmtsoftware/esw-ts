import { HttpConnection } from 'clients/location'
import { ComponentType, Prefix } from 'models'
import { authConnection } from 'utils/auth'
import { resolve, waitForServicesToUp } from 'utils/healthCheck'
import {
  executeComponentScript,
  executeServicesScript,
  executeStopServicesScript
} from 'utils/shell'

const gatewayConnection = new HttpConnection(new Prefix('ESW', 'EswGateway'), 'Service')

export const BackendServices = {
  Gateway: gatewayConnection,
  AAS: authConnection,
  Location: gatewayConnection,
  Alarm: gatewayConnection,
  Event: gatewayConnection,
  Config: gatewayConnection
}

export type ServiceName = keyof typeof BackendServices

const joinWithPrefix = (serviceNames: ServiceName[]) => serviceNames.flatMap((name) => ['-s', name])

export const startServices = (serviceNames: ServiceName[]) => {
  executeServicesScript(['start', ...joinWithPrefix(serviceNames)])
  return waitForServicesToUp(serviceNames)
}

export const startComponent = (prefix: Prefix, compType: ComponentType, componentConf: string) => {
  executeComponentScript(['--local', '--standalone', componentConf])
  return resolve(new HttpConnection(prefix, compType))
}

export const stopServices = () => executeStopServicesScript([])
