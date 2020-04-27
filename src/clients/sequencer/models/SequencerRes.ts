export type Ok = 'Ok'

export interface Unhandled {
  _type: 'Unhandled'
  state: string
  messageType: string
  msg: string
}

export type OkOrUnhandledResponse = Ok | Unhandled
