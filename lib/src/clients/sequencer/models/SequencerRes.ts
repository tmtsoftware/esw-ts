export interface Ok {
  readonly _type: 'Ok'
}

export interface CannotOperateOnAnInFlightOrFinishedStep {
  readonly _type: 'CannotOperateOnAnInFlightOrFinishedStep'
}

export interface IdDoesNotExist {
  readonly _type: 'IdDoesNotExist'
  readonly id: string
}

export interface Unhandled {
  readonly _type: 'Unhandled'
  readonly state: string
  readonly messageType: string
  readonly msg: string
}

export interface GoOnlineHookFailed {
  readonly _type: 'GoOnlineHookFailed'
  readonly msg: string
}

export interface GoOfflineHookFailed {
  readonly _type: 'GoOfflineHookFailed'
  readonly msg: string
}

export interface DiagnosticHookFailed {
  readonly _type: 'DiagnosticHookFailed'
  readonly msg: string
}

export interface OperationsHookFailed {
  readonly _type: 'OperationsHookFailed'
  readonly msg: string
}

export type OkOrUnhandledResponse = Ok | Unhandled
export type RemoveBreakpointResponse = OkOrUnhandledResponse | IdDoesNotExist
export type PauseResponse = OkOrUnhandledResponse | CannotOperateOnAnInFlightOrFinishedStep
export type GenericResponse = RemoveBreakpointResponse | CannotOperateOnAnInFlightOrFinishedStep
export type GoOnlineResponse = OkOrUnhandledResponse | GoOnlineHookFailed
export type GoOfflineResponse = OkOrUnhandledResponse | GoOfflineHookFailed
export type DiagnosticModeResponse = Ok | DiagnosticHookFailed
export type OperationsModeResponse = Ok | OperationsHookFailed
