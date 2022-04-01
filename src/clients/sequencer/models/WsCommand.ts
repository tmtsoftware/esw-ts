/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

export type SequencerWebsocketRequest = QueryFinal | SubscribeSequencerState

export class QueryFinal {
  readonly _type: 'QueryFinal' = 'QueryFinal'

  constructor(readonly runId: string, readonly timeout: number) {}
}

export class SubscribeSequencerState {
  readonly _type: 'SubscribeSequencerState' = 'SubscribeSequencerState'
}
