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

export const QueryFinal = (runId: string, timeoutInSeconds: number): QueryFinalCommand => {
  return { _type: 'QueryFinal', runId, timeoutInSeconds }
}

export const SubscribeCurrentState = (stateNames: Set<string>): SubscribeCurrentStateCommand => {
  return { _type: 'SubscribeCurrentState', names: Array.from(stateNames.values()) }
}
