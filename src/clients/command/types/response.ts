import { Parameter } from '../../../params/Parameter'
import { Key } from '../../../params/Key'

type SubmitResponseTypes = 'Error' | 'Invalid' | 'Locked' | 'Completed' | 'Started' | 'Cancelled'
type ValidateResponseTypes = 'Accepted' | 'Invalid' | 'Locked'
type OneWayResponseTypes = 'Accepted' | 'Invalid' | 'Locked'
type IssueKinds = 'IdNotAvailableIssue' | 'MissingKeyIssue'

export type CommandResponse = {
  runId: string
  result?: Set<Parameter<Key>>
  issue?: Issue
}

export interface ValidateResponse extends CommandResponse {
  _type: ValidateResponseTypes
}

export interface SubmitResponse extends CommandResponse {
  _type: SubmitResponseTypes
}

export interface OneWayResponse extends CommandResponse {
  _type: OneWayResponseTypes
}

interface Issue {
  _type: IssueKinds
  reason: string
}

export type CommandServiceResponses = SubmitResponse | OneWayResponse
