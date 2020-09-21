import type { Prefix, TokenFactory } from '../..'
import { resolveConnection, sequenceManagerConnection } from '../../config/Connections'
import type { Subsystem } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { getPostEndPoint } from '../../utils/Utils'
import type { ObsMode } from './models/ObsMode'
import type { ProvisionConfig } from './models/ProvisionConfig'
import type {
  AgentStatusResponse,
  ConfigureResponse,
  GetRunningObsModesResponse,
  ProvisionResponse,
  RestartSequencerResponse,
  ShutdownSequenceComponentResponse,
  ShutdownSequencersResponse,
  StartSequencerResponse
} from './models/SequenceManagerRes'
import { SequenceManagerImpl } from './SequenceManagerImpl'

export interface SequenceManagerService {
  configure(obsMode: ObsMode): Promise<ConfigureResponse>

  provision(config: ProvisionConfig): Promise<ProvisionResponse>

  getRunningObsModes(): Promise<GetRunningObsModesResponse>

  startSequencer(subsystem: Subsystem, obsMode: ObsMode): Promise<StartSequencerResponse>

  restartSequencer(subsystem: Subsystem, obsMode: ObsMode): Promise<RestartSequencerResponse>

  shutdownSequencer(subsystem: Subsystem, obsMode: ObsMode): Promise<ShutdownSequencersResponse>

  shutdownSubsystemSequencers(subsystem: Subsystem): Promise<ShutdownSequencersResponse>

  shutdownObsModeSequencers(obsMode: ObsMode): Promise<ShutdownSequencersResponse>

  shutdownAllSequencers(): Promise<ShutdownSequencersResponse>

  shutdownSequenceComponent(prefix: Prefix): Promise<ShutdownSequenceComponentResponse>

  shutdownAllSequenceComponents(): Promise<ShutdownSequenceComponentResponse>

  getAgentStatus(): Promise<AgentStatusResponse>
}

export const SequenceManagerService: (
  tokenFactory: TokenFactory
) => Promise<SequenceManagerService> = async (tokenFactory: TokenFactory) => {
  const { host, port } = await resolveConnection(sequenceManagerConnection)
  const postEndpoint = getPostEndPoint({ host, port })

  return new SequenceManagerImpl(new HttpTransport(postEndpoint, tokenFactory))
}
