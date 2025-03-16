/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

export type SequencerWebsocketRequest = QueryFinal | SubscribeSequencerState

export class QueryFinal {
  _type: 'QueryFinal' = 'QueryFinal' as const

  constructor(
    readonly runId: string,
    readonly timeout: number
  ) {}
}

export class SubscribeSequencerState {
  _type: 'SubscribeSequencerState' = 'SubscribeSequencerState' as const
}
