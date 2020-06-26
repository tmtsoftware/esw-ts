import { HttpConnection } from '../../src/clients/location'
import { ComponentType, Prefix, Subsystem } from '../../src/models'
import { waitForLocationServiceToStop, waitForServicesToUp } from './healthCheck'
import { resolve } from '../../src/clients/location/LocationUtils'
import {
  executeComponentScript,
  executeSequencerScript,
  executeServicesScript,
  executeStopServicesScript
} from './shell'

export const gatewayConnection = new HttpConnection(new Prefix('ESW', 'EswGateway'), 'Service')
export const authConnection = new HttpConnection(new Prefix('CSW', 'AAS'), 'Service')
export const configConnection = new HttpConnection(new Prefix('CSW', 'ConfigServer'), 'Service')
export const eventConnection = new HttpConnection(new Prefix('CSW', 'EventServer'), 'Service')
export const alarmConnection = new HttpConnection(new Prefix('CSW', 'AlarmServer'), 'Service')

export const BackendServices = {
  Gateway: gatewayConnection,
  AAS: authConnection,
  Location: undefined,
  Alarm: alarmConnection,
  Event: eventConnection,
  Config: configConnection
}

export type ServiceName = keyof typeof BackendServices

const joinWithPrefix = (serviceNames: ServiceName[]) => serviceNames.flatMap((name) => ['-s', name])

export const startServices = (serviceNames: ServiceName[]) => {
  executeServicesScript(['start', ...joinWithPrefix(serviceNames)])
  return waitForServicesToUp(serviceNames)
}

export const startComponent = (prefix: Prefix, compType: ComponentType, componentConf: string) => {
  executeComponentScript(['--local', componentConf, '--standalone'])
  return resolve(new HttpConnection(prefix, compType))
}

export const startSequencer = (subsystem: Subsystem, observingMode: string) => {
  executeSequencerScript(['start', '-s', subsystem, '-m', observingMode])
  return resolve(new HttpConnection(new Prefix(subsystem, observingMode), 'Sequencer'), 20)
}

export const stopServices = async () => {
  executeStopServicesScript([])
  await waitForLocationServiceToStop()
}
