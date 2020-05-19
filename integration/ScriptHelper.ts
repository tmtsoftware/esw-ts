import { spawn } from 'child_process'
import { Connection, HttpConnection, LocationService } from 'clients/location'
import { isResolved } from 'DiscoverService'
import { ComponentType, Prefix } from 'models'
import * as path from 'path'

const RESOURCE_PATH = path.resolve(__dirname, '../tmt-backend/src/main/resources')

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

const waitForLocationToUp = () => {
  return new Promise((resolve) =>
    locationService
      .list()
      .catch(() => false)
      .then((res) => {
        if (res) resolve()
        setTimeout(() => waitForLocationToUp().then(resolve), 1000)
      })
  )
}

const waitForServicesToUp = async (serviceNames: ServiceName[]) => {
  await waitForLocationToUp()
  const servicesResolveStatus = await Promise.all(serviceNames.map(connectionFor).map(isResolved))

  return servicesResolveStatus.every((resolved) => resolved)
}

export const spawnServices = async (serviceNames: ServiceName[]) => {
  const args = joinWithPrefix(serviceNames)
  spawn('sh', [path.resolve(__dirname, '../services.sh'), 'start', ...args])

  return await waitForServicesToUp(serviceNames)
}

export const spawnComponent = async (
  prefix: Prefix,
  componentType: ComponentType,
  componentConf: string
) => {
  spawn('sh', [
    path.resolve(__dirname, '../component.sh'),
    '--local',
    '--standalone',
    path.resolve(RESOURCE_PATH, componentConf)
  ])
  return await isResolved(new HttpConnection(prefix, componentType))
}

export const stopServices = () => spawn('sh', [path.resolve(__dirname, '../stopServices.sh')])
