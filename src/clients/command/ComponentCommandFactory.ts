import { ComponentId } from 'models/ComponentId'
import { Oneway, Query, Submit, Validate } from 'clients/command/models/PostCommand'
import { QueryFinal, SubscribeCurrentState } from 'clients/command/models/WsCommand'
import { ControlCommand } from 'models/params/Command'
import { GatewayComponentCommand } from 'clients/gateway/models/Gateway'

export class ComponentCommandFactory {
  constructor(readonly componentId: ComponentId) {}

  validate(command: ControlCommand): GatewayComponentCommand {
    return GatewayComponentCommand(this.componentId, Validate(command))
  }

  submit(command: ControlCommand): GatewayComponentCommand {
    return GatewayComponentCommand(this.componentId, Submit(command))
  }

  oneway(command: ControlCommand): GatewayComponentCommand {
    return GatewayComponentCommand(this.componentId, Oneway(command))
  }

  query(runId: string): GatewayComponentCommand {
    return GatewayComponentCommand(this.componentId, Query(runId))
  }

  queryFinal(runId: string, timeoutInSeconds: number): GatewayComponentCommand {
    return GatewayComponentCommand(this.componentId, QueryFinal(runId, timeoutInSeconds))
  }

  subscribeCurrentState(stateNames: Set<string>): GatewayComponentCommand {
    return GatewayComponentCommand(this.componentId, SubscribeCurrentState(stateNames))
  }
}
