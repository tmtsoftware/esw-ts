import * as D from 'io-ts/lib/Decoder'
import { SequenceCommand } from '../../../models'
import { ciLiteral, Decoder } from '../../../utils/Decoder'

const StepStatusL = ciLiteral('Pending', 'InFlight', 'Success', 'Failure')
const StepStatus: Decoder<StepStatus> = D.type({ _type: StepStatusL })

export const Step: Decoder<Step> = D.type({
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
