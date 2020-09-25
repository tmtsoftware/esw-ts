import type { Connection, TokenFactory } from '../..'
import { agentServiceConnection, resolveConnection } from '../../config/Connections'
import type { Prefix } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint } from '../../utils/Utils'
import { AgentServiceImpl } from './AgentServiceImpl'
import type { KillResponse, SpawnResponse } from './models/AgentRes'

/**
 *  Agent Service provides method based API related to spawn sequence manager and sequence component,
 *  also to kill spawned components
 *  @interface
 */
export interface AgentService {
  /**
   * This API is used to spawn sequence manager if not spawned already and returns a promise of SpawnResponse.
   * @param agentPrefix The prefix of the agent machine where sequence manager needs to be spawned.
   * @param obsModeConfigPath The path of the observation mode config path which should be present on agent machine or on config server.
   * @param isConfigLocal Boolean value to know if config file is present on local(agent) machine.
   * @param version The sequence manager version.
   * @return Promise of SpawnResponse which can be either `Spawned` or `Failed`
   */
  spawnSequenceManager(
    agentPrefix: Prefix,
    obsModeConfigPath: string,
    isConfigLocal: boolean,
    version?: string
  ): Promise<SpawnResponse>

  /**
   * This API is used to spawn sequence component on agent machine and returns a promise of SpawnResponse.
   * @param agentPrefix The prefix of the agent machine where sequence component needs to be spawned.
   * @param componentName The name of the component.
   * @param version The OCS App version.
   * @return Promise of SpawnResponse which can be either `Spawned` or `Failed`
   */
  spawnSequenceComponent(
    agentPrefix: Prefix,
    componentName: string,
    version?: string
  ): Promise<SpawnResponse>

  /**
   * This API is used to kill component present on any machine and returns a promise of KillResponse.
   * @param connection The AkkaConnection, HttpConnection or TcpConnection of the machine where component is spawned.
   * @return Promise of KillResponse which can be either `Killed` or `Failed`
   */
  killComponent(connection: Connection): Promise<KillResponse>
}

export const AgentService: (tokenFactory: TokenFactory) => Promise<AgentService> = async (
  tokenFactory: TokenFactory
) => {
  const { host, port } = await resolveConnection(agentServiceConnection)
  const postEndpoint = getPostEndPoint({ host, port })

  return new AgentServiceImpl(new HttpTransport(postEndpoint, tokenFactory))
}
