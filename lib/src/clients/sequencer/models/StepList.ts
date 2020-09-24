import * as D from 'io-ts/lib/Decoder'
import type { SequenceCommand } from '../../../models'
import { SequenceCommandD } from '../../../models/params/Command'
import { ciLiteral, Decoder } from '../../../utils/Decoder'

// ##################### Decoders #####################
const StepStatusOtherThanFailureL = ciLiteral('Pending', 'InFlight', 'Success')
const StepStatusFailureL = ciLiteral('Failure')

const StepStatusOtherThanFailureD: Decoder<StepStatus> = D.type({
  _type: StepStatusOtherThanFailureL
})

const StepStatusFailureD: Decoder<StepStatus> = D.type({
  _type: StepStatusFailureL,
  message: D.string
})

export const StepStatusD: Decoder<StepStatus> = D.union(
  StepStatusFailureD,
  StepStatusOtherThanFailureD
)

export const StepD: Decoder<Step> = D.type({
  id: D.string,
  command: SequenceCommandD,
  status: StepStatusD,
  hasBreakpoint: D.boolean
})

export const StepListD = D.array(StepD)
export const OptionOfStepList = D.array(StepListD)

// ######################################################

export interface Step {
  readonly id: string
  readonly command: SequenceCommand
  readonly status: StepStatus
  readonly hasBreakpoint: boolean
}

export type StepStatus = StepStatusOtherThanFailure | StepStatusFailure

interface StepStatusOtherThanFailure {
  readonly _type: 'Pending' | 'InFlight' | 'Success'
}

interface StepStatusFailure {
  readonly _type: 'Failure'
  readonly message: string
}

export type StepList = D.TypeOf<typeof StepListD>
