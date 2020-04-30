import { CommandServiceHttpMessage } from 'clients/command/models/PostCommand'
import { CommandServiceWsMessage } from 'clients/command/models/WsCommand'
import { SequencerPostRequest } from 'clients/sequencer/models/PostCommand'
import { SequencerWebsocketRequest } from 'clients/sequencer/models/WsCommand'
import { ComponentId } from 'models/ComponentId'

export interface GatewayComponentCommand {
  readonly _type: 'ComponentCommand'
  readonly componentId: ComponentId
  readonly command: CommandServiceHttpMessage | CommandServiceWsMessage
}

export interface GatewaySequencerCommand {
  readonly _type: 'SequencerCommand'
  readonly componentId: ComponentId
  readonly command: SequencerPostRequest | SequencerWebsocketRequest
}

export const GatewayComponentCommand = (
  componentId: ComponentId,
  command: CommandServiceHttpMessage | CommandServiceWsMessage
): GatewayComponentCommand => ({ _type: 'ComponentCommand', componentId, command })

export const GatewaySequencerCommand = (
  componentId: ComponentId,
  sequencerCommand: SequencerPostRequest | SequencerWebsocketRequest
): GatewaySequencerCommand => ({
  _type: 'SequencerCommand',
  componentId,
  command: sequencerCommand
})
