export type CommandServiceWsMessage = QueryFinal | SubscribeCurrentState

export interface QueryFinal {
  _type: 'QueryFinal'
  runId: string
  timeoutInSeconds: number
}

export interface SubscribeCurrentState {
  _type: 'SubscribeCurrentState'
  names: string[]
}

export const QueryFinal = (runId: string, timeoutInSeconds: number): QueryFinal => {
  return { _type: 'QueryFinal', runId, timeoutInSeconds }
}

export const SubscribeCurrentState = (stateNames: Set<string>): SubscribeCurrentState => {
  return { _type: 'SubscribeCurrentState', names: Array.from(stateNames.values()) }
}
