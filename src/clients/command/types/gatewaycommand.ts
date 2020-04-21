import { ComponentId } from '../../common/componentId'
import { HttpCommand } from './httpCommand'
import { WebsocketCommand } from './websocketcommand'

export enum GatewayCommandType {
  ComponentCommand = 'ComponentCommand',
}

export interface GatewayCommand {
  _type: GatewayCommandType
  componentId: ComponentId
  command: HttpCommand | WebsocketCommand
}
