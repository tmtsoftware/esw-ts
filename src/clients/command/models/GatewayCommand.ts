import { ComponentId } from 'models/ComponentId'
import { CommandServiceHttpMessage } from 'clients/command/models/PostCommand'
import { CommandServiceWsMessage } from 'clients/command/models/WsCommand'

export type GatewayCommand = {
  _type: 'ComponentCommand'
  componentId: ComponentId
  command: CommandServiceHttpMessage | CommandServiceWsMessage
}

export const GatewayComponentCommand = (
  componentId: ComponentId,
  commandHttpMsg: CommandServiceHttpMessage | CommandServiceWsMessage
): GatewayCommand => {
  return {
    _type: 'ComponentCommand',
    componentId,
    command: commandHttpMsg
  }
}
