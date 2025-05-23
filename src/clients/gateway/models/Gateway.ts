/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ComponentId } from '../../../models'
import type {
  GetComponentLifecycleState,
  GetContainerLifecycleState,
  GetLogMetadata,
  GoOffline,
  GoOnline,
  Restart,
  SetLogLevel,
  Shutdown
} from '../../admin/models/PostCommand'
import type { CommandServicePostMessage } from '../../command/models/PostCommand'
import type { CommandServiceWsMessage } from '../../command/models/WsCommand'
import type { GetEvent, PublishEvent } from '../../event/models/PostCommand'
import type { Subscribe, SubscribeObserveEvents, SubscribeWithPattern } from '../../event/models/WsCommand'
import type { Log } from '../../logger/models/PostCommand'
import type { SequencerPostRequest } from '../../sequencer/models/PostCommand'
import type { SequencerWebsocketRequest } from '../../sequencer/models/WsCommand'

export class GatewayComponentCommand<T extends CommandServicePostMessage | CommandServiceWsMessage> {
  _type: 'ComponentCommand' = 'ComponentCommand' as const

  constructor(
    readonly componentId: ComponentId,
    readonly command: T
  ) {}
}

export class GatewaySequencerCommand<T extends SequencerPostRequest | SequencerWebsocketRequest> {
  _type: 'SequencerCommand' = 'SequencerCommand' as const

  constructor(
    readonly componentId: ComponentId,
    readonly command: T
  ) {}
}

export type GatewayEventPostRequest = PublishEvent | GetEvent
export type GatewayEventWsRequest = Subscribe | SubscribeWithPattern | SubscribeObserveEvents

export type GatewayLoggingPostRequest = Log

export type GatewayAdminPostRequest =
  | GetLogMetadata
  | SetLogLevel
  | Restart
  | Shutdown
  | GetComponentLifecycleState
  | GetContainerLifecycleState
  | GoOffline
  | GoOnline
