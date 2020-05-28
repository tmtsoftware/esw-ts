import { HttpConnection } from 'clients/location'
import { ComponentType, Prefix, Subsystem } from 'models'
import { authConnection } from 'utils/auth'
import { waitForLocationServiceToStop, waitForServicesToUp } from 'utils/healthCheck'
import {
  executeComponentScript,
  executeSequencerScript,
  executeServicesScript,
  executeStopServicesScript
} from 'utils/shell'
import { resolve } from 'utils/resolve'

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

export const startSequencer = async (subsystem: Subsystem, observingMode: string) => {
  executeSequencerScript(['start', '-s', subsystem, '-m', observingMode])
  return await resolve(new HttpConnection(new Prefix(subsystem, observingMode), 'Sequencer'), 20)
}

export const stopServices = async () => {
  executeStopServicesScript([])
  await waitForLocationServiceToStop()
}
