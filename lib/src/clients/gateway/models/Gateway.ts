import { CommandServicePostMessage } from '../../command/models/PostCommand'
import { CommandServiceWsMessage } from '../../command/models/WsCommand'
import { SequencerPostRequest } from '../../sequencer/models/PostCommand'
import { SequencerWebsocketRequest } from '../../sequencer/models/WsCommand'
import { ComponentId } from '../../../models'
import { Subscribe, SubscribeWithPattern, GetEvent, PublishEvent } from '../../event'
import { Log } from '../../logger/models/PostCommand'

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
