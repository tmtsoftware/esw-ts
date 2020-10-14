import type { Failed, Unhandled } from '../../../models/common'
import type { ComponentId } from '../../../models/ComponentId'
import type { Prefix } from '../../../models/params/Prefix'
import type { Subsystem } from '../../../models/params/Subsystem'
import type { AkkaLocation } from '../../location/models/Location'
import type { ObsMode } from './ObsMode'

export type LocationServiceError = {
  _type: 'LocationServiceError'
  msg: string
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
  msg: string
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

// api specific type's
export type ConfigureResponse =
  | Unhandled
  | SequenceComponentNotAvailable
  | ConfigurationMissing
  | LocationServiceError
  | FailedToStartSequencers
  | ConflictingResourcesWithRunningObsMode
  | ConfigureSuccess

export type ProvisionResponse =
  | Unhandled
  | Success
  | LocationServiceError
  | SpawningSequenceComponentsFailed
  | CouldNotFindMachines

export type GetRunningObsModesResponse = Failed | RunningObsModesSuccess

export type StartSequencerResponse =
  | Unhandled
  | SequenceComponentNotAvailable
  | LoadScriptError
  | LocationServiceError
  | AlreadyRunning
  | SequencerStarted

export type RestartSequencerResponse =
  | Unhandled
  | LoadScriptError
  | LocationServiceError
  | RestartSequencerSuccess

export type ShutdownSequencersResponse = Unhandled | LocationServiceError | Success
export type ShutdownSequenceComponentResponse = ShutdownSequencersResponse
export type AgentStatusResponse = Unhandled | LocationServiceError | AgentStatusSuccess
