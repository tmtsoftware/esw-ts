import { ComponentId } from 'models/ComponentId'
import { ControlCommand, Oneway, Query, Submit, Validate } from 'clients/command/models/PostCommand'
import { GatewayCommand, GatewayComponentCommand } from 'clients/command/models/GatewayCommand'
import { QueryFinal, SubscribeCurrentState } from 'clients/command/models/WsCommand'

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
