/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ObsMode } from './ObsMode'
import type { ProvisionConfig } from './ProvisionConfig'
import type { Variation } from './Variation'
import type { Prefix, Subsystem } from '../../../models'

export class Configure {
  _type: 'Configure' = 'Configure' as const

  constructor(readonly obsMode: ObsMode) {}
}

export class Provision {
  _type: 'Provision' = 'Provision' as const

  constructor(readonly config: ProvisionConfig) {}
}

export class GetObsModesDetails {
  _type: 'GetObsModesDetails' = 'GetObsModesDetails' as const
}

export class StartSequencer {
  _type: 'StartSequencer' = 'StartSequencer' as const

  constructor(
    readonly subsystem: Subsystem,
    readonly obsMode: ObsMode,
    readonly variation: Variation[]
  ) {} //optional representation on wire
}

export class RestartSequencer {
  _type: 'RestartSequencer' = 'RestartSequencer' as const

  constructor(
    readonly subsystem: Subsystem,
    readonly obsMode: ObsMode,
    readonly variation: Variation[]
  ) {} //optional representation on wire
}

export class ShutdownSequencer {
  _type: 'ShutdownSequencer' = 'ShutdownSequencer' as const

  constructor(
    readonly subsystem: Subsystem,
    readonly obsMode: ObsMode,
    readonly variation: Variation[]
  ) {} //optional representation on wire
}

export class ShutdownSubsystemSequencers {
  _type: 'ShutdownSubsystemSequencers' = 'ShutdownSubsystemSequencers' as const

  constructor(readonly subsystem: Subsystem) {}
}

export class ShutdownObsModeSequencers {
  _type: 'ShutdownObsModeSequencers' = 'ShutdownObsModeSequencers' as const

  constructor(readonly obsMode: ObsMode) {}
}

export class ShutdownAllSequencers {
  _type: 'ShutdownAllSequencers' = 'ShutdownAllSequencers' as const
}

export class ShutdownSequenceComponent {
  _type: 'ShutdownSequenceComponent' = 'ShutdownSequenceComponent' as const

  constructor(readonly prefix: Prefix) {}
}

export class ShutdownAllSequenceComponents {
  _type: 'ShutdownAllSequenceComponents' = 'ShutdownAllSequenceComponents' as const
}
export class GetResources {
  _type: 'GetResources' = 'GetResources' as const
}

export type SequenceManagerPostRequest =
  | Configure
  | Provision
  | GetObsModesDetails
  | StartSequencer
  | RestartSequencer
  | ShutdownSequencer
  | ShutdownSubsystemSequencers
  | ShutdownObsModeSequencers
  | ShutdownAllSequencers
  | ShutdownSequenceComponent
  | ShutdownAllSequenceComponents
  | GetResources
