import { ComponentId } from '../../../models'
import { GetLogMetadata, SetLogLevel } from '../../admin/models/PostCommand'
import { CommandServicePostMessage } from '../../command/models/PostCommand'
import { CommandServiceWsMessage } from '../../command/models/WsCommand'
import { GetEvent, PublishEvent } from '../../event/models/PostCommand'
import { Subscribe, SubscribeWithPattern } from '../../event/models/WsCommand'
import { Log } from '../../logger/models/PostCommand'
import { SequencerPostRequest } from '../../sequencer/models/PostCommand'
import { SequencerWebsocketRequest } from '../../sequencer/models/WsCommand'

export class GatewayComponentCommand<
  T extends CommandServicePostMessage | CommandServiceWsMessage
> {
  readonly _type: 'ComponentCommand' = 'ComponentCommand'

  constructor(readonly componentId: ComponentId, readonly command: T) {}
}

export class GatewaySequencerCommand<T extends SequencerPostRequest | SequencerWebsocketRequest> {
  readonly _type: 'SequencerCommand' = 'SequencerCommand'

  constructor(readonly componentId: ComponentId, readonly command: T) {}
}

export type GatewayEventPostRequest = PublishEvent | GetEvent

export type GatewayEventWsRequest = Subscribe | SubscribeWithPattern

export type GatewayLoggingPostRequest = Log

export type GatewayAdminPostRequest = GetLogMetadata | SetLogLevel
