import type { Option, SequenceCommand } from '../../../models'
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
export class StepList {
  constructor(readonly steps: Step[]) {}

  toJSON() {
    return this.steps
  }

  isPaused(): boolean {
    const firstPendingStep = this.findFirstPendingStep()
    return firstPendingStep !== undefined && firstPendingStep.hasBreakpoint
  }

  isFailed(): boolean {
    const failedStep = this.steps.find((step) => step.status._type === 'Failure')
    return failedStep !== undefined
  }

  private findFirstPendingStep(): Option<Step> {
    return this.steps.find((step) => StepList.isPending(step))
  }

  private static isPending(step: Step): boolean {
    return step.status._type === 'Pending'
  }
}

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
