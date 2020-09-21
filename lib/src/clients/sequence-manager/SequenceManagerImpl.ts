import type { Prefix, Subsystem } from '../../models'
import type { HttpTransport } from '../../utils/HttpTransport'
import type { ObsMode } from './models/ObsMode'
import * as Req from './models/PostCommand'
import type { ProvisionConfig } from './models/ProvisionConfig'
import * as Res from './models/SequenceManagerRes'
import type { SequenceManagerService } from './SequenceManagerService'

export class SequenceManagerImpl implements SequenceManagerService {
  constructor(private readonly httpTransport: HttpTransport<Req.SequenceManagerPostRequest>) {}
  configure(obsMode: ObsMode): Promise<Res.ConfigureResponse> {
    return this.httpTransport.requestRes(new Req.Configure(obsMode), Res.ConfigureResponseD)
  }

  provision(config: ProvisionConfig): Promise<Res.ProvisionResponse> {
    return this.httpTransport.requestRes(new Req.Provision(config), Res.ProvisionResponseD)
  }

  getRunningObsModes(): Promise<Res.GetRunningObsModesResponse> {
    return this.httpTransport.requestRes(
      new Req.GetRunningObsModes(),
      Res.GetRunningObsModesResponseD
    )
  }

  startSequencer(subsystem: Subsystem, obsMode: ObsMode): Promise<Res.StartSequencerResponse> {
    return this.httpTransport.requestRes(
      new Req.StartSequencer(subsystem, obsMode),
      Res.StartSequencerResponseD
    )
  }

  restartSequencer(subsystem: Subsystem, obsMode: ObsMode): Promise<Res.RestartSequencerResponse> {
    return this.httpTransport.requestRes(
      new Req.RestartSequencer(subsystem, obsMode),
      Res.RestartSequencerResponseD
    )
  }

  shutdownSequencer(
    subsystem: Subsystem,
    obsMode: ObsMode
  ): Promise<Res.ShutdownSequencersResponse> {
    return this.httpTransport.requestRes(
      new Req.ShutdownSequencer(subsystem, obsMode),
      Res.ShutdownSequencersAndSeqCompResponseD
    )
  }

  shutdownSubsystemSequencers(subsystem: Subsystem): Promise<Res.ShutdownSequencersResponse> {
    return this.httpTransport.requestRes(
      new Req.ShutdownSubsystemSequencers(subsystem),
      Res.ShutdownSequencersAndSeqCompResponseD
    )
  }

  shutdownObsModeSequencers(obsMode: ObsMode): Promise<Res.ShutdownSequencersResponse> {
    return this.httpTransport.requestRes(
      new Req.ShutdownObsModeSequencers(obsMode),
      Res.ShutdownSequencersAndSeqCompResponseD
    )
  }

  shutdownAllSequencers(): Promise<Res.ShutdownSequencersResponse> {
    return this.httpTransport.requestRes(
      new Req.ShutdownAllSequencers(),
      Res.ShutdownSequencersAndSeqCompResponseD
    )
  }

  shutdownSequenceComponent(prefix: Prefix): Promise<Res.ShutdownSequenceComponentResponse> {
    return this.httpTransport.requestRes(
      new Req.ShutdownSequenceComponent(prefix),
      Res.ShutdownSequencersAndSeqCompResponseD
    )
  }

  shutdownAllSequenceComponents(): Promise<Res.ShutdownSequenceComponentResponse> {
    return this.httpTransport.requestRes(
      new Req.ShutdownAllSequenceComponents(),
      Res.ShutdownSequencersAndSeqCompResponseD
    )
  }

  getAgentStatus(): Promise<Res.AgentStatusResponse> {
    return this.httpTransport.requestRes(new Req.GetAgentStatus(), Res.AgentStatusResponseD)
  }
}
