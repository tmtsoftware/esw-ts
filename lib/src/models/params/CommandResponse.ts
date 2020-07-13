import * as t from 'io-ts'
import { ParamSet } from './Parameter'

export const IssueTypes = t.keyof({
  AssemblyBusyIssue: null,
  HCDBusyIssue: null,
  IdNotAvailableIssue: null,
  MissingKeyIssue: null,
  OtherIssue: null,
  ParameterValueOutOfRangeIssue: null,
  RequiredAssemblyUnavailableIssue: null,
  RequiredHCDUnavailableIssue: null,
  RequiredSequencerUnavailableIssue: null,
  RequiredServiceUnavailableIssue: null,
  UnresolvedLocationsIssue: null,
  UnsupportedCommandInStateIssue: null,
  UnsupportedCommandIssue: null,
  WrongInternalStateIssue: null,
  WrongNumberOfParametersIssue: null,
  WrongParameterTypeIssue: null,
  WrongPrefixIssue: null,
  WrongUnitsIssue: null
})

export const CommandIssue = t.type({
  _type: IssueTypes,
  reason: t.string
})

export const Error = t.type({
  runId: t.string,
  _type: t.literal('Error'),
  message: t.string
})

export const Invalid = t.type({
  runId: t.string,
  _type: t.literal('Invalid'),
  issue: CommandIssue
})

export const Completed = t.type({
  runId: t.string,
  _type: t.literal('Completed'),
  result: ParamSet
})

const commandRes = <T extends string>(type: T) =>
  t.type({
    _type: t.literal(type),
    runId: t.string
  })

export const Locked = commandRes('Locked')
export const Started = commandRes('Started')
export const Cancelled = commandRes('Cancelled')
export const Accepted = commandRes('Accepted')

export const SubmitResponse = t.union([Error, Invalid, Locked, Started, Completed, Cancelled])
export const CommandResponse = t.union([
  Error,
  Invalid,
  Locked,
  Started,
  Completed,
  Cancelled,
  Accepted
])
export const ValidateResponse = t.union([Accepted, Invalid, Locked])
export const OneWayResponse = t.union([Accepted, Invalid, Locked])

export type Started = t.TypeOf<typeof Started>
export type Locked = t.TypeOf<typeof Locked>
export type Cancelled = t.TypeOf<typeof Cancelled>
export type Accepted = t.TypeOf<typeof Accepted>
export type Completed = t.TypeOf<typeof Completed>
export type Invalid = t.TypeOf<typeof Invalid>
export type Error = t.TypeOf<typeof Error>

export type SubmitResponse = t.TypeOf<typeof SubmitResponse>
export type CommandResponse = t.TypeOf<typeof CommandResponse>
export type ValidateResponse = t.TypeOf<typeof ValidateResponse>
export type OneWayResponse = t.TypeOf<typeof OneWayResponse>
