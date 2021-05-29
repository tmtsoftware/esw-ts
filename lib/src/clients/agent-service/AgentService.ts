import type { AgentStatusResponse, AuthData, ComponentId, Location } from '../..'
import { AGENT_SERVICE_CONNECTION } from '../../config'
import type { Prefix } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { extractHostPort, getPostEndPoint } from '../../utils/Utils'
import { resolve } from '../location/LocationUtils'
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

  /**
   * gives status of TMT ecosystem components(agents, sequence components and sequencers).
   * It provides information about which agents are up and running, sequence components running on
   * those agents and sequencer script loaded on sequence component.
   *
   * @returns           AgentStatusResponse as Promise.
   */
  getAgentStatus(): Promise<AgentStatusResponse>
}

export const AgentService = async (authData?: AuthData): Promise<AgentService> => {
  const location = await resolve(AGENT_SERVICE_CONNECTION)
  return createAgentService(location, authData)
}

export const createAgentService = (location: Location, authData?: AuthData): AgentService => {
  const { host, port } = extractHostPort(location.uri)
  const postEndpoint = getPostEndPoint({ host, port })

  return new AgentServiceImpl(new HttpTransport(postEndpoint, authData))
}
