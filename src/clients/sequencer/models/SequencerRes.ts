export interface Ok {
  _type: 'Ok'
}

export interface CannotOperateOnAnInFlightOrFinishedStep {
  _type: 'CannotOperateOnAnInFlightOrFinishedStep'
}

export interface IdDoesNotExist {
  _type: 'IdDoesNotExist'
  id: string
}

export interface Unhandled {
  _type: 'Unhandled'
  state: string
  messageType: string
  msg: string
}

export interface GoOnlineHookFailed {
  _type: 'GoOnlineHookFailed'
  msg: string
}

export interface GoOfflineHookFailed {
  _type: 'GoOfflineHookFailed'
  msg: string
}

export interface DiagnosticHookFailed {
  _type: 'DiagnosticHookFailed'
  msg: string
}

export interface OperationsHookFailed {
  _type: 'OperationsHookFailed'
  msg: string
}

export type OkOrUnhandledResponse = Ok | Unhandled
export type RemoveBreakpointResponse = OkOrUnhandledResponse | IdDoesNotExist
export type PauseResponse = OkOrUnhandledResponse | CannotOperateOnAnInFlightOrFinishedStep
export type GenericResponse = RemoveBreakpointResponse | CannotOperateOnAnInFlightOrFinishedStep
export type GoOnlineResponse = OkOrUnhandledResponse | GoOnlineHookFailed
export type GoOfflineResponse = OkOrUnhandledResponse | GoOfflineHookFailed
export type DiagnosticModeResponse = Ok | DiagnosticHookFailed
export type OperationsModeResponse = Ok | OperationsHookFailed
