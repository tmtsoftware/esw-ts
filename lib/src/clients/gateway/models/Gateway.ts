import { CommandServiceHttpMessage } from '../../command/models/PostCommand'
import { CommandServiceWsMessage } from '../../command/models/WsCommand'
import { SequencerPostRequest } from '../../sequencer/models/PostCommand'
import { SequencerWebsocketRequest } from '../../sequencer/models/WsCommand'
import { ComponentId } from '../../../models'
import { Event, EventKey } from '../../event'

export class GatewayComponentCommand {
  readonly _type: 'ComponentCommand' = 'ComponentCommand'

  constructor(
    readonly componentId: ComponentId,
    readonly command: CommandServiceHttpMessage | CommandServiceWsMessage
  ) {}
}

export class GatewaySequencerCommand {
  readonly _type: 'SequencerCommand' = 'SequencerCommand'

  constructor(
    readonly componentId: ComponentId,
    readonly command: SequencerPostRequest | SequencerWebsocketRequest
  ) {}
}

export class GatewayPublishEvent {
  readonly _type: 'PublishEvent' = 'PublishEvent'

  constructor(readonly event: Event) {}
}

export class GatewayGetEvent {
  readonly _type: 'GetEvent' = 'GetEvent'

  constructor(readonly eventKeys: Set<EventKey>) {}
}

export type GatewayEventPostRequest = GatewayPublishEvent | GatewayGetEvent
