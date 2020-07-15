import * as D from 'io-ts/lib/Decoder'
import { ParamSet } from './Parameter'

const IssueTypes = D.literal(
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

const ErrorType = 'Error'
const InvalidType = 'Invalid'
const CompletedType = 'Completed'
const LockedType = 'Locked'
const StartedType = 'Started'
const CancelledType = 'Cancelled'
const AcceptedType = 'Accepted'

const CommandIssue = D.type({
  _type: IssueTypes,
  reason: D.string
})

const Error = D.type({
  runId: D.string,
  _type: D.literal(ErrorType),
  message: D.string
})

const Invalid = D.type({
  runId: D.string,
  _type: D.literal(InvalidType),
  issue: CommandIssue
})

const Completed = D.type({
  runId: D.string,
  _type: D.literal(CompletedType),
  result: ParamSet
})

const commandRes = <T extends string>(type: T): D.Decoder<unknown, { _type: T; runId: string }> =>
  D.type({
    _type: D.literal(type),
    runId: D.string
  })

const Locked = commandRes(LockedType)
const Started = commandRes(StartedType)
const Cancelled = commandRes(CompletedType)
const Accepted = commandRes(AcceptedType)

export const SubmitResponseD = D.sum('_type')({
  [ErrorType]: Error,
  [InvalidType]: Invalid,
  [LockedType]: Locked,
  [StartedType]: Started,
  [CompletedType]: Completed,
  [CancelledType]: Cancelled
})

export const CommandResponse = D.sum('_type')({
  [ErrorType]: Error,
  [InvalidType]: Invalid,
  [LockedType]: Locked,
  [StartedType]: Started,
  [CompletedType]: Completed,
  [CancelledType]: Cancelled,
  [AcceptedType]: Accepted
})

export const ValidateResponse = D.sum('_type')({
  [AcceptedType]: Accepted,
  [InvalidType]: Invalid,
  [LockedType]: Locked
})

export const OneWayResponse = D.sum('_type')({
  [AcceptedType]: Accepted,
  [InvalidType]: Invalid,
  [LockedType]: Locked
})

export type SubmitResponse = D.TypeOf<typeof SubmitResponseD>
export type CommandResponse = D.TypeOf<typeof CommandResponse>
export type ValidateResponse = D.TypeOf<typeof ValidateResponse>
export type OneWayResponse = D.TypeOf<typeof OneWayResponse>
