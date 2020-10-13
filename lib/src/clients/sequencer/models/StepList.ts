import type { SequenceCommand } from '../../../models'

export interface Step {
  readonly id: string
  readonly command: SequenceCommand
  readonly status: StepStatus
  readonly hasBreakpoint: boolean
}

export type StepList = Step[]

export type StepStatusPending = { _type: 'Pending' }
export type StepStatusInFlight = { _type: 'InFlight' }
export type StepStatusSuccess = { _type: 'Success' }
export type StepStatusFailure = {
  readonly _type: 'Failure'
  readonly message: string
}

export type StepStatus =
  | StepStatusPending
  | StepStatusInFlight
  | StepStatusSuccess
  | StepStatusFailure
