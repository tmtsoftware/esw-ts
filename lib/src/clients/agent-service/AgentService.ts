import type { Connection, TokenFactory } from '../..'
import { agentServiceConnection, resolveConnection } from '../../config/Connections'
import type { Prefix } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint } from '../../utils/Utils'
import { AgentServiceImpl } from './AgentServiceImpl'
import type { KillResponse, SpawnResponse } from './models/AgentRes'

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
  const { host, port } = await resolveConnection(agentServiceConnection)
  const postEndpoint = getPostEndPoint({ host, port })

  return new AgentServiceImpl(new HttpTransport(postEndpoint, tokenFactory))
}
