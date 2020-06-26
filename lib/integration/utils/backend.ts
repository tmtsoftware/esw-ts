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

import { ServiceName } from '../../src/utils/ServicesConnections'

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
