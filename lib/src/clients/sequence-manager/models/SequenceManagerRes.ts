import type { ComponentId } from '../../../models/ComponentId'
import type { Prefix } from '../../../models/params/Prefix'
import type { Subsystem } from '../../../models/params/Subsystem'
import type { Failed, Unhandled } from '../../../models/types'
import type { AkkaLocation } from '../../location/models/Location'
import type { ObsMode } from './ObsMode'

export type LocationServiceError = {
  _type: 'LocationServiceError'
  reason: string
}

export type SequenceComponentNotAvailable = {
  _type: 'SequenceComponentNotAvailable'
  subsystems: Subsystem[]
  msg: string
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

export type RunningObsModesSuccess = {
  _type: 'Success'
  runningObsModes: ObsMode[]
}

export type AlreadyRunning = {
  _type: 'AlreadyRunning'
  componentId: ComponentId
}

export type SequencerStarted = {
  _type: 'Started'
  componentId: ComponentId
}

export type SequenceComponentStatus = {
  seqCompId: ComponentId
  sequencerLocation: AkkaLocation[]
}

export type AgentStatus = {
  agentId: ComponentId
  seqCompsStatus: SequenceComponentStatus[]
}

export type AgentStatusSuccess = {
  _type: 'Success'
  agentStatus: AgentStatus[]
  seqCompsWithoutAgent: SequenceComponentStatus[]
}
export type ResourceAvailable = {
  _type: 'Available'
}

export type ResourceInUse = {
  _type: 'InUse'
}
export type ResourceStatus = {
  _type : 'InUse' | 'Available'
}
export type ResourceStatusResponse = {
  resource: Subsystem
  status: ResourceStatus
  obsMode : ObsMode[]
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
/**
 * @category Sequence Manager Service
 */
export type ProvisionResponse =
  | Unhandled
  | Success
  | LocationServiceError
  | SpawningSequenceComponentsFailed
  | CouldNotFindMachines
/**
 * @category Sequence Manager Service
 */
export type GetRunningObsModesResponse = Failed | RunningObsModesSuccess
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
/**
 * @category Sequence Manager Service
 */
export type RestartSequencerResponse =
  | Unhandled
  | LoadScriptError
  | LocationServiceError
  | RestartSequencerSuccess
/**
 * @category Sequence Manager Service
 */
export type ShutdownSequencersResponse = Unhandled | LocationServiceError | Success
/**
 * @category Sequence Manager Service
 */
export type ShutdownSequenceComponentResponse = ShutdownSequencersResponse
/**
 * @category Sequence Manager Service
 */
export type AgentStatusResponse = Unhandled | LocationServiceError | AgentStatusSuccess
/**
 * @category Sequence Manager Service
 */
export type ResourcesStatusResponse = ResourcesStatusSuccess | Failed
