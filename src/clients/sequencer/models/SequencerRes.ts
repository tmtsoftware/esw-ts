export interface Ok {
  _type: 'Ok'
}

export const Ok: Ok = { _type: 'Ok' }

export interface CannotOperateOnAnInFlightOrFinishedStep {
  _type: 'CannotOperateOnAnInFlightOrFinishedStep'
}

export const CannotOperateOnAnInFlightOrFinishedStep: CannotOperateOnAnInFlightOrFinishedStep = {
  _type: 'CannotOperateOnAnInFlightOrFinishedStep'
}

export interface IdDoesNotExist {
  _type: 'IdDoesNotExist'
  id: string
}

export const IdDoesNotExist = (id: string): IdDoesNotExist => ({
  _type: 'IdDoesNotExist',
  id
})

export interface Unhandled {
  _type: 'Unhandled'
  state: string
  messageType: string
  msg: string
}

export const Unhandled = (state: string, messageType: string, msg: string): Unhandled => ({
  _type: 'Unhandled',
  state,
  messageType,
  msg
})

export interface GoOnlineHookFailed {
  _type: 'GoOnlineHookFailed'
  msg: string
}

export const GoOnlineHookFailed = (msg: string): GoOnlineHookFailed => ({
  _type: 'GoOnlineHookFailed',
  msg
})

export interface GoOfflineHookFailed {
  _type: 'GoOfflineHookFailed'
  msg: string
}

export const GoOfflineHookFailed = (msg: string): GoOfflineHookFailed => ({
  _type: 'GoOfflineHookFailed',
  msg
})

export type OkOrUnhandledResponse = Ok | Unhandled
export type RemoveBreakpointResponse = OkOrUnhandledResponse | IdDoesNotExist
export type PauseResponse = OkOrUnhandledResponse | CannotOperateOnAnInFlightOrFinishedStep
export type GenericResponse = RemoveBreakpointResponse | CannotOperateOnAnInFlightOrFinishedStep
export type GoOnlineResponse = OkOrUnhandledResponse | GoOnlineHookFailed
export type GoOfflineResponse = OkOrUnhandledResponse | GoOfflineHookFailed
