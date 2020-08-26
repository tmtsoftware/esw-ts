import * as D from 'io-ts/lib/Decoder'
import { ciLiteral, Decoder } from '../../utils/Decoder'
import { ParamSetD } from './Parameter'

// ##################### Decoders #####################

export const IssueTypesD = ciLiteral(
  'AssemblyBusyIssue',
  'HCDBusyIssue',
  'IdNotAvailableIssue',
  'MissingKeyIssue',
  'OtherIssue',
  'ParameterValueOutOfRangeIssue',
  'RequiredAssemblyUnavailableIssue',
  'RequiredHCDUnavailableIssue',
  'RequiredSequencerUnavailableIssue',
  'RequiredServiceUnavailableIssue',
  'UnresolvedLocationsIssue',
  'UnsupportedCommandInStateIssue',
  'UnsupportedCommandIssue',
  'WrongInternalStateIssue',
  'WrongNumberOfParametersIssue',
  'WrongParameterTypeIssue',
  'WrongPrefixIssue',
  'WrongUnitsIssue'
)

const ErrorL = 'Error'
const InvalidL = 'Invalid'
const CompletedL = 'Completed'
const LockedL = 'Locked'
const StartedL = 'Started'
const CancelledL = 'Cancelled'
const AcceptedL = 'Accepted'

export const CommandIssueD = D.type({
  _type: IssueTypesD,
  reason: D.string
})

const ErrorD = D.type({
  _type: ciLiteral(ErrorL),
  runId: D.string,
  message: D.string
})

const InvalidD = D.type({
  _type: ciLiteral(InvalidL),
  runId: D.string,
  issue: CommandIssueD
})

const CompletedD = D.type({
  _type: ciLiteral(CompletedL),
  runId: D.string,
  result: ParamSetD
})

const mkCommandResD = <L extends string>(type: L): Decoder<{ _type: L; runId: string }> =>
  D.type({
    _type: ciLiteral(type),
    runId: D.string
  })

const LockedD = mkCommandResD(LockedL)
const StartedD = mkCommandResD(StartedL)
const CancelledD = mkCommandResD(CancelledL)
const AcceptedD = mkCommandResD(AcceptedL)

export const SubmitResponseD = D.sum('_type')({
  [ErrorL]: ErrorD,
  [InvalidL]: InvalidD,
  [LockedL]: LockedD,
  [StartedL]: StartedD,
  [CompletedL]: CompletedD,
  [CancelledL]: CancelledD
})

export const CommandResponseD = D.sum('_type')({
  [ErrorL]: ErrorD,
  [InvalidL]: InvalidD,
  [LockedL]: LockedD,
  [StartedL]: StartedD,
  [CompletedL]: CompletedD,
  [CancelledL]: CancelledD,
  [AcceptedL]: AcceptedD
})

export const ValidateResponseD = D.sum('_type')({
  [AcceptedL]: AcceptedD,
  [InvalidL]: InvalidD,
  [LockedL]: LockedD
})

export const OnewayResponseD = D.sum('_type')({
  [AcceptedL]: AcceptedD,
  [InvalidL]: InvalidD,
  [LockedL]: LockedD
})

// ######################################################

export type SubmitResponse = D.TypeOf<typeof SubmitResponseD>
export type CommandResponse = D.TypeOf<typeof CommandResponseD>
export type ValidateResponse = D.TypeOf<typeof ValidateResponseD>
export type OnewayResponse = D.TypeOf<typeof OnewayResponseD>
