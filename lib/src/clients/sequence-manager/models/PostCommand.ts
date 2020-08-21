import { ObsMode } from './ObsMode'
import { ProvisionConfig } from './ProvisionConfig'
import { Prefix, Subsystem } from '../../../models'

export class Configure {
  readonly _type: 'Configure' = 'Configure'
  constructor(readonly obsMode: ObsMode) {}
}

export class Provision {
  readonly _type: 'Provision' = 'Provision'
  constructor(readonly config: ProvisionConfig) {}
}

export class GetRunningObsModes {
  readonly _type: 'GetRunningObsModes' = 'GetRunningObsModes'
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

export class GetAgentStatus {
  readonly _type: 'GetAgentStatus' = 'GetAgentStatus'
}

export type SequenceManagerPostRequest =
  | Configure
  | Provision
  | GetRunningObsModes
  | StartSequencer
  | RestartSequencer
  | ShutdownSequencer
  | ShutdownSubsystemSequencers
  | ShutdownObsModeSequencers
  | ShutdownAllSequencers
  | ShutdownSequenceComponent
  | ShutdownAllSequenceComponents
  | GetAgentStatus
