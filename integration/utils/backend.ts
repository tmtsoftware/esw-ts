import { Connection, HttpConnection, LocationService } from 'clients/location'
import { ComponentType, Prefix } from 'models'
import { authConnection } from 'utils/auth'
import { delay, eventually } from 'utils/eventually'
import { resolve } from 'utils/resolve'
import {
  executeComponentScript,
  executeServicesScript,
  executeStopServicesScript
} from 'utils/shell'

export type ServiceName = 'Gateway' | 'Location' | 'Alarm' | 'Event' | 'Config' | 'AAS'
const connections: Map<ServiceName, Connection> = new Map()

const gatewayConnection = new HttpConnection(new Prefix('ESW', 'EswGateway'), 'Service')
connections.set('Gateway', gatewayConnection)
connections.set('AAS', authConnection)

const joinWithPrefix = (serviceNames: ServiceName[]) => {
  let args: string[] = []
  serviceNames.forEach((name) => (args = args.concat(['-s', name])))
  return args
}

const connectionFor = (serviceName: ServiceName): Connection =>
  connections.get(serviceName) || gatewayConnection

const locationService = new LocationService()

const waitForLocationToUp = () => eventually(() => locationService.list())

const waitForAASToUp = async () => {
  await delay(20000)
  return await resolve(authConnection)
}

const waitForServicesToUp = async (serviceNames: ServiceName[]) => {
  await waitForLocationToUp()
  if (serviceNames.includes('AAS')) await waitForAASToUp()

  const servicesExceptAAS = serviceNames.filter((name) => name != 'AAS')
  return await Promise.all(servicesExceptAAS.map(connectionFor).map(resolve))
}

export const startServices = (serviceNames: ServiceName[]) => {
  executeServicesScript(['start', ...joinWithPrefix(serviceNames)])
  return waitForServicesToUp(serviceNames)
}

export const startComponent = (prefix: Prefix, compType: ComponentType, componentConf: string) => {
  console.log('starting component')
  executeComponentScript(['--local', '--standalone', componentConf])
  return resolve(new HttpConnection(prefix, compType))
}

export const stopServices = () => executeStopServicesScript([])
