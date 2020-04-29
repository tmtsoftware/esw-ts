import { Key } from 'models/params/Key'
import { Parameter } from 'models/params/Parameter'

export type CommandResponse = {
  runId: string
}

export interface Error extends CommandResponse {
  _type: 'Error'
  message: string
}

export interface Invalid extends CommandResponse {
  _type: 'Invalid'
  issue: CommandIssue
}

export interface Locked extends CommandResponse {
  _type: 'Locked'
}

export interface Started extends CommandResponse {
  _type: 'Started'
}

export interface Completed extends CommandResponse {
  _type: 'Completed'
  result?: { paramSet: Parameter<Key>[] }
}

export interface Cancelled extends CommandResponse {
  _type: 'Cancelled'
}

export interface Accepted extends CommandResponse {
  _type: 'Accepted'
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
  _type: IssueTypes
  reason: string
}

export type CommandServiceResponses = SubmitResponse | OneWayResponse | ValidateResponse
