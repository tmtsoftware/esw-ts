import { Connection, HttpConnection, LocationService } from 'clients/location'
import { ComponentType, Prefix } from 'models'
import { eventually } from 'utils/eventually'
import { resolve } from 'utils/resolve'
import {
  executeComponentScript,
  executeServicesScript,
  executeStopServicesScript
} from 'utils/shell'

export type ServiceName = 'Gateway' | 'Location' | 'Alarm' | 'Event' | 'Config'
const connections: Map<ServiceName, Connection> = new Map()

const gatewayConnection = new HttpConnection(new Prefix('ESW', 'EswGateway'), 'Service')
connections.set('Gateway', gatewayConnection)

const joinWithPrefix = (serviceNames: ServiceName[]) => {
  let args: string[] = []
  serviceNames.forEach((name) => (args = args.concat(['-s', name])))
  return args
}

const connectionFor = (serviceName: ServiceName): Connection =>
  connections.get(serviceName) || gatewayConnection

const locationService = new LocationService()

const waitForLocationToUp = () => eventually(() => locationService.list())

const waitForServicesToUp = async (serviceNames: ServiceName[]) => {
  await waitForLocationToUp()
  return await Promise.all(serviceNames.map(connectionFor).map(resolve))
}

export const startServices = (serviceNames: ServiceName[]) => {
  executeServicesScript(['start', ...joinWithPrefix(serviceNames)])
  return waitForServicesToUp(serviceNames)
}

export const startComponent = (prefix: Prefix, compType: ComponentType, componentConf: string) => {
  executeComponentScript(['--local', '--standalone', componentConf])
  return resolve(new HttpConnection(prefix, compType))
}

export const stopServices = async () => executeStopServicesScript([])
