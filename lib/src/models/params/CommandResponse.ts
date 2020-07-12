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

export const Locked = t.type({
  runId: t.string,
  _type: t.literal('Locked')
})

export const Started = t.type({
  runId: t.string,
  _type: t.literal('Started')
})

export const Completed = t.type({
  runId: t.string,
  _type: t.literal('Completed'),
  result: ParamSet
})

export const Cancelled = t.type({
  runId: t.string,
  _type: t.literal('Cancelled')
})

export const Accepted = t.type({
  runId: t.string,
  _type: t.literal('Accepted')
})

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

export type SubmitResponse = t.TypeOf<typeof SubmitResponse>
export type CommandResponse = t.TypeOf<typeof CommandResponse>
export type ValidateResponse = t.TypeOf<typeof ValidateResponse>
export type OneWayResponse = t.TypeOf<typeof OneWayResponse>
