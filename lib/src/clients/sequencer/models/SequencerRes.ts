export type Ok = {
  _type: 'Ok'
}

export type CannotOperateOnAnInFlightOrFinishedStep = {
  _type: 'CannotOperateOnAnInFlightOrFinishedStep'
}

export type IdDoesNotExist = {
  _type: 'IdDoesNotExist'
  id: string
}

export type Unhandled = {
  _type: 'Unhandled'
  state: string
  messageType: string
  msg: string
}

export type GoOnlineHookFailed = {
  _type: 'GoOnlineHookFailed'
}

export type GoOfflineHookFailed = {
  _type: 'GoOfflineHookFailed'
}

export type DiagnosticHookFailed = {
  _type: 'DiagnosticHookFailed'
}

export type OperationsHookFailed = {
  _type: 'OperationsHookFailed'
}

export type OkOrUnhandledResponse = Ok | Unhandled
export type RemoveBreakpointResponse = OkOrUnhandledResponse | IdDoesNotExist
export type PauseResponse = OkOrUnhandledResponse | CannotOperateOnAnInFlightOrFinishedStep
export type GenericResponse =
  | OkOrUnhandledResponse
  | IdDoesNotExist
  | CannotOperateOnAnInFlightOrFinishedStep
export type GoOnlineResponse = OkOrUnhandledResponse | GoOnlineHookFailed
export type GoOfflineResponse = OkOrUnhandledResponse | GoOfflineHookFailed
export type DiagnosticModeResponse = Ok | DiagnosticHookFailed
export type OperationsModeResponse = Ok | OperationsHookFailed
