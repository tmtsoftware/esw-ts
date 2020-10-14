import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/lib/Decoder'
import { ObsMode } from '../clients/sequence-manager/models/ObsMode'
import type * as T from '../clients/sequence-manager/models/SequenceManagerRes'
import type { Unhandled } from '../models'
import { SubsystemD } from '../models/params/Subsystem'
import { ciLiteral, Decoder } from '../utils/Decoder'
import { FailedD } from './CommonDecoders'
import { ComponentIdD } from './ComponentIdDecoder'
import { AkkaLocationD } from './LocationDecoders'
import { PrefixD } from './PrefixDecoder'

export const ObsModeD: Decoder<ObsMode> = pipe(
  D.string,
  D.parse((name) => D.success(new ObsMode(name)))
)

const UnhandledD: Decoder<Unhandled> = D.type({
  _type: ciLiteral('Unhandled'),
  state: D.string,
  messageType: D.string,
  msg: D.string
})

const LocationServiceErrorD: Decoder<T.LocationServiceError> = D.type({
  _type: ciLiteral('LocationServiceError'),
  msg: D.string
})

const SequenceComponentNotAvailableD: Decoder<T.SequenceComponentNotAvailable> = D.type({
  _type: ciLiteral('SequenceComponentNotAvailable'),
  subsystems: D.array(SubsystemD),
  msg: D.string
})

const ConfigurationMissingD: Decoder<T.ConfigurationMissing> = D.type({
  _type: ciLiteral('ConfigurationMissing'),
  obsMode: ObsModeD
})

const FailedToStartSequencersD: Decoder<T.FailedToStartSequencers> = D.type({
  _type: ciLiteral('FailedToStartSequencers'),
  reasons: D.array(D.string)
})

const ConflictingResourcesWithRunningObsModeD: Decoder<T.ConflictingResourcesWithRunningObsMode> = D.type(
  {
    _type: ciLiteral('ConflictingResourcesWithRunningObsMode'),
    runningObsMode: D.array(ObsModeD)
  }
)

const SpawningSequenceComponentsFailedD: Decoder<T.SpawningSequenceComponentsFailed> = D.type({
  _type: ciLiteral('SpawningSequenceComponentsFailed'),
  failureResponses: D.array(D.string)
})

const LoadScriptErrorD: Decoder<T.LoadScriptError> = D.type({
  _type: ciLiteral('LoadScriptError'),
  msg: D.string
})

const SuccessD: Decoder<T.Success> = D.type({ _type: ciLiteral('Success') })

// api specific ADT decoders
const ConfigureSuccessD: Decoder<T.ConfigureSuccess> = D.type({
  _type: ciLiteral('Success'),
  masterSequencerComponentId: ComponentIdD
})

const CouldNotFindMachinesD: Decoder<T.CouldNotFindMachines> = D.type({
  _type: ciLiteral('CouldNotFindMachines'),
  prefix: D.array(PrefixD)
})

const RestartSequencerSuccessD: Decoder<T.RestartSequencerSuccess> = D.type({
  _type: ciLiteral('Success'),
  componentId: ComponentIdD
})

const RunningObsModesSuccessD: Decoder<T.RunningObsModesSuccess> = D.type({
  _type: ciLiteral('Success'),
  runningObsModes: D.array(ObsModeD)
})

const AlreadyRunningD: Decoder<T.AlreadyRunning> = D.type({
  _type: ciLiteral('AlreadyRunning'),
  componentId: ComponentIdD
})

const StartedD: Decoder<T.SequencerStarted> = D.type({
  _type: ciLiteral('Started'),
  componentId: ComponentIdD
})

export const SequenceComponentStatusD: Decoder<T.SequenceComponentStatus> = D.type({
  seqCompId: ComponentIdD,
  sequencerLocation: D.array(AkkaLocationD)
})

const AgentStatusD: Decoder<T.AgentStatus> = D.type({
  agentId: ComponentIdD,
  seqCompsStatus: D.array(SequenceComponentStatusD)
})

const AgentStatusSuccessD: Decoder<T.AgentStatusSuccess> = D.type({
  _type: ciLiteral('Success'),
  agentStatus: D.array(AgentStatusD),
  seqCompsWithoutAgent: D.array(SequenceComponentStatusD)
})

export const ConfigureResponseD: Decoder<T.ConfigureResponse> = D.sum('_type')({
  Unhandled: UnhandledD,
  SequenceComponentNotAvailable: SequenceComponentNotAvailableD,
  ConfigurationMissing: ConfigurationMissingD,
  LocationServiceError: LocationServiceErrorD,
  FailedToStartSequencers: FailedToStartSequencersD,
  ConflictingResourcesWithRunningObsMode: ConflictingResourcesWithRunningObsModeD,
  Success: ConfigureSuccessD
})

export const ProvisionResponseD: Decoder<T.ProvisionResponse> = D.sum('_type')({
  Unhandled: UnhandledD,
  Success: SuccessD,
  LocationServiceError: LocationServiceErrorD,
  SpawningSequenceComponentsFailed: SpawningSequenceComponentsFailedD,
  CouldNotFindMachines: CouldNotFindMachinesD
})

export const GetRunningObsModesResponseD: Decoder<T.GetRunningObsModesResponse> = D.sum('_type')({
  Failed: FailedD,
  Success: RunningObsModesSuccessD
})

export const StartSequencerResponseD: Decoder<T.StartSequencerResponse> = D.sum('_type')({
  Unhandled: UnhandledD,
  SequenceComponentNotAvailable: SequenceComponentNotAvailableD,
  LoadScriptError: LoadScriptErrorD,
  LocationServiceError: LocationServiceErrorD,
  AlreadyRunning: AlreadyRunningD,
  Started: StartedD
})

export const RestartSequencerResponseD: Decoder<T.RestartSequencerResponse> = D.sum('_type')({
  Unhandled: UnhandledD,
  LoadScriptError: LoadScriptErrorD,
  LocationServiceError: LocationServiceErrorD,
  Success: RestartSequencerSuccessD
})

export const ShutdownSequencersOrSeqCompResponseD: Decoder<T.ShutdownSequencersResponse> = D.sum(
  '_type'
)({
  Unhandled: UnhandledD,
  LocationServiceError: LocationServiceErrorD,
  Success: SuccessD
})

export const AgentStatusResponseD: Decoder<T.AgentStatusResponse> = D.sum('_type')({
  Unhandled: UnhandledD,
  LocationServiceError: LocationServiceErrorD,
  Success: AgentStatusSuccessD
})
