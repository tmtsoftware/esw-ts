export type CommandServiceWsMessage = QueryFinalCommand | SubscribeCurrentStateCommand

export interface QueryFinalCommand {
  _type: 'QueryFinal'
  runId: string
  timeoutInSeconds: number
}

export interface SubscribeCurrentStateCommand {
  _type: 'SubscribeCurrentState'
  names: string[]
}
