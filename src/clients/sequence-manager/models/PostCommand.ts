import type { Prefix, Subsystem } from '../../../models'
import type { ObsMode } from './ObsMode'
import type { ProvisionConfig } from './ProvisionConfig'

export class Configure {
  readonly _type: 'Configure' = 'Configure'

  constructor(readonly obsMode: ObsMode) {}
}

export class Provision {
  readonly _type: 'Provision' = 'Provision'

  constructor(readonly config: ProvisionConfig) {}
}

export class GetObsModesDetails {
  readonly _type: 'GetObsModesDetails' = 'GetObsModesDetails'
}

export class StartSequencer {
  readonly _type: 'StartSequencer' = 'StartSequencer'

  constructor(readonly subsystem: Subsystem, readonly obsMode: ObsMode) {}
}

export class RestartSequencer {
  readonly _type: 'RestartSequencer' = 'RestartSequencer'

  constructor(readonly subsystem: Subsystem, readonly obsMode: ObsMode) {}
}

export class ShutdownSequencer {
  readonly _type: 'ShutdownSequencer' = 'ShutdownSequencer'

  constructor(readonly subsystem: Subsystem, readonly obsMode: ObsMode) {}
}

export class ShutdownSubsystemSequencers {
  readonly _type: 'ShutdownSubsystemSequencers' = 'ShutdownSubsystemSequencers'

  constructor(readonly subsystem: Subsystem) {}
}

export class ShutdownObsModeSequencers {
  readonly _type: 'ShutdownObsModeSequencers' = 'ShutdownObsModeSequencers'

  constructor(readonly obsMode: ObsMode) {}
}

export class ShutdownAllSequencers {
  readonly _type: 'ShutdownAllSequencers' = 'ShutdownAllSequencers'
}

export class ShutdownSequenceComponent {
  readonly _type: 'ShutdownSequenceComponent' = 'ShutdownSequenceComponent'

  constructor(readonly prefix: Prefix) {}
}

export class ShutdownAllSequenceComponents {
  readonly _type: 'ShutdownAllSequenceComponents' = 'ShutdownAllSequenceComponents'
}
export class GetResources {
  readonly _type: 'GetResources' = 'GetResources'
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
