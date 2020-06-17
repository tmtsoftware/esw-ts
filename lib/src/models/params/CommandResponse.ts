import { Key } from './Key'
import { Parameter } from './Parameter'

interface CommandResponse {
  readonly runId: string
}

export interface Error extends CommandResponse {
  readonly _type: 'Error'
  readonly message: string
}

export interface Invalid extends CommandResponse {
  readonly _type: 'Invalid'
  readonly issue: CommandIssue
}

export interface Locked extends CommandResponse {
  readonly _type: 'Locked'
}

export interface Started extends CommandResponse {
  readonly _type: 'Started'
}

export interface Completed extends CommandResponse {
  readonly _type: 'Completed'
  readonly result?: { paramSet: Parameter<Key>[] }
}

export interface Cancelled extends CommandResponse {
  readonly _type: 'Cancelled'
}

export interface Accepted extends CommandResponse {
  readonly _type: 'Accepted'
}

export type ValidateResponse = Accepted | Invalid | Locked

export type SubmitResponse = Error | Invalid | Locked | Started | Completed | Cancelled

export type OneWayResponse = Accepted | Invalid | Locked

type IssueTypes =
  | 'AssemblyBusyIssue'
  | 'HCDBusyIssue'
  | 'IdNotAvailableIssue'
  | 'MissingKeyIssue'
  | 'OtherIssue'
  | 'ParameterValueOutOfRangeIssue'
  | 'RequiredAssemblyUnavailableIssue'
  | 'RequiredHCDUnavailableIssue'
  | 'RequiredSequencerUnavailableIssue'
  | 'RequiredServiceUnavailableIssue'
  | 'UnresolvedLocationsIssue'
  | 'UnsupportedCommandInStateIssue'
  | 'UnsupportedCommandIssue'
  | 'WrongInternalStateIssue'
  | 'WrongNumberOfParametersIssue'
  | 'WrongParameterTypeIssue'
  | 'WrongPrefixIssue'
  | 'WrongUnitsIssue'

export interface CommandIssue {
  readonly _type: IssueTypes
  readonly reason: string
}

export type CommandServiceResponses = SubmitResponse | OneWayResponse | ValidateResponse
