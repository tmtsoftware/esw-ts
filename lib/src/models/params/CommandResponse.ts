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

const CommandIssue = D.type({
  _type: IssueTypes,
  reason: D.string
})

const Error = D.type({
  runId: D.string,
  _type: D.literal('Error'),
  message: D.string
})

const Invalid = D.type({
  runId: D.string,
  _type: D.literal('Invalid'),
  issue: CommandIssue
})

const Completed = D.type({
  runId: D.string,
  _type: D.literal('Completed'),
  result: ParamSet
})

const commandRes = <T extends string>(type: T): D.Decoder<{ _type: T; runId: string }> =>
  D.type({
    _type: D.literal(type),
    runId: D.string
  })

const Locked = commandRes('Locked')
const Started = commandRes('Started')
const Cancelled = commandRes('Cancelled')
const Accepted = commandRes('Accepted')

export const SubmitResponseD = D.sum('_type')({
  Error,
  Invalid,
  Locked,
  Started,
  Completed,
  Cancelled
})

export const CommandResponseD = D.sum('_type')({
  Error,
  Invalid,
  Locked,
  Started,
  Completed,
  Cancelled,
  Accepted
})
export const ValidateResponseD = D.sum('_type')({ Accepted, Invalid, Locked })
export const OneWayResponseD = D.sum('_type')({ Accepted, Invalid, Locked })

export type SubmitResponse = D.TypeOf<typeof SubmitResponseD>
export type CommandResponse = D.TypeOf<typeof CommandResponseD>
export type ValidateResponse = D.TypeOf<typeof ValidateResponseD>
export type OneWayResponse = D.TypeOf<typeof OneWayResponseD>
