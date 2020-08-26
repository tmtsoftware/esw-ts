import * as D from 'io-ts/lib/Decoder'
import { ComponentIdD, PrefixD, Subsystem } from '../../../models'
import { ciLiteral } from '../../../utils/Decoder'
import { AkkaLocation } from '../../location'
import { ObsModeD } from './ObsMode'

const UnhandledL = 'Unhandled'
const SequenceComponentNotAvailableL = 'SequenceComponentNotAvailable'
const LoadScriptErrorL = 'LoadScriptError'
const ConfigurationMissingL = 'ConfigurationMissing'
const LocationServiceErrorL = 'LocationServiceError'
const FailedToStartSequencersL = 'FailedToStartSequencers'
const ConflictingResourcesWithRunningObsModeL = 'ConflictingResourcesWithRunningObsMode'
const SpawningSequenceComponentsFailedL = 'SpawningSequenceComponentsFailed'
const CouldNotFindMachinesL = 'CouldNotFindMachines'
const SuccessL = 'Success'
const AlreadyRunningL = 'AlreadyRunning'
const StartedL = 'Started'
const FailedL = 'Failed'

// common decoders
const UnhandledD = D.type({
  _type: ciLiteral(UnhandledL),
  state: D.string,
  messageType: D.string,
  msg: D.string
})
const LocationServiceErrorD = D.type({
  _type: ciLiteral(LocationServiceErrorL),
  msg: D.string
})
const SequenceComponentNotAvailableD = D.type({
  _type: ciLiteral(SequenceComponentNotAvailableL),
  subsystems: D.array(Subsystem),
  msg: D.string
})
const ConfigurationMissingD = D.type({
  _type: ciLiteral(ConfigurationMissingL),
  obsMode: ObsModeD
})
const FailedToStartSequencersD = D.type({
  _type: ciLiteral(FailedToStartSequencersL),
  reasons: D.array(D.string)
})
const ConflictingResourcesWithRunningObsModeD = D.type({
  _type: ciLiteral(ConflictingResourcesWithRunningObsModeL),
  runningObsMode: D.array(ObsModeD)
})
const SpawningSequenceComponentsFailedD = D.type({
  _type: ciLiteral(SpawningSequenceComponentsFailedL),
  failureResponses: D.array(D.string)
})
const LoadScriptErrorD = D.type({
  _type: ciLiteral(LoadScriptErrorL),
  msg: D.string
})
const SuccessD = D.type({ _type: ciLiteral(SuccessL) })

// api specific ADT decoders
const ConfigureSuccessD = D.type({
  _type: ciLiteral(SuccessL),
  masterSequencerComponentId: ComponentIdD
})

const FailedD = D.type({
  _type: ciLiteral(FailedL),
  msg: D.string
})

const CouldNotFindMachinesD = D.type({
  _type: ciLiteral(CouldNotFindMachinesL),
  prefix: D.array(PrefixD)
})

const RestartSequencerSuccessD = D.type({ _type: ciLiteral(SuccessL), componentId: ComponentIdD })

const RunningObsModesSuccessD = D.type({
  _type: ciLiteral(SuccessL),
  runningObsModes: D.array(ObsModeD)
})

const AlreadyRunningD = D.type({
  _type: ciLiteral(AlreadyRunningL),
  componentId: ComponentIdD
})

const StartedD = D.type({
  _type: ciLiteral(StartedL),
  componentId: ComponentIdD
})

export const SequenceComponentStatusD = D.type({
  seqCompId: ComponentIdD,
  sequencerLocation: D.array(AkkaLocation)
})

const AgentStatusD = D.type({
  agentId: ComponentIdD,
  seqCompsStatus: D.array(SequenceComponentStatusD)
})

const AgentStatusSuccessD = D.type({
  _type: ciLiteral(SuccessL),
  agentStatus: D.array(AgentStatusD),
  seqCompsWithoutAgent: D.array(SequenceComponentStatusD)
})

