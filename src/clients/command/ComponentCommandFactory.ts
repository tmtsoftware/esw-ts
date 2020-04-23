import { ComponentId } from 'models/ComponentId'
import {
  CommandServiceHttpMessage,
  ControlCommand,
  QueryCommand
} from 'clients/command/models/PostCommand'
import { GatewayCommand, GatewayCommandType } from 'clients/command/models/GatewayCommand'

const GatewayComponentCommand = (
  componentId: ComponentId,
  commandHttpMsg: CommandServiceHttpMessage
): GatewayCommand => {
  return {
    _type: GatewayCommandType.ComponentCommand,
    componentId,
    command: commandHttpMsg
  }
}

const controlCmd = (
  _type: 'Validate' | 'Submit' | 'Oneway',
  command: ControlCommand
): CommandServiceHttpMessage => {
  return {
    _type,
    command
  }
}

const queryCmd = (runId: string): QueryCommand => {
  return {
    _type: 'Query',
    runId
  }
}

export class ComponentCommandFactory {
  constructor(readonly componentId: ComponentId) {}

  validate(command: ControlCommand): GatewayCommand {
    return GatewayComponentCommand(this.componentId, controlCmd('Validate', command))
  }

  submit(command: ControlCommand): GatewayCommand {
    return GatewayComponentCommand(this.componentId, controlCmd('Submit', command))
  }

  oneway(command: ControlCommand): GatewayCommand {
    return GatewayComponentCommand(this.componentId, controlCmd('Oneway', command))
  }

  query(runId: string): GatewayCommand {
    return GatewayComponentCommand(this.componentId, queryCmd(runId))
  }
}
