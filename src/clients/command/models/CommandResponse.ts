import { Parameter } from '../../../models/params/Parameter'
import { Key } from '../../../models/params/Key'

enum responseType {
  Accepted = 'Accepted',
  Invalid = 'Invalid',
  Locked = 'Locked',
  Error = 'Error',
  Completed = 'Completed',
  Started = 'Started',
  Cancelled = 'Cancelled',
}

export type CommandResponse = {
  runId: string
  result?: Set<Parameter<Key>>
  issue?: Issue
}

export interface ValidateResponse extends CommandResponse {
  _type: responseType.Accepted | responseType.Invalid | responseType.Locked
}

export interface SubmitResponse extends CommandResponse {
  _type:
    | responseType.Error
    | responseType.Invalid
    | responseType.Locked
    | responseType.Started
    | responseType.Completed
    | responseType.Cancelled
}

export interface OneWayResponse extends CommandResponse {
  _type: responseType.Accepted | responseType.Invalid | responseType.Locked
}

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

interface Issue {
  _type: IssueTypes
  reason: string
}

export type CommandServiceResponses = SubmitResponse | OneWayResponse | ValidateResponse
