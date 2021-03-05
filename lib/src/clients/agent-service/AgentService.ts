import type { ComponentId, TokenFactory } from '../..'
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
 *  @category Service
 */
export interface AgentService {
  /**
   * This API is used to spawn sequence manager if not spawned already and returns a promise of SpawnResponse.
   *
   * @param agentPrefix       The prefix of the agent machine where sequence manager needs to be spawned.
   * @param obsModeConfigPath The path of the observation mode config path which should be present on agent machine or on config server.
   * @param isConfigLocal     Boolean value to know if config file is present on local(agent) machine.
   * @param version           The sequence manager version. @default [3.0.0-M1]
   * @return                  SpawnResponse as Promise
   */
  spawnSequenceManager(
    agentPrefix: Prefix,
    obsModeConfigPath: string,
    isConfigLocal: boolean,
    version?: string
  ): Promise<SpawnResponse>

  /**
   * This API is used to spawn sequence component on agent machine and returns a promise of SpawnResponse.
   *
   * @param agentPrefix       The prefix of the agent machine where sequence component needs to be spawned.
   * @param componentName     The name of the component.
   * @param version           The OCS App version. default value is '3.0.0-M1'
   * @return                  SpawnResponse as Promise
   */
  spawnSequenceComponent(
    agentPrefix: Prefix,
    componentName: string,
    version?: string
  ): Promise<SpawnResponse>

  /**
   * This API is used to kill component present on any machine and returns a promise of KillResponse.
   *
   * @param componentId       Id of the component to be killed.
   * @return                  KillResponse as Promise
   */
  killComponent(componentId: ComponentId): Promise<KillResponse>
}

export const AgentService = async (tokenFactory: TokenFactory): Promise<AgentService> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { SNOWPACK_PUBLIC_ENABLE_FEATURE, SNOWPACK_PUBLIC_API_URL } = import.meta.env
  console.log(SNOWPACK_PUBLIC_ENABLE_FEATURE, SNOWPACK_PUBLIC_API_URL)
  const { host, port } = await resolveConnection(agentServiceConnection)
  const postEndpoint = getPostEndPoint({ host, port })

  return new AgentServiceImpl(new HttpTransport(postEndpoint, tokenFactory))
}
