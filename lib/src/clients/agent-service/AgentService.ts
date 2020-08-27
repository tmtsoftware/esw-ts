import { Connection, Option, TokenFactory } from '../..'
import { Prefix } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint } from '../../utils/Utils'
import { AgentServiceImpl } from './AgentServiceImpl'
import { KillResponse, SpawnResponse } from './models/AgentRes'
import { resolveAgentServer } from './models/ResolveAgentServer'

export interface AgentService {
  spawnSequenceManager(
    agentPrefix: Prefix,
    obsModeConfigPath: string,
    isConfigLocal: boolean,
    version: Option<string>
  ): Promise<SpawnResponse>

  spawnSequenceComponent(
    agentPrefix: Prefix,
    componentName: string,
    version: Option<string>
  ): Promise<SpawnResponse>

  killComponent(connection: Connection): Promise<KillResponse>
}

export const AgentService: (tokenFactory: TokenFactory) => Promise<AgentService> = async (
  tokenFactory: TokenFactory
) => {
  const { host, port } = await resolveAgentServer()
  const postEndpoint = getPostEndPoint({ host, port })

  return new AgentServiceImpl(new HttpTransport(postEndpoint, tokenFactory))
}
