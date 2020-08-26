import * as D from 'io-ts/lib/Decoder'
import { ciLiteral } from '../../../utils/Decoder'

// ##################### Decoders #####################

const OkL = 'Ok'
const CannotOperateOnAnInFlightOrFinishedStepL = 'CannotOperateOnAnInFlightOrFinishedStep'
const IdDoesNotExistL = 'IdDoesNotExist'
const UnhandledL = 'Unhandled'
const GoOnlineHookFailedL = 'GoOnlineHookFailed'
const GoOfflineHookFailedL = 'GoOfflineHookFailed'
const DiagnosticHookFailedL = 'DiagnosticHookFailed'
const OperationsHookFailedL = 'OperationsHookFailed'

const OkD = D.type({
  _type: ciLiteral(OkL)
})

const CannotOperateOnAnInFlightOrFinishedStepD = D.type({
  _type: ciLiteral(CannotOperateOnAnInFlightOrFinishedStepL)
})

const IdDoesNotExistD = D.type({
  _type: ciLiteral(IdDoesNotExistL),
  id: D.string
})

const UnhandledD = D.type({
  _type: ciLiteral(UnhandledL),
  state: D.string,
  messageType: D.string,
  msg: D.string
})

const GoOnlineHookFailedD = D.type({
  _type: ciLiteral(GoOnlineHookFailedL)
})

const GoOfflineHookFailedD = D.type({
  _type: ciLiteral(GoOfflineHookFailedL)
})

const DiagnosticHookFailedD = D.type({
  _type: ciLiteral(DiagnosticHookFailedL)
})

const OperationsHookFailedD = D.type({
  _type: ciLiteral(OperationsHookFailedL)
})

export const OkOrUnhandledResponseD = D.sum('_type')({
  [OkL]: OkD,
  [UnhandledL]: UnhandledD
})

export const RemoveBreakpointResponseD = D.sum('_type')({
  [OkL]: OkD,
  [UnhandledL]: UnhandledD,
  [IdDoesNotExistL]: IdDoesNotExistD
})
export const PauseResponseD = D.sum('_type')({
  [OkL]: OkD,
  [UnhandledL]: UnhandledD,
  [CannotOperateOnAnInFlightOrFinishedStepL]: CannotOperateOnAnInFlightOrFinishedStepD
})

export const GenericResponseD = D.sum('_type')({
  [OkL]: OkD,
  [UnhandledL]: UnhandledD,
  [IdDoesNotExistL]: IdDoesNotExistD,
  [CannotOperateOnAnInFlightOrFinishedStepL]: CannotOperateOnAnInFlightOrFinishedStepD
})

export const GoOnlineResponseD = D.sum('_type')({
  [OkL]: OkD,
  [UnhandledL]: UnhandledD,
  [GoOnlineHookFailedL]: GoOnlineHookFailedD
})

export const GoOfflineResponseD = D.sum('_type')({
  [OkL]: OkD,
  [UnhandledL]: UnhandledD,
  [GoOfflineHookFailedL]: GoOfflineHookFailedD
})

export const DiagnosticModeResponseD = D.sum('_type')({
  [OkL]: OkD,
  [DiagnosticHookFailedL]: DiagnosticHookFailedD
})

export const OperationsModeResponseD = D.sum('_type')({
  [OkL]: OkD,
  [OperationsHookFailedL]: OperationsHookFailedD
})

// ######################################################

export type OkOrUnhandledResponse = D.TypeOf<typeof OkOrUnhandledResponseD>
export type RemoveBreakpointResponse = D.TypeOf<typeof RemoveBreakpointResponseD>
export type PauseResponse = D.TypeOf<typeof PauseResponseD>
export type GenericResponse = D.TypeOf<typeof GenericResponseD>
export type GoOnlineResponse = D.TypeOf<typeof GoOnlineResponseD>
export type GoOfflineResponse = D.TypeOf<typeof GoOfflineResponseD>
export type DiagnosticModeResponse = D.TypeOf<typeof DiagnosticModeResponseD>
export type OperationsModeResponse = D.TypeOf<typeof OperationsModeResponseD>
