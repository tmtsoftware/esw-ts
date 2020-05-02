import { SequenceCommand } from 'models/params/Command'

export interface Step {
  readonly id: string
  readonly command: SequenceCommand
  readonly status: StepStatus
  readonly hasBreakpoint: boolean
}

export interface StepStatus {
  readonly _type: 'Pending' | 'InFlight' | 'Success' | 'Failure'
}

export type StepList = Step[]
