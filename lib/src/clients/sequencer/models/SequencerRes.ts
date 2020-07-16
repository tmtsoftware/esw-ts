import * as D from 'io-ts/lib/Decoder'
import { ciLiteral } from '../../../utils/Decoder'

const Ok = 'Ok'
const CannotOperateOnAnInFlightOrFinishedStep = 'CannotOperateOnAnInFlightOrFinishedStep'
const IdDoesNotExist = 'IdDoesNotExist'
const Unhandled = 'Unhandled'
const GoOnlineHookFailed = 'GoOnlineHookFailed'
const GoOfflineHookFailed = 'GoOfflineHookFailed'
const DiagnosticHookFailed = 'DiagnosticHookFailed'
const OperationsHookFailed = 'OperationsHookFailed'

const OkD = D.type({
  _type: ciLiteral(Ok)
})

const CannotOperateOnAnInFlightOrFinishedStepD = D.type({
  _type: ciLiteral(CannotOperateOnAnInFlightOrFinishedStep)
})

const IdDoesNotExistD = D.type({
  _type: ciLiteral(IdDoesNotExist),
  id: D.string
})

const UnhandledD = D.type({
  _type: ciLiteral(Unhandled),
  state: D.string,
  messageType: D.string,
  msg: D.string
})

const GoOnlineHookFailedD = D.type({
  _type: ciLiteral(GoOnlineHookFailed),
  msg: D.string
})

const GoOfflineHookFailedD = D.type({
  _type: ciLiteral(GoOfflineHookFailed),
  msg: D.string
})

const DiagnosticHookFailedD = D.type({
  _type: ciLiteral(DiagnosticHookFailed),
  msg: D.string
})

const OperationsHookFailedD = D.type({
  _type: ciLiteral(OperationsHookFailed),
  msg: D.string
})

export const OkOrUnhandledResponse = D.sum('_type')({
  [Ok]: OkD,
  [Unhandled]: UnhandledD
})

export const RemoveBreakpointResponse = D.sum('_type')({
  [Ok]: OkD,
  [Unhandled]: UnhandledD,
  [IdDoesNotExist]: IdDoesNotExistD
})
export const PauseResponse = D.sum('_type')({
  [Ok]: OkD,
  [Unhandled]: UnhandledD,
  [CannotOperateOnAnInFlightOrFinishedStep]: CannotOperateOnAnInFlightOrFinishedStepD
})

export const GenericResponse = D.sum('_type')({
  [Ok]: OkD,
  [Unhandled]: UnhandledD,
  [IdDoesNotExist]: IdDoesNotExistD,
  [CannotOperateOnAnInFlightOrFinishedStep]: CannotOperateOnAnInFlightOrFinishedStepD
})

export const GoOnlineResponse = D.sum('_type')({
  [Ok]: OkD,
  [Unhandled]: UnhandledD,
  [GoOnlineHookFailed]: GoOnlineHookFailedD
})

export const GoOfflineResponse = D.sum('_type')({
  [Ok]: OkD,
  [Unhandled]: UnhandledD,
  [GoOfflineHookFailed]: GoOfflineHookFailedD
})

export const DiagnosticModeResponse = D.sum('_type')({
  [Ok]: OkD,
  [DiagnosticHookFailed]: DiagnosticHookFailedD
})

export const OperationsModeResponse = D.sum('_type')({
  [Ok]: OkD,
  [OperationsHookFailed]: OperationsHookFailedD
})

export type OkOrUnhandledResponse = D.TypeOf<typeof OkOrUnhandledResponse>
export type RemoveBreakpointResponse = D.TypeOf<typeof RemoveBreakpointResponse>
export type PauseResponse = D.TypeOf<typeof PauseResponse>
export type GenericResponse = D.TypeOf<typeof GenericResponse>
export type GoOnlineResponse = D.TypeOf<typeof GoOnlineResponse>
export type GoOfflineResponse = D.TypeOf<typeof GoOfflineResponse>
export type DiagnosticModeResponse = D.TypeOf<typeof DiagnosticModeResponse>
export type OperationsModeResponse = D.TypeOf<typeof OperationsModeResponse>
