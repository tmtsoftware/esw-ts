export interface WebsocketCommand {
  _type: 'QueryFinal' | 'SubscribeCurrentState'
  controlCommand: WebSocketCommandMessage
}

export type WebSocketCommandMessage = QueryFinalMessage | SubscribeCurrentStateMessage

interface QueryFinalMessage {
  _type: 'QueryFinal'
  runId: string
  timeoutInSeconds: number
}

interface SubscribeCurrentStateMessage {
  _type: 'SubscribeCurrentState'
  names: string[]
}
