import { pipe } from 'fp-ts/function'
import * as D from 'io-ts/es6/Decoder'
import type * as T from '../clients/sequencer/models/SequencerRes'
import type {
  Step,
  StepStatus,
  StepStatusFailure,
  StepStatusInFlight,
  StepStatusPending,
  StepStatusSuccess
} from '../clients/sequencer/models/StepList'
import { StepList } from '../clients/sequencer/models/StepList'
import { SequenceCommandD } from './CommandDecoders'
import { UnhandledD } from './CommonDecoders'
import { ciLiteral, Decoder } from './Decoder'

const OkD: Decoder<T.Ok> = D.struct({
  _type: ciLiteral('Ok')
})

const CannotOperateOnAnInFlightOrFinishedStepD: Decoder<T.CannotOperateOnAnInFlightOrFinishedStep> =
  D.struct({
    _type: ciLiteral('CannotOperateOnAnInFlightOrFinishedStep')
  })

const IdDoesNotExistD: Decoder<T.IdDoesNotExist> = D.struct({
  _type: ciLiteral('IdDoesNotExist'),
  id: D.string
})

const GoOnlineHookFailedD: Decoder<T.GoOnlineHookFailed> = D.struct({
  _type: ciLiteral('GoOnlineHookFailed')
})

const GoOfflineHookFailedD: Decoder<T.GoOfflineHookFailed> = D.struct({
  _type: ciLiteral('GoOfflineHookFailed')
})

const DiagnosticHookFailedD: Decoder<T.DiagnosticHookFailed> = D.struct({
  _type: ciLiteral('DiagnosticHookFailed')
})

const OperationsHookFailedD: Decoder<T.OperationsHookFailed> = D.struct({
  _type: ciLiteral('OperationsHookFailed')
})

export const OkOrUnhandledResponseD: Decoder<T.OkOrUnhandledResponse> = D.sum('_type')({
  Ok: OkD,
  Unhandled: UnhandledD
})

export const RemoveBreakpointResponseD: Decoder<T.RemoveBreakpointResponse> = D.sum('_type')({
  Ok: OkD,
  Unhandled: UnhandledD,
  IdDoesNotExist: IdDoesNotExistD
})
export const PauseResponseD: Decoder<T.PauseResponse> = D.sum('_type')({
  Ok: OkD,
  Unhandled: UnhandledD,
  CannotOperateOnAnInFlightOrFinishedStep: CannotOperateOnAnInFlightOrFinishedStepD
})

export const GenericResponseD: Decoder<T.GenericResponse> = D.sum('_type')({
  Ok: OkD,
  Unhandled: UnhandledD,
  IdDoesNotExist: IdDoesNotExistD,
  CannotOperateOnAnInFlightOrFinishedStep: CannotOperateOnAnInFlightOrFinishedStepD
})

export const GoOnlineResponseD: Decoder<T.GoOnlineResponse> = D.sum('_type')({
  Ok: OkD,
  Unhandled: UnhandledD,
  GoOnlineHookFailed: GoOnlineHookFailedD
})

export const GoOfflineResponseD: Decoder<T.GoOfflineResponse> = D.sum('_type')({
  Ok: OkD,
  Unhandled: UnhandledD,
  GoOfflineHookFailed: GoOfflineHookFailedD
})

export const DiagnosticModeResponseD: Decoder<T.DiagnosticModeResponse> = D.sum('_type')({
  Ok: OkD,
  DiagnosticHookFailed: DiagnosticHookFailedD
})

export const OperationsModeResponseD: Decoder<T.OperationsModeResponse> = D.sum('_type')({
  Ok: OkD,
  OperationsHookFailed: OperationsHookFailedD
})

const mkStepStatusD = <T extends string>(_type: T): Decoder<{ _type: T }> =>
  D.struct({
    _type: D.literal(_type)
  })

const StepStatusPendingD: Decoder<StepStatusPending> = mkStepStatusD('Pending')
const StepStatusInFlightD: Decoder<StepStatusInFlight> = mkStepStatusD('InFlight')
const StepStatusSuccessD: Decoder<StepStatusSuccess> = mkStepStatusD('Success')
const StepStatusFailureD: Decoder<StepStatusFailure> = D.struct({
  _type: D.literal('Failure'),
  message: D.string
})

export const StepStatusD: Decoder<StepStatus> = D.sum('_type')({
  Pending: StepStatusPendingD,
  InFlight: StepStatusInFlightD,
  Success: StepStatusSuccessD,
  Failure: StepStatusFailureD
})

export const StepD: Decoder<Step> = D.struct({
  id: D.string,
  command: SequenceCommandD,
  status: StepStatusD,
  hasBreakpoint: D.boolean
})

export const StepListD: Decoder<StepList> = pipe(
  D.array(StepD),
  D.parse((r) => D.success(new StepList(r)))
)
export const OptionOfStepList: Decoder<StepList[]> = D.array(StepListD)

export const SequencerStateD: Decoder<T.SequencerState> = D.struct({
  _type: ciLiteral('Idle', 'Processing', 'Loaded', 'Offline', 'Running')
})

export const SequencerStateResponseD: Decoder<T.SequencerStateResponse> = D.struct({
  _type: ciLiteral('SequencerStateResponse'),
  stepList: StepListD,
  sequencerState: SequencerStateD
})
