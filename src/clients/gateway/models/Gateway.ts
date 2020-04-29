import { CommandServiceHttpMessage } from 'clients/command/models/PostCommand'
import { CommandServiceWsMessage } from 'clients/command/models/WsCommand'
import { SequencerPostRequest } from 'clients/sequencer/models/PostCommand'
import { ComponentId } from 'models/ComponentId'
import { SequencerWebsocketRequest } from 'clients/sequencer/models/WsCommand'

export interface GatewayComponentCommand {
  _type: 'ComponentCommand'
  componentId: ComponentId
  command: CommandServiceHttpMessage | CommandServiceWsMessage
}

export interface GatewaySequencerCommand {
  _type: 'SequencerCommand'
  componentId: ComponentId
  command: SequencerPostRequest | SequencerWebsocketRequest
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
