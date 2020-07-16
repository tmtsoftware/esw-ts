import * as D from 'io-ts/lib/Decoder'
import { SequenceCommand } from '../../../models'

const StepStatusL = D.literal('Pending', 'InFlight', 'Success', 'Failure')
const StepStatus: D.Decoder<unknown, StepStatus> = D.type({ _type: StepStatusL })

export const Step: D.Decoder<unknown, Step> = D.type({
  id: D.string,
  command: SequenceCommand,
  status: StepStatus,
  hasBreakpoint: D.boolean
})

export interface Step {
  readonly id: string
  readonly command: SequenceCommand
  readonly status: StepStatus
  readonly hasBreakpoint: boolean
}

export interface StepStatus {
  readonly _type: D.TypeOf<any>
}

export const StepList = D.array(Step)
export type StepList = D.TypeOf<typeof StepList>
