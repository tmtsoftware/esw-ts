import { HttpConnection } from '../../src/clients/location'
import { resolve } from '../../src/clients/location/LocationUtils'
import {
  ESW_AGENT_CONNECTION,
  AUTH_CONNECTION,
  CONFIG_CONNECTION,
  GATEWAY_CONNECTION,
  SEQUENCE_MANAGER_CONNECTION,
  AGENT_SERVICE_CONNECTION
} from '../../src/config/Connections'
import { ComponentType, Prefix, Subsystem } from '../../src/models'
import { waitForLocationToStop, waitForServicesToUp } from './healthCheck'
import * as sh from './shell'

const joinWithPrefix = (serviceNames: ServiceName[]) => serviceNames.flatMap((name) => ['-s', name])

export const startServices = (serviceNames: ServiceName[]) => {
  sh.executeServicesScript(['start', ...joinWithPrefix(serviceNames)])
  return waitForServicesToUp(serviceNames)
}

export const startComponent = (prefix: Prefix, compType: ComponentType, componentConf: string) => {
  sh.executeComponentScript(['--local', componentConf, '--standalone'])
  return resolve(HttpConnection(prefix, compType))
}

export const startSequencer = (subsystem: Subsystem, observingMode: string) => {
  sh.executeSequencerScript(['start', '-s', subsystem, '-m', observingMode])
  return resolve(HttpConnection(new Prefix(subsystem, observingMode), 'Sequencer'), 20)
}

export const stopServices = async () => {
  sh.executeStopServicesScript([])
  await waitForLocationToStop()
}

export const BackendServices = {
  Gateway: GATEWAY_CONNECTION,
  AAS: AUTH_CONNECTION,
  Config: CONFIG_CONNECTION,
  LocationWithAuth: GATEWAY_CONNECTION,
  SequenceManager: SEQUENCE_MANAGER_CONNECTION,
  MachineAgent: ESW_AGENT_CONNECTION,
  AgentService: AGENT_SERVICE_CONNECTION
}

export type ServiceName = keyof typeof BackendServices
