import { ComponentId } from 'models/ComponentId'
import { CommandServiceHttpMessage } from 'clients/command/models/PostCommand'
import { CommandServiceWsMessage } from 'clients/command/models/WsCommand'
import { SequencerPostRequest } from 'clients/sequencer/models/PostCommand'

export interface GatewayComponentCommand {
  _type: 'ComponentCommand'
  componentId: ComponentId
  command: CommandServiceHttpMessage | CommandServiceWsMessage
}

export interface GatewaySequencerCommand {
  _type: 'SequencerCommand'
  componentId: ComponentId
  command: SequencerPostRequest
}

export const GatewayComponentCommand = (
  componentId: ComponentId,
  command: CommandServiceHttpMessage | CommandServiceWsMessage
): GatewayComponentCommand => {
  return {
    _type: 'ComponentCommand',
    componentId,
    command
  }
}

export const GatewaySequencerCommand = (
  componentId: ComponentId,
  sequencerCommand: SequencerPostRequest
): GatewaySequencerCommand => {
  return {
    _type: 'SequencerCommand',
    componentId,
    command: sequencerCommand
  }
}
