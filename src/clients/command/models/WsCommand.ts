/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

export type CommandServiceWsMessage = QueryFinal | SubscribeCurrentState

export class SubscribeCurrentState {
  _type: 'SubscribeCurrentState' = 'SubscribeCurrentState' as const
  readonly names: string[]

  constructor(stateNames: Set<string>) {
    this.names = Array.from(stateNames.values())
  }
}

export class QueryFinal {
  _type: 'QueryFinal' = 'QueryFinal' as const

  constructor(
    readonly runId: string,
    readonly timeoutInSeconds: number
  ) {}
}
