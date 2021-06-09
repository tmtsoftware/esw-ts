import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/es6/Decoder'
import { ObsMode } from '../clients/sequence-manager'
import type * as T from '../clients/sequence-manager/models/SequenceManagerRes'
import { FailedD, LocationServiceErrorD, UnhandledD } from './CommonDecoders'
import { ComponentIdD } from './ComponentIdDecoder'
import { ciLiteral, Decoder } from './Decoder'
import { PrefixD } from './PrefixDecoder'
import { SubsystemD } from './SubsystemDecoder'

export const ObsModeD: Decoder<ObsMode> = pipe(
  D.string,
  D.parse((name) => D.success(new ObsMode(name)))
)

const SequenceComponentNotAvailableD: Decoder<T.SequenceComponentNotAvailable> = D.struct({
  _type: ciLiteral('SequenceComponentNotAvailable'),
  subsystems: D.array(SubsystemD),
  msg: D.string
})

const ConfigurationMissingD: Decoder<T.ConfigurationMissing> = D.struct({
  _type: ciLiteral('ConfigurationMissing'),
  obsMode: ObsModeD
})

const FailedToStartSequencersD: Decoder<T.FailedToStartSequencers> = D.struct({
  _type: ciLiteral('FailedToStartSequencers'),
  reasons: D.array(D.string)
})

const ConflictingResourcesWithRunningObsModeD: Decoder<T.ConflictingResourcesWithRunningObsMode> =
  D.struct({
    _type: ciLiteral('ConflictingResourcesWithRunningObsMode'),
    runningObsMode: D.array(ObsModeD)
  })

const SpawningSequenceComponentsFailedD: Decoder<T.SpawningSequenceComponentsFailed> = D.struct({
  _type: ciLiteral('SpawningSequenceComponentsFailed'),
  failureResponses: D.array(D.string)
})

const LoadScriptErrorD: Decoder<T.LoadScriptError> = D.struct({
  _type: ciLiteral('LoadScriptError'),
  reason: D.string
})

const SuccessD: Decoder<T.Success> = D.struct({ _type: ciLiteral('Success') })

// api specific ADT decoders
const ConfigureSuccessD: Decoder<T.ConfigureSuccess> = D.struct({
  _type: ciLiteral('Success'),
  masterSequencerComponentId: ComponentIdD
})

const FailedResponseD: Decoder<T.FailedResponse> = D.struct({
  _type: ciLiteral('FailedResponse'),
  reason: D.string
})

const CouldNotFindMachinesD: Decoder<T.CouldNotFindMachines> = D.struct({
  _type: ciLiteral('CouldNotFindMachines'),
  prefix: D.array(PrefixD)
})

const RestartSequencerSuccessD: Decoder<T.RestartSequencerSuccess> = D.struct({
  _type: ciLiteral('Success'),
  componentId: ComponentIdD
})

export const ObsModeStatusD: Decoder<T.ObsModeStatus> = D.struct({
  _type: ciLiteral('Configured', 'Configurable', 'NonConfigurable')
})

export const ObsModeDetailsD: Decoder<T.ObsModeDetails> = D.struct({
  obsMode: ObsModeD,
  status: ObsModeStatusD,
  sequencers: D.array(SubsystemD),
  resources: D.array(SubsystemD)
})

const ObsModesDetailsResponseSuccessD: Decoder<T.ObsModesDetailsResponseSuccess> = D.struct({
  _type: ciLiteral('Success'),
  obsModes: D.array(ObsModeDetailsD)
})

const AlreadyRunningD: Decoder<T.AlreadyRunning> = D.struct({
  _type: ciLiteral('AlreadyRunning'),
  componentId: ComponentIdD
})

const StartedD: Decoder<T.SequencerStarted> = D.struct({
  _type: ciLiteral('Started'),
  componentId: ComponentIdD
})

export const ResourceStatusD: Decoder<T.ResourceStatus> = D.struct({
  _type: ciLiteral('InUse', 'Available')
})

export const ResourceStatusResponseD: Decoder<T.ResourceStatusResponse> = pipe(
  D.intersect(
    D.struct({
      resource: SubsystemD,
      status: ResourceStatusD
    })
  )(D.partial({ obsMode: ObsModeD })),
  D.parse((resourceStatusResponse) =>
    D.success({
      resource: resourceStatusResponse.resource,
      status: resourceStatusResponse.status,
      obsMode: resourceStatusResponse.obsMode
    })
  )
)

const ResourcesStatusSuccessD: Decoder<T.ResourcesStatusSuccess> = D.struct({
  _type: ciLiteral('Success'),
  resourcesStatus: D.array(ResourceStatusResponseD)
})

export const ConfigureResponseD: Decoder<T.ConfigureResponse> = D.sum('_type')({
  Unhandled: UnhandledD,
  SequenceComponentNotAvailable: SequenceComponentNotAvailableD,
  ConfigurationMissing: ConfigurationMissingD,
  LocationServiceError: LocationServiceErrorD,
  FailedToStartSequencers: FailedToStartSequencersD,
  ConflictingResourcesWithRunningObsMode: ConflictingResourcesWithRunningObsModeD,
  Success: ConfigureSuccessD,
  FailedResponse: FailedResponseD
})

export const ProvisionResponseD: Decoder<T.ProvisionResponse> = D.sum('_type')({
  Unhandled: UnhandledD,
  Success: SuccessD,
  LocationServiceError: LocationServiceErrorD,
  SpawningSequenceComponentsFailed: SpawningSequenceComponentsFailedD,
  CouldNotFindMachines: CouldNotFindMachinesD,
  FailedResponse: FailedResponseD
})

export const ObsModesDetailsResponseD: Decoder<T.ObsModesDetailsResponse> = D.sum('_type')({
  Failed: FailedD,
  Success: ObsModesDetailsResponseSuccessD,
  LocationServiceError: LocationServiceErrorD
})

export const StartSequencerResponseD: Decoder<T.StartSequencerResponse> = D.sum('_type')({
  Unhandled: UnhandledD,
  SequenceComponentNotAvailable: SequenceComponentNotAvailableD,
  LoadScriptError: LoadScriptErrorD,
  LocationServiceError: LocationServiceErrorD,
  AlreadyRunning: AlreadyRunningD,
  Started: StartedD,
  FailedResponse: FailedResponseD
})

export const RestartSequencerResponseD: Decoder<T.RestartSequencerResponse> = D.sum('_type')({
  Unhandled: UnhandledD,
  LoadScriptError: LoadScriptErrorD,
  LocationServiceError: LocationServiceErrorD,
  Success: RestartSequencerSuccessD,
  FailedResponse: FailedResponseD
})

export const ShutdownSequencersOrSeqCompResponseD: Decoder<T.ShutdownSequencersResponse> = D.sum(
  '_type'
)({
  Unhandled: UnhandledD,
  LocationServiceError: LocationServiceErrorD,
  Success: SuccessD,
  FailedResponse: FailedResponseD
})

export const ResourcesStatusResponseD: Decoder<T.ResourcesStatusResponse> = D.sum('_type')({
  Success: ResourcesStatusSuccessD,
  Failed: FailedD
})
