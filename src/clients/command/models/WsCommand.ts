export type WsCommandType = 'QueryFinal' | 'SubscribeCurrentState'

export type WebsocketCommand = QueryFinalCommand | SubscribeCurrentStateCommand

export interface QueryFinalCommand {
  _type: 'QueryFinal'
  runId: string
  timeoutInSeconds: number
}

export interface SubscribeCurrentStateCommand {
  _type: 'SubscribeCurrentState'
  names: string[]
}
