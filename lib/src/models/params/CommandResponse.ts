import * as D from 'io-ts/lib/Decoder'
import { Decoder, ciLiteral } from '../../utils/Decoder'
import { ParamSet } from './Parameter'

const IssueTypes = ciLiteral(
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

const CommandIssue = D.type({
  _type: IssueTypes,
  reason: D.string
})

const Error = D.type({
  _type: ciLiteral(ErrorL),
  runId: D.string,
  message: D.string
})

const Invalid = D.type({
  _type: ciLiteral(InvalidL),
  runId: D.string,
  issue: CommandIssue
})

const Completed = D.type({
  _type: ciLiteral(CompletedL),
  runId: D.string,
  result: ParamSet
})

const commandRes = <L extends string>(type: L): Decoder<{ _type: L; runId: string }> =>
  D.type({
    _type: ciLiteral(type),
    runId: D.string
  })

const Locked = commandRes(LockedL)
const Started = commandRes(StartedL)
const Cancelled = commandRes(CompletedL)
const Accepted = commandRes(AcceptedL)

export const SubmitResponse = D.sum('_type')({
  [ErrorL]: Error,
  [InvalidL]: Invalid,
  [LockedL]: Locked,
  [StartedL]: Started,
  [CompletedL]: Completed,
  [CancelledL]: Cancelled
})

export const CommandResponse = D.sum('_type')({
  [ErrorL]: Error,
  [InvalidL]: Invalid,
  [LockedL]: Locked,
  [StartedL]: Started,
  [CompletedL]: Completed,
  [CancelledL]: Cancelled,
  [AcceptedL]: Accepted
})

export const ValidateResponse = D.sum('_type')({
  [AcceptedL]: Accepted,
  [InvalidL]: Invalid,
  [LockedL]: Locked
})

export const OneWayResponse = D.sum('_type')({
  [AcceptedL]: Accepted,
  [InvalidL]: Invalid,
  [LockedL]: Locked
})

export type SubmitResponse = D.TypeOf<typeof SubmitResponse>
export type CommandResponse = D.TypeOf<typeof CommandResponse>
export type ValidateResponse = D.TypeOf<typeof ValidateResponse>
export type OneWayResponse = D.TypeOf<typeof OneWayResponse>
