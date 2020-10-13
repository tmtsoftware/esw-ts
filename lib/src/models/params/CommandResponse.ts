import * as D from 'io-ts/lib/Decoder'
import { ResultD } from '../../decoders/ResultDecoder'
import { ciLiteral, Decoder } from '../../utils/Decoder'

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

export const ErrorL = 'Error'
export const InvalidL = 'Invalid'
export const CompletedL = 'Completed'
export const LockedL = 'Locked'
export const StartedL = 'Started'
export const CancelledL = 'Cancelled'
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
  result: ResultD
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

export type Completed = D.TypeOf<typeof CompletedD>
export type Started = D.TypeOf<typeof StartedD>
export type Accepted = D.TypeOf<typeof AcceptedD>
export type Error = D.TypeOf<typeof ErrorD>
export type Invalid = D.TypeOf<typeof InvalidD>
export type Cancelled = D.TypeOf<typeof CancelledD>
export type Locked = D.TypeOf<typeof LockedD>

export type SubmitResponse = D.TypeOf<typeof SubmitResponseD>
export type ErrorResponse = D.TypeOf<typeof ErrorD>
export type InvalidResponse = D.TypeOf<typeof InvalidD>
export type LockedResponse = D.TypeOf<typeof LockedD>
export type StartedResponse = D.TypeOf<typeof StartedD>
export type CompletedResponse = D.TypeOf<typeof CompletedD>
export type CancelledResponse = D.TypeOf<typeof CancelledD>
export type CommandResponse = D.TypeOf<typeof CommandResponseD>
export type ValidateResponse = D.TypeOf<typeof ValidateResponseD>
export type OnewayResponse = D.TypeOf<typeof OnewayResponseD>

const isPositive = (response: SubmitResponse) => response._type === CompletedL
const isIntermediate = (response: SubmitResponse) => response._type === StartedL
export const isNegative = (response: SubmitResponse) =>
  !(isPositive(response) || isIntermediate(response))
