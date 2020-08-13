export type SequencerWebsocketRequest = QueryFinal

export class QueryFinal {
  readonly _type: 'QueryFinal' = 'QueryFinal'
  constructor(readonly runId: string, readonly timeout: number) {}
}
