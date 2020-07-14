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

const ErrorType = 'Error' as const
const InvalidType = 'Invalid' as const
const CompletedType = 'Completed' as const
const LockedType = 'Locked' as const
const StartedType = 'Started' as const
const CancelledType = 'Cancelled' as const
const AcceptedType = 'Accepted' as const

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

const commandRes = <T extends string>(type: T): D.Decoder<{ _type: T; runId: string }> =>
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

export const CommandResponseD = D.sum('_type')({
  [ErrorType]: Error,
  [InvalidType]: Invalid,
  [LockedType]: Locked,
  [StartedType]: Started,
  [CompletedType]: Completed,
  [CancelledType]: Cancelled,
  [AcceptedType]: Accepted
})

export const ValidateResponseD = D.sum('_type')({
  [AcceptedType]: Accepted,
  [InvalidType]: Invalid,
  [LockedType]: Locked
})

export const OneWayResponseD = D.sum('_type')({
  [AcceptedType]: Accepted,
  [InvalidType]: Invalid,
  [LockedType]: Locked
})

export type SubmitResponse = D.TypeOf<typeof SubmitResponseD>
export type CommandResponse = D.TypeOf<typeof CommandResponseD>
export type ValidateResponse = D.TypeOf<typeof ValidateResponseD>
export type OneWayResponse = D.TypeOf<typeof OneWayResponseD>
