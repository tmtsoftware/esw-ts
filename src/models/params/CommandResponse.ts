import type { Result } from './Result'

export type IssueTypes =
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

export type CommandIssue = {
  _type: IssueTypes
  reason: string
}

export type Error = {
  _type: 'Error'
  runId: string
  message: string
}

export type Invalid = {
  _type: 'Invalid'
  runId: string
  issue: CommandIssue
}

export type Completed = {
  _type: 'Completed'
  runId: string
  result: Result
}

export type Locked = {
  _type: 'Locked'
  runId: string
}

export type Started = {
  _type: 'Started'
  runId: string
}

export type Cancelled = {
  _type: 'Cancelled'
  runId: string
}
export type Accepted = {
  _type: 'Accepted'
  runId: string
}

/**
 * @category Command Service
 */
export type SubmitResponse = Error | Invalid | Locked | Started | Completed | Cancelled

/**
 * @category Command Service
 */
export type CommandResponse = Error | Invalid | Locked | Started | Completed | Cancelled | Accepted

/**
 * @category Command Service
 */
export type ValidateResponse = Accepted | Invalid | Locked

/**
 * @category Command Service
 */
export type OnewayResponse = Accepted | Invalid | Locked

const CompletedL = 'Completed'
const StartedL = 'Started'
const isPositive = (response: SubmitResponse) => response._type === CompletedL
const isIntermediate = (response: SubmitResponse) => response._type === StartedL
/**
 * @internal
 */
export const isNegative = (response: SubmitResponse) =>
  !(isPositive(response) || isIntermediate(response))
