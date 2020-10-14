export type Done = 'Done'

export type Failed = {
  _type: 'Failed'
  msg: string
}

export type Unhandled = {
  _type: 'Unhandled'
  state: string
  messageType: string
  msg: string
}
