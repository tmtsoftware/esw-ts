import { Oneway, Query, Submit, Validate } from 'clients/command/models/PostCommand'
import { QueryFinal, SubscribeCurrentState } from 'clients/command/models/WsCommand'
import { GatewayComponentCommand } from 'clients/gateway/models/Gateway'
import { ComponentId } from 'models/ComponentId'
import { ControlCommand } from 'models/params/Command'
import { OneWayResponse, SubmitResponse, ValidateResponse } from 'models/params/CommandResponse'
import { CurrentState } from 'models/params/CurrentState'
import { post } from 'utils/Http'
import { Subscription, Ws } from 'utils/Ws'

export interface CommandService {
  validate(command: ControlCommand): Promise<ValidateResponse>
  submit(command: ControlCommand): Promise<SubmitResponse>
  oneway(command: ControlCommand): Promise<OneWayResponse>
  query(runId: string): Promise<SubmitResponse>

  queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse>
  subscribeCurrentState(
    stateNames: Set<string>,
    onStateChange: (state: CurrentState) => void
  ): Subscription
}

export class CommandService implements CommandService {
  constructor(readonly host: string, readonly port: number, readonly componentId: ComponentId) {}

  httpPost<T>(gatewayCommand: GatewayComponentCommand): Promise<T> {
    return post<GatewayComponentCommand, T>(this.host, this.port, gatewayCommand)
  }

  async validate(command: ControlCommand): Promise<ValidateResponse> {
    return this.httpPost<ValidateResponse>(
      GatewayComponentCommand(this.componentId, new Validate(command))
    )
  }

  async submit(command: ControlCommand): Promise<SubmitResponse> {
    return this.httpPost<SubmitResponse>(
      GatewayComponentCommand(this.componentId, new Submit(command))
    )
  }

  async oneway(command: ControlCommand): Promise<OneWayResponse> {
    return this.httpPost<OneWayResponse>(
      GatewayComponentCommand(this.componentId, new Oneway(command))
    )
  }

  async query(runId: string): Promise<SubmitResponse> {
    return this.httpPost<SubmitResponse>(
      GatewayComponentCommand(this.componentId, new Query(runId))
    )
  }

  subscribeCurrentState(
    stateNames: Set<string>,
    onStateChange: (state: CurrentState) => void
  ): Subscription {
    return new Ws(this.host, this.port).sendThenSubscribe(
      GatewayComponentCommand(this.componentId, new SubscribeCurrentState(stateNames)),
      onStateChange
    )
  }

  async queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse> {
    return new Promise<SubmitResponse>((resolve) => {
      new Ws(this.host, this.port).sendThenSubscribe(
        GatewayComponentCommand(this.componentId, new QueryFinal(runId, timeoutInSeconds)),
        (submitResponse: SubmitResponse) => {
          resolve(submitResponse)
        }
      )
    })
  }
}
