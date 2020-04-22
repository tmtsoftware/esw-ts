import { ComponentId } from 'models/ComponentId'
import { HttpCommand } from 'clients/command/models/PostCommand'
import { WebsocketCommand } from 'clients/command/models/WsCommand'

export enum GatewayCommandType {
  ComponentCommand = 'ComponentCommand',
}

export interface GatewayCommand {
  _type: GatewayCommandType
  componentId: ComponentId
  command: HttpCommand | WebsocketCommand
}
