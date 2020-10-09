import * as D from 'io-ts/lib/Decoder'
import type * as T from '../clients/sequencer/models/SequencerRes'
import { ciLiteral, Decoder } from '../utils/Decoder'

const OkD: Decoder<T.Ok> = D.type({
  _type: ciLiteral('Ok')
})

const CannotOperateOnAnInFlightOrFinishedStepD: Decoder<T.CannotOperateOnAnInFlightOrFinishedStep> = D.type(
  {
    _type: ciLiteral('CannotOperateOnAnInFlightOrFinishedStep')
  }
)

const IdDoesNotExistD: Decoder<T.IdDoesNotExist> = D.type({
  _type: ciLiteral('IdDoesNotExist'),
  id: D.string
})

const UnhandledD: Decoder<T.Unhandled> = D.type({
  _type: ciLiteral('Unhandled'),
  state: D.string,
  messageType: D.string,
  msg: D.string
})

const GoOnlineHookFailedD: Decoder<T.GoOnlineHookFailed> = D.type({
  _type: ciLiteral('GoOnlineHookFailed')
})

const GoOfflineHookFailedD: Decoder<T.GoOfflineHookFailed> = D.type({
  _type: ciLiteral('GoOfflineHookFailed')
})

const DiagnosticHookFailedD: Decoder<T.DiagnosticHookFailed> = D.type({
  _type: ciLiteral('DiagnosticHookFailed')
})

const OperationsHookFailedD: Decoder<T.OperationsHookFailed> = D.type({
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
