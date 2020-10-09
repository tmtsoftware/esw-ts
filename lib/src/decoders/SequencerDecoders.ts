import * as D from 'io-ts/lib/Decoder'
import type {
  CannotOperateOnAnInFlightOrFinishedStep,
  DiagnosticHookFailed,
  DiagnosticModeResponse,
  GenericResponse,
  GoOfflineHookFailed,
  GoOfflineResponse,
  GoOnlineHookFailed,
  GoOnlineResponse,
  IdDoesNotExist,
  Ok,
  OkOrUnhandledResponse,
  OperationsHookFailed,
  OperationsModeResponse,
  PauseResponse,
  RemoveBreakpointResponse,
  Unhandled
} from '../clients/sequencer/models/SequencerRes'
import { ciLiteral, Decoder } from '../utils/Decoder'

const OkD: Decoder<Ok> = D.type({
  _type: ciLiteral('Ok')
})

const CannotOperateOnAnInFlightOrFinishedStepD: Decoder<CannotOperateOnAnInFlightOrFinishedStep> = D.type(
  {
    _type: ciLiteral('CannotOperateOnAnInFlightOrFinishedStep')
  }
)

const IdDoesNotExistD: Decoder<IdDoesNotExist> = D.type({
  _type: ciLiteral('IdDoesNotExist'),
  id: D.string
})

const UnhandledD: Decoder<Unhandled> = D.type({
  _type: ciLiteral('Unhandled'),
  state: D.string,
  messageType: D.string,
  msg: D.string
})

const GoOnlineHookFailedD: Decoder<GoOnlineHookFailed> = D.type({
  _type: ciLiteral('GoOnlineHookFailed')
})

const GoOfflineHookFailedD: Decoder<GoOfflineHookFailed> = D.type({
  _type: ciLiteral('GoOfflineHookFailed')
})

const DiagnosticHookFailedD: Decoder<DiagnosticHookFailed> = D.type({
  _type: ciLiteral('DiagnosticHookFailed')
})

const OperationsHookFailedD: Decoder<OperationsHookFailed> = D.type({
  _type: ciLiteral('OperationsHookFailed')
})

export const OkOrUnhandledResponseD: Decoder<OkOrUnhandledResponse> = D.sum('_type')({
  Ok: OkD,
  Unhandled: UnhandledD
})

export const RemoveBreakpointResponseD: Decoder<RemoveBreakpointResponse> = D.sum('_type')({
  Ok: OkD,
  Unhandled: UnhandledD,
  IdDoesNotExist: IdDoesNotExistD
})
export const PauseResponseD: Decoder<PauseResponse> = D.sum('_type')({
  Ok: OkD,
  Unhandled: UnhandledD,
  CannotOperateOnAnInFlightOrFinishedStep: CannotOperateOnAnInFlightOrFinishedStepD
})

export const GenericResponseD: Decoder<GenericResponse> = D.sum('_type')({
  Ok: OkD,
  Unhandled: UnhandledD,
  IdDoesNotExist: IdDoesNotExistD,
  CannotOperateOnAnInFlightOrFinishedStep: CannotOperateOnAnInFlightOrFinishedStepD
})

export const GoOnlineResponseD: Decoder<GoOnlineResponse> = D.sum('_type')({
  Ok: OkD,
  Unhandled: UnhandledD,
  GoOnlineHookFailed: GoOnlineHookFailedD
})

export const GoOfflineResponseD: Decoder<GoOfflineResponse> = D.sum('_type')({
  Ok: OkD,
  Unhandled: UnhandledD,
  GoOfflineHookFailed: GoOfflineHookFailedD
})

export const DiagnosticModeResponseD: Decoder<DiagnosticModeResponse> = D.sum('_type')({
  Ok: OkD,
  DiagnosticHookFailed: DiagnosticHookFailedD
})

export const OperationsModeResponseD: Decoder<OperationsModeResponse> = D.sum('_type')({
  Ok: OkD,
  OperationsHookFailed: OperationsHookFailedD
})
