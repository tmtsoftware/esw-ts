import type { ComponentId, Prefix, Subsystem, Failed, LocationServiceError, Unhandled } from '../../../models'
import type { ObsMode } from './ObsMode'
import type { VariationInfo } from './VariationInfo'

export type SequenceComponentNotAvailable = {
  _type: 'SequenceComponentNotAvailable'
  variationInfos: VariationInfo[]
  msg: string
}

export type FailedResponse = {
  _type: 'FailedResponse'
  reason: string
}

export type ConfigurationMissing = {
  _type: 'ConfigurationMissing'
  obsMode: ObsMode
}

export type FailedToStartSequencers = {
  _type: 'FailedToStartSequencers'
  reasons: string[]
}

export type ConflictingResourcesWithRunningObsMode = {
  _type: 'ConflictingResourcesWithRunningObsMode'
  runningObsMode: ObsMode[]
}

export type SpawningSequenceComponentsFailed = {
  _type: 'SpawningSequenceComponentsFailed'
  failureResponses: string[]
}

export type LoadScriptError = {
  _type: 'LoadScriptError'
  reason: string
}

export type Success = { _type: 'Success' }

// api specific ADT decoders
export type ConfigureSuccess = {
  _type: 'Success'
  masterSequencerComponentId: ComponentId
}

export type CouldNotFindMachines = {
  _type: 'CouldNotFindMachines'
  prefix: Prefix[]
}

export type RestartSequencerSuccess = {
  _type: 'Success'
  componentId: ComponentId
}

export type NonConfigurable = {
  _type: 'NonConfigurable'
  missingSequenceComponentsFor: VariationInfo[]
}

export type Configurable = {
  _type: 'Configurable'
}

export type Configured = {
  _type: 'Configured'
}

export type ObsModeStatus = Configurable | Configured | NonConfigurable

export type ObsModeDetails = {
  obsMode: ObsMode
  status: ObsModeStatus
  resources: Subsystem[]
  sequencers: VariationInfo[]
}

export type ObsModesDetailsResponseSuccess = {
  _type: 'Success'
  obsModes: ObsModeDetails[]
}

export type AlreadyRunning = {
  _type: 'AlreadyRunning'
  componentId: ComponentId
}

export type SequencerStarted = {
  _type: 'Started'
  componentId: ComponentId
}

export type ResourceStatus = {
  _type: 'InUse' | 'Available'
}
export type ResourceStatusResponse = {
  resource: Subsystem
  status: ResourceStatus
  obsMode?: ObsMode
}

export type ResourcesStatusSuccess = {
  _type: 'Success'
  resourcesStatus: ResourceStatusResponse[]
}

// api specific type's
/**
 * @category Sequence Manager Service
 */
export type ConfigureResponse =
  | Unhandled
  | SequenceComponentNotAvailable
  | ConfigurationMissing
  | LocationServiceError
  | FailedToStartSequencers
  | ConflictingResourcesWithRunningObsMode
  | ConfigureSuccess
  | FailedResponse
/**
 * @category Sequence Manager Service
 */
export type ProvisionResponse =
  | Unhandled
  | Success
  | LocationServiceError
  | SpawningSequenceComponentsFailed
  | CouldNotFindMachines
  | FailedResponse
/**
 * @category Sequence Manager Service
 */
export type ObsModesDetailsResponse = Failed | ObsModesDetailsResponseSuccess | LocationServiceError
/**
 * @category Sequence Manager Service
 */
export type StartSequencerResponse =
  | Unhandled
  | SequenceComponentNotAvailable
  | LoadScriptError
  | LocationServiceError
  | AlreadyRunning
  | SequencerStarted
  | FailedResponse
/**
 * @category Sequence Manager Service
 */
export type RestartSequencerResponse =
  | Unhandled
  | LoadScriptError
  | LocationServiceError
  | RestartSequencerSuccess
  | FailedResponse
/**
 * @category Sequence Manager Service
 */
export type ShutdownSequencersResponse = Unhandled | LocationServiceError | Success | FailedResponse
/**
 * @category Sequence Manager Service
 */
export type ShutdownSequenceComponentResponse = ShutdownSequencersResponse | FailedResponse
/**
 * @category Sequence Manager Service
 */
export type ResourcesStatusResponse = ResourcesStatusSuccess | Failed
