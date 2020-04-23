import { ComponentId } from 'models/ComponentId'
import { CommandServiceHttpMessage } from 'clients/command/models/PostCommand'
import { CommandServiceWsMessage } from 'clients/command/models/WsCommand'

export enum GatewayCommandType {
  ComponentCommand = 'ComponentCommand'
}

export interface GatewayCommand {
  _type: GatewayCommandType
  componentId: ComponentId
  command: CommandServiceHttpMessage | CommandServiceWsMessage
}
