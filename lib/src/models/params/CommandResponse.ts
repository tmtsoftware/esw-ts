import type * as D from 'io-ts/lib/Decoder'
import type { IssueTypesD } from '../../decoders/CommandDecoders'
import type { Result } from './Result'

export type IssueTypes = D.TypeOf<typeof IssueTypesD>

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

export type SubmitResponse = Error | Invalid | Locked | Started | Completed | Cancelled
export type ErrorResponse = Error
export type InvalidResponse = Invalid
export type LockedResponse = Locked
export type StartedResponse = Started
export type CompletedResponse = Completed
export type CancelledResponse = Cancelled
export type CommandResponse = Error | Invalid | Locked | Started | Completed | Cancelled | Accepted
export type ValidateResponse = Accepted | Invalid | Locked
export type OnewayResponse = Accepted | Invalid | Locked

const CompletedL = 'Completed'
const StartedL = 'Started'
const isPositive = (response: SubmitResponse) => response._type === CompletedL
const isIntermediate = (response: SubmitResponse) => response._type === StartedL
export const isNegative = (response: SubmitResponse) =>
  !(isPositive(response) || isIntermediate(response))
