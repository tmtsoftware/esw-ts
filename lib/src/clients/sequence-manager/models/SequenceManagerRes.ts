import * as D from 'io-ts/lib/Decoder'
import {ComponentIdD, Subsystem} from "../../../models";
import {ObsModeD} from "./ObsMode";
import {ciLiteral} from "../../../utils/Decoder";

const Unhandled = 'Unhandled'
const SequenceComponentNotAvailable = 'SequenceComponentNotAvailable'
const ConfigurationMissing = 'ConfigurationMissing'
const LocationServiceError = 'LocationServiceError'
const FailedToStartSequencers = 'FailedToStartSequencers'
const ConflictingResourcesWithRunningObsMode = 'ConflictingResourcesWithRunningObsMode'
const Success = 'Success'

const UnhandledD = D.type({_type: ciLiteral(Unhandled), state: D.string, messageType: D.string, msg: D.string})
const SequenceComponentNotAvailableD = D.type({_type: ciLiteral(SequenceComponentNotAvailable), subsystems: D.array(Subsystem), msg: D.string})
const ConfigurationMissingD = D.type({_type: ciLiteral(ConfigurationMissing), obsMode: ObsModeD})
const LocationServiceErrorD = D.type({_type: ciLiteral(LocationServiceError), msg: D.string})
const FailedToStartSequencersD = D.type({_type: ciLiteral(FailedToStartSequencers), reasons: D.array(D.string)})
const ConflictingResourcesWithRunningObsModeD = D.type({_type: ciLiteral(ConflictingResourcesWithRunningObsMode), runningObsMode: D.array(ObsModeD)})
const SuccessD = D.type({_type: ciLiteral(Success), masterSequencerComponentId: ComponentIdD})

export type Unhandled = D.TypeOf<typeof UnhandledD>
export type SequenceComponentNotAvailable = D.TypeOf<typeof SequenceComponentNotAvailableD>
export type ConfigurationMissing = D.TypeOf<typeof ConfigurationMissingD>
export type LocationServiceError = D.TypeOf<typeof LocationServiceErrorD>
export type FailedToStartSequencers = D.TypeOf<typeof FailedToStartSequencersD>
export type ConflictingResourcesWithRunningObsMode = D.TypeOf<typeof ConflictingResourcesWithRunningObsModeD>
export type Success = D.TypeOf<typeof SuccessD>

export const ConfigureResponseD = D.sum("_type")({
  [Unhandled]: UnhandledD,
  [SequenceComponentNotAvailable]: SequenceComponentNotAvailableD,
  [ConfigurationMissing]: ConfigurationMissingD,
  [LocationServiceError]: LocationServiceErrorD,
  [FailedToStartSequencers]: FailedToStartSequencersD,
  [ConflictingResourcesWithRunningObsMode]: ConflictingResourcesWithRunningObsModeD,
  [Success]: SuccessD
})

export type ConfigureResponse = D.TypeOf<typeof ConfigureResponseD>

