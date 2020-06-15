import { CommandServiceHttpMessage } from '../../command/models/PostCommand'
import { CommandServiceWsMessage } from '../../command/models/WsCommand'
import { SequencerPostRequest } from '../../sequencer/models/PostCommand'
import { SequencerWebsocketRequest } from '../../sequencer/models/WsCommand'
import { ComponentId } from '../../../models'

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
