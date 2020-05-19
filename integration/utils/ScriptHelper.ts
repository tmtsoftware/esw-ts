import { Connection, HttpConnection, LocationService } from 'clients/location'
import { ComponentType, Prefix } from 'models'
import { isResolved } from 'utils/DiscoverService'
import { eventually } from 'utils/eventually'
import {
  compConfAbsolutePath,
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
  const servicesResolveStatus = await Promise.all(serviceNames.map(connectionFor).map(isResolved))

  return servicesResolveStatus.every((resolved) => resolved)
}

export const spawnServices = (serviceNames: ServiceName[]) => {
  executeServicesScript(['start', ...joinWithPrefix(serviceNames)])
  return waitForServicesToUp(['Gateway'])
}

export const spawnComponent = (prefix: Prefix, compType: ComponentType, componentConf: string) => {
  executeComponentScript(['--local', '--standalone', compConfAbsolutePath(componentConf)])
  return isResolved(new HttpConnection(prefix, compType))
}

export const stopServices = () => executeStopServicesScript([])
