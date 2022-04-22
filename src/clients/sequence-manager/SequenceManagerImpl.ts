/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Res from '../../decoders/SequenceManagerDecoders'
import type { Prefix, Subsystem } from '../../models'
import type { HttpTransport } from '../../utils/HttpTransport'
import type { ObsMode } from './models/ObsMode'
import * as Req from './models/PostCommand'
import type { ProvisionConfig } from './models/ProvisionConfig'
import type * as T from './models/SequenceManagerRes'
import type { Variation } from './models/Variation'
import type { SequenceManagerService } from './SequenceManagerService'

export class SequenceManagerImpl implements SequenceManagerService {
  constructor(private readonly httpTransport: HttpTransport<Req.SequenceManagerPostRequest>) {}

  configure(obsMode: ObsMode): Promise<T.ConfigureResponse> {
    return this.httpTransport.requestRes(new Req.Configure(obsMode), Res.ConfigureResponseD)
  }

  provision(config: ProvisionConfig): Promise<T.ProvisionResponse> {
    return this.httpTransport.requestRes(new Req.Provision(config), Res.ProvisionResponseD)
  }

  getObsModesDetails(): Promise<T.ObsModesDetailsResponse> {
    return this.httpTransport.requestRes(new Req.GetObsModesDetails(), Res.ObsModesDetailsResponseD)
  }

  startSequencer(subsystem: Subsystem, obsMode: ObsMode, variation?: Variation): Promise<T.StartSequencerResponse> {
    return this.httpTransport.requestRes(
      new Req.StartSequencer(subsystem, obsMode, variation ? [variation] : []),
      Res.StartSequencerResponseD
    )
  }

  restartSequencer(subsystem: Subsystem, obsMode: ObsMode, variation?: Variation): Promise<T.RestartSequencerResponse> {
    return this.httpTransport.requestRes(
      new Req.RestartSequencer(subsystem, obsMode, variation ? [variation] : []),
      Res.RestartSequencerResponseD
    )
  }

  shutdownSequencer(
    subsystem: Subsystem,
    obsMode: ObsMode,
    variation?: Variation
  ): Promise<T.ShutdownSequencersResponse> {
    return this.httpTransport.requestRes(
      new Req.ShutdownSequencer(subsystem, obsMode, variation ? [variation] : []),
      Res.ShutdownSequencersOrSeqCompResponseD
    )
  }

  shutdownSubsystemSequencers(subsystem: Subsystem): Promise<T.ShutdownSequencersResponse> {
    return this.httpTransport.requestRes(
      new Req.ShutdownSubsystemSequencers(subsystem),
      Res.ShutdownSequencersOrSeqCompResponseD
    )
  }

  shutdownObsModeSequencers(obsMode: ObsMode): Promise<T.ShutdownSequencersResponse> {
    return this.httpTransport.requestRes(
      new Req.ShutdownObsModeSequencers(obsMode),
      Res.ShutdownSequencersOrSeqCompResponseD
    )
  }

  shutdownAllSequencers(): Promise<T.ShutdownSequencersResponse> {
    return this.httpTransport.requestRes(new Req.ShutdownAllSequencers(), Res.ShutdownSequencersOrSeqCompResponseD)
  }

  shutdownSequenceComponent(prefix: Prefix): Promise<T.ShutdownSequenceComponentResponse> {
    return this.httpTransport.requestRes(
      new Req.ShutdownSequenceComponent(prefix),
      Res.ShutdownSequencersOrSeqCompResponseD
    )
  }

  shutdownAllSequenceComponents(): Promise<T.ShutdownSequenceComponentResponse> {
    return this.httpTransport.requestRes(
      new Req.ShutdownAllSequenceComponents(),
      Res.ShutdownSequencersOrSeqCompResponseD
    )
  }

  getResources(): Promise<T.ResourcesStatusResponse> {
    return this.httpTransport.requestRes(new Req.GetResources(), Res.ResourcesStatusResponseD)
  }
}
