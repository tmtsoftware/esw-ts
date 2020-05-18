import { spawn } from 'child_process'
import { isResolved } from 'DiscoverService'
import { ComponentType, Prefix } from 'models'
import * as path from 'path'

export type ServiceName = 'Gateway' | 'Location' | 'Alarm' | 'Event' | 'Config'

const prefixes: Map<ServiceName, Prefix> = new Map()

const gatewayPrefix = new Prefix('ESW', 'EswGateway')
prefixes.set('Gateway', gatewayPrefix)

export const spawnServices = async (serviceNames: ServiceName[]) => {
  let args: string[] = []
  serviceNames.forEach((x) => {
    args = args.concat(['-s', x])
  })
  spawn('sh', [path.resolve(__dirname, '../services.sh'), 'startServices', ...args])

  const prefix = (serviceName: ServiceName): Prefix => prefixes.get(serviceName) || gatewayPrefix

  await new Promise((resolve) => setTimeout(resolve, 10000))

  const allServicesUp = await Promise.all(
    serviceNames.map(async (serviceName) => await isResolved(prefix(serviceName), 'Service'))
  )

  return allServicesUp.every((x) => x)
}

export const spawnComponent = async (
  prefix: Prefix,
  componentType: ComponentType,
  componentConf: string
) => {
  spawn('sh', [path.resolve(__dirname, '../component.sh'), 'startComponent', '-c', componentConf])
  return await isResolved(prefix, componentType)
}

export const stopServices = () => spawn('sh', [path.resolve(__dirname, '../stopServices.sh')])
