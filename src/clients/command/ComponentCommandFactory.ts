import { ComponentId } from 'models/ComponentId'
import {
  CommandServiceHttpMessage,
  ControlCommand,
  Validate,
  Submit,
  Oneway,
  Query
} from 'clients/command/models/PostCommand'
import { GatewayCommand, GatewayCommandType } from 'clients/command/models/GatewayCommand'
import {
  QueryFinal,
  CommandServiceWsMessage,
  SubscribeCurrentState
} from 'clients/command/models/WsCommand'

const GatewayComponentCommand = (
  componentId: ComponentId,
  commandHttpMsg: CommandServiceHttpMessage | CommandServiceWsMessage
): GatewayCommand => {
  return {
    _type: GatewayCommandType.ComponentCommand,
    componentId,
    command: commandHttpMsg
  }
}

export class ComponentCommandFactory {
  constructor(readonly componentId: ComponentId) {}

  validate(command: ControlCommand): GatewayCommand {
    return GatewayComponentCommand(this.componentId, Validate(command))
  }

  submit(command: ControlCommand): GatewayCommand {
    return GatewayComponentCommand(this.componentId, Submit(command))
  }

  oneway(command: ControlCommand): GatewayCommand {
    return GatewayComponentCommand(this.componentId, Oneway(command))
  }

  query(runId: string): GatewayCommand {
    return GatewayComponentCommand(this.componentId, Query(runId))
  }

  queryFinal(runId: string, timeoutInSeconds: number): GatewayCommand {
    return GatewayComponentCommand(this.componentId, QueryFinal(runId, timeoutInSeconds))
  }

  subscribeCurrentState(stateNames: Set<string>): GatewayCommand {
    return GatewayComponentCommand(this.componentId, SubscribeCurrentState(stateNames))
  }
}
