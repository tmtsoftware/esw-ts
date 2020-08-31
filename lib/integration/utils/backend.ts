import { HttpConnection } from '../../src/clients/location'
import { resolve } from '../../src/clients/location/LocationUtils'
import {
  eswAgentConnection,
  authConnection,
  configConnection,
  gatewayConnection,
  sequenceManagerConnection,
  agentServiceConnection
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
  Gateway: gatewayConnection,
  AAS: authConnection,
  Config: configConnection,
  LocationWithAuth: gatewayConnection,
  SequenceManager: sequenceManagerConnection,
  MachineAgent: eswAgentConnection,
  AgentService: agentServiceConnection
}

export type ServiceName = keyof typeof BackendServices
