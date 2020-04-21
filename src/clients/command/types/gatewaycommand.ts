import { ComponentId } from '../../common/componentId'
import { HttpCommandMessage } from './httpCommand'
import { WebsocketCommandMessage } from './websocketcommand'

export enum GatewayCommandType {
  ComponentCommand = 'ComponentCommand',
}

export interface GatewayCommand {
  _type: GatewayCommandType
  componentId: ComponentId
  command: HttpCommandMessage | WebsocketCommandMessage
}
