import { ControlCommandType, ControlCommand, HttpCommand } from './types/httpCommand'
import { Http } from '../../utils/Http'
import { GatewayCommand, GatewayCommandType } from './types/gatewaycommand'
import { ComponentId } from '../common/componentId'
import { ValidateResponse } from './types/response'

export interface CommandClient {
  validate(controlCommand: ControlCommand): Promise<ValidateResponse>
}

const getHttpCommand = (type: ControlCommandType, controlCommand: ControlCommand): HttpCommand => {
  return {
    _type: type,
    controlCommand,
  }
}

const getGatewayCommand = (
  commandType: ControlCommandType,
  componentId: ComponentId,
  controlCommand: ControlCommand,
): GatewayCommand => {
  return {
    _type: GatewayCommandType.ComponentCommand,
    componentId,
    command: getHttpCommand(commandType, controlCommand),
  }
}

export const CommandClient = (
  host: string,
  port: number,
  componentId: ComponentId,
): CommandClient => {
  const validate = async (controlCommand: ControlCommand) => {
    const gatewayCommand: GatewayCommand = getGatewayCommand(
      'Validate',
      componentId,
      controlCommand,
    )
    return Http.post<ValidateResponse>(host, port, gatewayCommand)
  }

  return { validate }
}
