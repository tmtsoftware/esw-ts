import type { ComponentId, Prefix } from '../../../models'
import type { Level } from '../../logger'

export class GetLogMetadata {
  readonly _type: 'GetLogMetadata' = 'GetLogMetadata'

  constructor(readonly componentId: ComponentId) {}
}

export class SetLogLevel {
  readonly _type: 'SetLogLevel' = 'SetLogLevel'

  constructor(readonly componentId: ComponentId, readonly level: Level) {}
}

export class Restart {
  readonly _type: 'Restart' = 'Restart'

  constructor(readonly componentId: ComponentId) {}
}

export class GoOffline {
  readonly _type: 'GoOffline' = 'GoOffline'

  constructor(readonly componentId: ComponentId) {}
}

export class GoOnline {
  readonly _type: 'GoOnline' = 'GoOnline'

  constructor(readonly componentId: ComponentId) {}
}

export class Shutdown {
  readonly _type: 'Shutdown' = 'Shutdown'

  constructor(readonly componentId: ComponentId) {}
}

export class GetComponentLifecycleState {
  readonly _type: 'GetComponentLifecycleState' = 'GetComponentLifecycleState'

  constructor(readonly componentId: ComponentId) {}
}
export class GetContainerLifecycleState {
  readonly _type: 'GetContainerLifecycleState' = 'GetContainerLifecycleState'

  constructor(readonly prefix: Prefix) {}
}
