import * as D from 'io-ts/lib/Decoder'
import { ComponentIdD, PrefixD, Subsystem } from '../../../models'
import { ciLiteral } from '../../../utils/Decoder'
import { ObsModeD } from './ObsMode'

const Unhandled = 'Unhandled'
const SequenceComponentNotAvailable = 'SequenceComponentNotAvailable'
const ConfigurationMissing = 'ConfigurationMissing'
const LocationServiceError = 'LocationServiceError'
const FailedToStartSequencers = 'FailedToStartSequencers'
const ConflictingResourcesWithRunningObsMode = 'ConflictingResourcesWithRunningObsMode'
const SpawningSequenceComponentsFailed = 'SpawningSequenceComponentsFailed'
const CouldNotFindMachines = 'CouldNotFindMachines'
const Success = 'Success'

const UnhandledD = D.type({
  _type: ciLiteral(Unhandled),
  state: D.string,
  messageType: D.string,
  msg: D.string
})
const SequenceComponentNotAvailableD = D.type({
  _type: ciLiteral(SequenceComponentNotAvailable),
  subsystems: D.array(Subsystem),
  msg: D.string
})
const ConfigurationMissingD = D.type({ _type: ciLiteral(ConfigurationMissing), obsMode: ObsModeD })
const LocationServiceErrorD = D.type({ _type: ciLiteral(LocationServiceError), msg: D.string })
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

const CouldNotFindMachinesD = D.type({
  _type: ciLiteral(CouldNotFindMachines),
  prefix: D.array(PrefixD)
})

const ConfigureSuccessD = D.type({
  _type: ciLiteral(Success),
  masterSequencerComponentId: ComponentIdD
})
const ProvisionSuccessD = D.type({ _type: ciLiteral(Success) })

export type Unhandled = D.TypeOf<typeof UnhandledD>
export type SequenceComponentNotAvailable = D.TypeOf<typeof SequenceComponentNotAvailableD>
export type ConfigurationMissing = D.TypeOf<typeof ConfigurationMissingD>
export type LocationServiceError = D.TypeOf<typeof LocationServiceErrorD>
export type FailedToStartSequencers = D.TypeOf<typeof FailedToStartSequencersD>
export type SpawningSequenceComponentsFailed = D.TypeOf<typeof SpawningSequenceComponentsFailedD>
export type CouldNotFindMachines = D.TypeOf<typeof CouldNotFindMachinesD>
export type ConflictingResourcesWithRunningObsMode = D.TypeOf<
  typeof ConflictingResourcesWithRunningObsModeD
>
export type Success = D.TypeOf<typeof ConfigureSuccessD>

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
  [Success]: ProvisionSuccessD,
  [LocationServiceError]: LocationServiceErrorD,
  [SpawningSequenceComponentsFailed]: SpawningSequenceComponentsFailedD,
  [CouldNotFindMachines]: CouldNotFindMachinesD
})
export type ConfigureResponse = D.TypeOf<typeof ConfigureResponseD>

export type ProvisionResponse = D.TypeOf<typeof ProvisionResponseD>
