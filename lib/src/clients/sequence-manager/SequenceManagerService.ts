import { ObsMode } from './models/ObsMode'
import {
  AgentStatusResponse,
  ConfigureResponse,
  GetRunningObsModesResponse,
  ProvisionResponse,
  RestartSequencerResponse,
  ShutdownSequenceComponentResponse,
  ShutdownSequencersResponse,
  StartSequencerResponse
} from './models/SequenceManagerRes'
import { Prefix, Subsystem, TokenFactory } from '../..'
import { getPostEndPoint } from '../../utils/Utils'
import { HttpTransport } from '../../utils/HttpTransport'
import { resolveSequenceManager } from './ResolveSequenceManager'
import { SequenceManagerImpl } from './SequenceManagerImpl'
import { ProvisionConfig } from './models/ProvisionConfig'

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
  const { host, port } = await resolveSequenceManager()
  const postEndpoint = getPostEndPoint({ host, port })

  return new SequenceManagerImpl(new HttpTransport(postEndpoint, tokenFactory))
}