export interface Ok {
  _type: 'Ok'
}

export const Ok: Ok = { _type: 'Ok' }

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

export type OkOrUnhandledResponse = Ok | Unhandled
