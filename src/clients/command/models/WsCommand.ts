/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

export type CommandServiceWsMessage = QueryFinal | SubscribeCurrentState

export class SubscribeCurrentState {
  readonly _type: 'SubscribeCurrentState' = 'SubscribeCurrentState'
  readonly names: string[]

  constructor(stateNames: Set<string>) {
    this.names = Array.from(stateNames.values())
  }
}

export class QueryFinal {
  readonly _type: 'QueryFinal' = 'QueryFinal'

  constructor(readonly runId: string, readonly timeoutInSeconds: number) {}
}
