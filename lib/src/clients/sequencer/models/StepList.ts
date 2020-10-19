import type { SequenceCommand } from '../../../models'
/**
 * @category Sequencer Service
 */
export interface Step {
  readonly id: string
  readonly command: SequenceCommand
  readonly status: StepStatus
  readonly hasBreakpoint: boolean
}
/**
 * @category Sequencer Service
 */
export type StepList = Step[]

export type StepStatusPending = { _type: 'Pending' }
export type StepStatusInFlight = { _type: 'InFlight' }
export type StepStatusSuccess = { _type: 'Success' }
export type StepStatusFailure = {
  readonly _type: 'Failure'
  readonly message: string
}
/**
 * @category Sequencer Service
 */
export type StepStatus =
  | StepStatusPending
  | StepStatusInFlight
  | StepStatusSuccess
  | StepStatusFailure
