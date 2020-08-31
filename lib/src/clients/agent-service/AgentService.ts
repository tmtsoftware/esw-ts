import { Connection, TokenFactory } from '../..'
import { Prefix } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint } from '../../utils/Utils'
import { AgentServiceImpl } from './AgentServiceImpl'
import { KillResponse, SpawnResponse } from './models/AgentRes'
import { resolveAgentService } from './models/ResolveAgentService'
import { agentServiceConnection, resolveConnection } from '../../config/Connections'

export interface AgentService {
  spawnSequenceManager(
    agentPrefix: Prefix,
    obsModeConfigPath: string,
    isConfigLocal: boolean,
    version?: string
  ): Promise<SpawnResponse>

  spawnSequenceComponent(
    agentPrefix: Prefix,
    componentName: string,
    version?: string
  ): Promise<SpawnResponse>

  killComponent(connection: Connection): Promise<KillResponse>
}

export const AgentService: (tokenFactory: TokenFactory) => Promise<AgentService> = async (
  tokenFactory: TokenFactory
) => {
  const { host, port } = await resolveAgentService()
  const postEndpoint = getPostEndPoint({ host, port })

  return new AgentServiceImpl(new HttpTransport(postEndpoint, tokenFactory))
}
