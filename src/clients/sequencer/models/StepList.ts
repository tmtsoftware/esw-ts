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

export type StepList = Step[]
