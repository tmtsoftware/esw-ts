import { ComponentId } from '../../../models/ComponentId'
import { HttpCommand } from './PostCommand'
import { WebsocketCommand } from './WsCommand'

export enum GatewayCommandType {
  ComponentCommand = 'ComponentCommand',
}

export interface GatewayCommand {
  _type: GatewayCommandType
  componentId: ComponentId
  command: HttpCommand | WebsocketCommand
}
