import type { KillResponse, SpawnResponse } from '.'
import { KillResponseD, SpawnResponseD } from '../../decoders/AgentDecoders'
import type { Prefix, ComponentId } from '../../models'

import type { HttpTransport } from '../../utils/HttpTransport'
import type { AgentService } from './AgentService'
import {
  AgentServiceRequest,
  KillComponent,
  SpawnSequenceComponent,
  SpawnSequenceManager
} from './models/PostCommand'

export class AgentServiceImpl implements AgentService {
  constructor(private readonly httpTransport: HttpTransport<AgentServiceRequest>) {}

  killComponent(componentId: ComponentId): Promise<KillResponse> {
    return this.httpTransport.requestRes(new KillComponent(componentId), KillResponseD)
  }

  spawnSequenceComponent(
    agentPrefix: Prefix,
    componentName: string,
    version?: string
  ): Promise<SpawnResponse> {
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
      new SpawnSequenceManager(
        agentPrefix,
        obsModeConfigPath,
        isConfigLocal,
        version ? [version] : []
      ),
      SpawnResponseD
    )
  }
}
