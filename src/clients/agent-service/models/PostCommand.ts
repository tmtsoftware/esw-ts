/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ComponentId } from '../../..'
import type { Prefix } from '../../../models'

export class SpawnSequenceComponent {
  _type: 'SpawnSequenceComponent' = 'SpawnSequenceComponent' as const

  constructor(
    readonly agentPrefix: Prefix,
    readonly componentName: string,
    readonly version: string[] // optional representation on wire
  ) {}
}

export class SpawnSequenceManager {
  _type: 'SpawnSequenceManager' = 'SpawnSequenceManager' as const

  constructor(
    readonly agentPrefix: Prefix,
    readonly obsModeConfigPath: string,
    readonly isConfigLocal: boolean,
    readonly version: string[] // optional representation on wire
  ) {}
}

export class KillComponent {
  _type: 'KillComponent' = 'KillComponent' as const

  constructor(readonly componentId: ComponentId) {}
}

export class GetAgentStatus {
  _type: 'GetAgentStatus' = 'GetAgentStatus' as const
}

export type AgentServiceRequest = SpawnSequenceComponent | SpawnSequenceManager | KillComponent | GetAgentStatus
