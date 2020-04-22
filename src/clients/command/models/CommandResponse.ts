import { Parameter } from 'models/params/Parameter'
import { Key } from 'models/params/Key'

enum ResponseType {
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
  _type: ResponseType.Accepted | ResponseType.Invalid | ResponseType.Locked
}

export interface SubmitResponse extends CommandResponse {
  _type:
    | ResponseType.Error
    | ResponseType.Invalid
    | ResponseType.Locked
    | ResponseType.Started
    | ResponseType.Completed
    | ResponseType.Cancelled
}

export interface OneWayResponse extends CommandResponse {
  _type: ResponseType.Accepted | ResponseType.Invalid | ResponseType.Locked
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