// common types
export type Unhandled = D.TypeOf<typeof UnhandledD>
export type SequenceComponentNotAvailable = D.TypeOf<typeof SequenceComponentNotAvailableD>
export type ConfigurationMissing = D.TypeOf<typeof ConfigurationMissingD>
export type LocationServiceError = D.TypeOf<typeof LocationServiceErrorD>
export type FailedToStartSequencers = D.TypeOf<typeof FailedToStartSequencersD>
export type SpawningSequenceComponentsFailed = D.TypeOf<typeof SpawningSequenceComponentsFailedD>
export type LoadScriptError = D.TypeOf<typeof LoadScriptErrorD>
export type ConflictingResourcesWithRunningObsMode = D.TypeOf<
  typeof ConflictingResourcesWithRunningObsModeD
>

// api specific type's
export type CouldNotFindMachines = D.TypeOf<typeof CouldNotFindMachinesD>
export type Success = D.TypeOf<
  | typeof ConfigureSuccessD
  | typeof SuccessD
  | typeof RestartSequencerSuccessD
  | typeof RunningObsModesSuccessD
>
export type Failed = D.TypeOf<typeof FailedD>
export type AlreadyRunningD = D.TypeOf<typeof AlreadyRunningD>
export type StartedD = D.TypeOf<typeof StartedD>

export const ConfigureResponseD = D.sum('_type')({
  [UnhandledL]: UnhandledD,
  [SequenceComponentNotAvailableL]: SequenceComponentNotAvailableD,
  [ConfigurationMissingL]: ConfigurationMissingD,
  [LocationServiceErrorL]: LocationServiceErrorD,
  [FailedToStartSequencersL]: FailedToStartSequencersD,
  [ConflictingResourcesWithRunningObsModeL]: ConflictingResourcesWithRunningObsModeD,
  [SuccessL]: ConfigureSuccessD
})

export const ProvisionResponseD = D.sum('_type')({
  [UnhandledL]: UnhandledD,
  [SuccessL]: SuccessD,
  [LocationServiceErrorL]: LocationServiceErrorD,
  [SpawningSequenceComponentsFailedL]: SpawningSequenceComponentsFailedD,
  [CouldNotFindMachinesL]: CouldNotFindMachinesD
})

export const GetRunningObsModesResponseD = D.sum('_type')({
  [FailedL]: FailedD,
  [SuccessL]: RunningObsModesSuccessD
})

export const StartSequencerResponseD = D.sum('_type')({
  [UnhandledL]: UnhandledD,
  [SequenceComponentNotAvailableL]: SequenceComponentNotAvailableD,
  [LoadScriptErrorL]: LoadScriptErrorD,
  [LocationServiceErrorL]: LocationServiceErrorD,
  [AlreadyRunningL]: AlreadyRunningD,
  [StartedL]: StartedD
})

export const RestartSequencerResponseD = D.sum('_type')({
  [UnhandledL]: UnhandledD,
  [LoadScriptErrorL]: LoadScriptErrorD,
  [LocationServiceErrorL]: LocationServiceErrorD,
  [SuccessL]: RestartSequencerSuccessD
})

export const ShutdownSequencersAndSeqCompResponseD = D.sum('_type')({
  [UnhandledL]: UnhandledD,
  [LocationServiceErrorL]: LocationServiceErrorD,
  [SuccessL]: SuccessD
})

export const AgentStatusResponseD = D.sum('_type')({
  [UnhandledL]: UnhandledD,
  [LocationServiceErrorL]: LocationServiceErrorD,
  [SuccessL]: AgentStatusSuccessD
})

export type ConfigureResponse = D.TypeOf<typeof ConfigureResponseD>

export type ProvisionResponse = D.TypeOf<typeof ProvisionResponseD>

export type GetRunningObsModesResponse = D.TypeOf<typeof GetRunningObsModesResponseD>

export type StartSequencerResponse = D.TypeOf<typeof StartSequencerResponseD>

export type RestartSequencerResponse = D.TypeOf<typeof RestartSequencerResponseD>

export type ShutdownSequencersResponse = D.TypeOf<typeof ShutdownSequencersAndSeqCompResponseD>

export type ShutdownSequenceComponentResponse = D.TypeOf<
  typeof ShutdownSequencersAndSeqCompResponseD
>

export type AgentStatusResponse = D.TypeOf<typeof AgentStatusResponseD>
