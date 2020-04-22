import { ControlCommandType, ControlCommand, HttpCommand } from 'clients/command/models/PostCommand'
import { Http } from 'utils/Http'
import { GatewayCommand, GatewayCommandType } from 'clients/command/models/GatewayCommand'
import { ComponentId } from 'models/ComponentId'
import { ValidateResponse } from 'clients/command/models/CommandResponse'

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
