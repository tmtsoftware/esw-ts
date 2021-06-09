export type SequencerWebsocketRequest = QueryFinal | SubscribeSequencerState

export class QueryFinal {
  readonly _type: 'QueryFinal' = 'QueryFinal'

  constructor(readonly runId: string, readonly timeout: number) {}
}

export class SubscribeSequencerState {
  readonly _type: 'SubscribeSequencerState' = 'SubscribeSequencerState'
}
