import { Parameter } from 'models/params/Parameter'
import { Key } from 'models/params/Key'

export type CommandResponse = {
  runId: string
  result?: Set<Parameter<Key>>
  issue?: Issue
}

export interface ValidateResponse extends CommandResponse {
  _type: 'Accepted' | 'Invalid' | 'Locked'
}

export interface SubmitResponse extends CommandResponse {
  _type: 'Error' | 'Invalid' | 'Locked' | 'Started' | 'Completed' | 'Cancelled'
}

export interface OneWayResponse extends CommandResponse {
  _type: 'Accepted' | 'Invalid' | 'Locked'
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
