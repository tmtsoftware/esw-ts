/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AgentService } from './AgentService'
import type { KillResponse, SpawnResponse, AgentStatusResponse } from './models/AgentRes'
import {
  AgentServiceRequest,
  GetAgentStatus,
  KillComponent,
  SpawnSequenceComponent,
  SpawnSequenceManager
} from './models/PostCommand'
import { AgentStatusResponseD, KillResponseD, SpawnResponseD } from '../../decoders/AgentDecoders'
import type { ComponentId, Prefix } from '../../models'

import type { HttpTransport } from '../../utils/HttpTransport'

export class AgentServiceImpl implements AgentService {
  constructor(private readonly httpTransport: HttpTransport<AgentServiceRequest>) {}

  killComponent(componentId: ComponentId): Promise<KillResponse> {
    return this.httpTransport.requestRes(new KillComponent(componentId), KillResponseD)
  }

  spawnSequenceComponent(agentPrefix: Prefix, componentName: string, version?: string): Promise<SpawnResponse> {
    return this.httpTransport.requestRes(
      new SpawnSequenceComponent(agentPrefix, componentName, version ? [version] : []),
      SpawnResponseD
    )
  }

  spawnSequenceManager(
    agentPrefix: Prefix,
    obsModeConfigPath: string,
    isConfigLocal: boolean,
    version?: string
  ): Promise<SpawnResponse> {
    return this.httpTransport.requestRes(
      new SpawnSequenceManager(agentPrefix, obsModeConfigPath, isConfigLocal, version ? [version] : []),
      SpawnResponseD
    )
  }

  getAgentStatus(): Promise<AgentStatusResponse> {
    return this.httpTransport.requestRes(new GetAgentStatus(), AgentStatusResponseD)
  }
}
