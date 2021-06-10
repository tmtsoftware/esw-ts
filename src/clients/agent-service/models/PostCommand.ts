import type { ComponentId } from '../../..'
import type { Prefix } from '../../../models'

export class SpawnSequenceComponent {
  readonly _type: 'SpawnSequenceComponent' = 'SpawnSequenceComponent'

  constructor(
    readonly agentPrefix: Prefix,
    readonly componentName: string,
    readonly version: string[] // optional representation on wire
  ) {}
}

export class SpawnSequenceManager {
  readonly _type: 'SpawnSequenceManager' = 'SpawnSequenceManager'

  constructor(
    readonly agentPrefix: Prefix,
    readonly obsModeConfigPath: string,
    readonly isConfigLocal: boolean,
    readonly version: string[] // optional representation on wire
  ) {}
}

export class KillComponent {
  readonly _type: 'KillComponent' = 'KillComponent'

  constructor(readonly componentId: ComponentId) {}
}

export class GetAgentStatus {
  readonly _type: 'GetAgentStatus' = 'GetAgentStatus'
}

export type AgentServiceRequest =
  | SpawnSequenceComponent
  | SpawnSequenceManager
  | KillComponent
  | GetAgentStatus
