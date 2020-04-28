import { SequenceCommand } from 'models/params/Command'

export interface Step {
  id: string
  command: SequenceCommand
  status: StepStatus
  hasBreakpoint: boolean
}

type Finished = 'Success' | 'Failure'

export interface StepStatus {
  _type: Finished | 'InFlight' | 'Pending'
}

export const Pending: StepStatus = { _type: 'Pending' }
export const InFlight: StepStatus = { _type: 'InFlight' }
export const Failure: StepStatus = { _type: 'Failure' }
export const Success: StepStatus = { _type: 'Success' }

export type StepList = Step[]
