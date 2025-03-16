/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ComponentId, Prefix } from '../../../models'
import type { Level } from '../../logger'

export class GetLogMetadata {
  _type: 'GetLogMetadata' = 'GetLogMetadata' as const

  constructor(readonly componentId: ComponentId) {}
}

export class SetLogLevel {
  _type: 'SetLogLevel' = 'SetLogLevel' as const

  constructor(
    readonly componentId: ComponentId,
    readonly level: Level
  ) {}
}

export class Restart {
  _type: 'Restart' = 'Restart' as const

  constructor(readonly componentId: ComponentId) {}
}

export class GoOffline {
  _type: 'GoOffline' = 'GoOffline' as const

  constructor(readonly componentId: ComponentId) {}
}

export class GoOnline {
  _type: 'GoOnline' = 'GoOnline' as const

  constructor(readonly componentId: ComponentId) {}
}

export class Shutdown {
  _type: 'Shutdown' = 'Shutdown' as const

  constructor(readonly componentId: ComponentId) {}
}

export class GetComponentLifecycleState {
  _type: 'GetComponentLifecycleState' = 'GetComponentLifecycleState' as const

  constructor(readonly componentId: ComponentId) {}
}
export class GetContainerLifecycleState {
  _type: 'GetContainerLifecycleState' = 'GetContainerLifecycleState' as const

  constructor(readonly prefix: Prefix) {}
}
