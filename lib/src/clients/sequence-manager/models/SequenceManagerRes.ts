import * as D from 'io-ts/lib/Decoder'
import { ComponentIdD, PrefixD, Subsystem } from '../../../models'
import { ciLiteral } from '../../../utils/Decoder'
import { AkkaLocation } from '../../location'
import { ObsModeD } from './ObsMode'

const Unhandled = 'Unhandled'
const SequenceComponentNotAvailable = 'SequenceComponentNotAvailable'
const LoadScriptError = 'LoadScriptError'
const ConfigurationMissing = 'ConfigurationMissing'
const LocationServiceError = 'LocationServiceError'
const FailedToStartSequencers = 'FailedToStartSequencers'
const ConflictingResourcesWithRunningObsMode = 'ConflictingResourcesWithRunningObsMode'
const SpawningSequenceComponentsFailed = 'SpawningSequenceComponentsFailed'
const CouldNotFindMachines = 'CouldNotFindMachines'
const Success = 'Success'
const AlreadyRunning = 'AlreadyRunning'
const Started = 'Started'
const Failed = 'Failed'

// common decoders
const UnhandledD = D.type({
  _type: ciLiteral(Unhandled),
  state: D.string,
  messageType: D.string,
  msg: D.string
})
const LocationServiceErrorD = D.type({
  _type: ciLiteral(LocationServiceError),
  msg: D.string
})
const SequenceComponentNotAvailableD = D.type({
  _type: ciLiteral(SequenceComponentNotAvailable),
  subsystems: D.array(Subsystem),
  msg: D.string
})
const ConfigurationMissingD = D.type({
  _type: ciLiteral(ConfigurationMissing),
  obsMode: ObsModeD
})
const FailedToStartSequencersD = D.type({
  _type: ciLiteral(FailedToStartSequencers),
  reasons: D.array(D.string)
})
const ConflictingResourcesWithRunningObsModeD = D.type({
  _type: ciLiteral(ConflictingResourcesWithRunningObsMode),
  runningObsMode: D.array(ObsModeD)
})
const SpawningSequenceComponentsFailedD = D.type({
  _type: ciLiteral(SpawningSequenceComponentsFailed),
  failureResponses: D.array(D.string)
})
const LoadScriptErrorD = D.type({
  _type: ciLiteral(LoadScriptError),
  msg: D.string
})
const SuccessD = D.type({ _type: ciLiteral(Success) })

// api specific ADT decoders
const ConfigureSuccessD = D.type({
  _type: ciLiteral(Success),
  masterSequencerComponentId: ComponentIdD
})

const FailedD = D.type({
  _type: ciLiteral(Failed),
  msg: D.string
})

const CouldNotFindMachinesD = D.type({
  _type: ciLiteral(CouldNotFindMachines),
  prefix: D.array(PrefixD)
})

const RestartSequencerSuccessD = D.type({ _type: ciLiteral(Success), componentId: ComponentIdD })

const RunningObsModesSuccessD = D.type({
  _type: ciLiteral(Success),
  runningObsModes: D.array(ObsModeD)
})

const AlreadyRunningD = D.type({
  _type: ciLiteral(AlreadyRunning),
  componentId: ComponentIdD
})

const StartedD = D.type({
  _type: ciLiteral(Started),
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
  _type: ciLiteral(Success),
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
  [Unhandled]: UnhandledD,
  [SequenceComponentNotAvailable]: SequenceComponentNotAvailableD,
  [ConfigurationMissing]: ConfigurationMissingD,
  [LocationServiceError]: LocationServiceErrorD,
  [FailedToStartSequencers]: FailedToStartSequencersD,
  [ConflictingResourcesWithRunningObsMode]: ConflictingResourcesWithRunningObsModeD,
  [Success]: ConfigureSuccessD
})

export const ProvisionResponseD = D.sum('_type')({
  [Unhandled]: UnhandledD,
  [Success]: SuccessD,
  [LocationServiceError]: LocationServiceErrorD,
  [SpawningSequenceComponentsFailed]: SpawningSequenceComponentsFailedD,
  [CouldNotFindMachines]: CouldNotFindMachinesD
})

export const GetRunningObsModesResponseD = D.sum('_type')({
  [Failed]: FailedD,
  [Success]: RunningObsModesSuccessD
})

export const StartSequencerResponseD = D.sum('_type')({
  [Unhandled]: UnhandledD,
  [SequenceComponentNotAvailable]: SequenceComponentNotAvailableD,
  [LoadScriptError]: LoadScriptErrorD,
  [LocationServiceError]: LocationServiceErrorD,
  [AlreadyRunning]: AlreadyRunningD,
  [Started]: StartedD
})

export const RestartSequencerResponseD = D.sum('_type')({
  [Unhandled]: UnhandledD,
  [LoadScriptError]: LoadScriptErrorD,
  [LocationServiceError]: LocationServiceErrorD,
  [Success]: RestartSequencerSuccessD
})

export const ShutdownSequencersAndSeqCompResponseD = D.sum('_type')({
  [Unhandled]: UnhandledD,
  [LocationServiceError]: LocationServiceErrorD,
  [Success]: SuccessD
})

export const AgentStatusResponseD = D.sum('_type')({
  [Unhandled]: UnhandledD,
  [LocationServiceError]: LocationServiceErrorD,
  [Success]: AgentStatusSuccessD
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
