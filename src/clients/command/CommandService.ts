import * as Req from 'clients/command/models/PostCommand'
import * as WsReq from 'clients/command/models/WsCommand'
import { GatewayComponentCommand } from 'clients/gateway/models/Gateway'
import { resolveGateway } from 'clients/gateway/resolveGateway'
import { ComponentId } from 'models/ComponentId'
import { ControlCommand } from 'models/params/Command'
import { OneWayResponse, SubmitResponse, ValidateResponse } from 'models/params/CommandResponse'
import { CurrentState } from 'models/params/CurrentState'
import { HttpTransport, TokenFactory } from 'utils/HttpTransport'
import { Subscription, Ws } from 'utils/Ws'

export interface CommandServiceApi {
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

export class CommandService implements CommandServiceApi {
  private readonly httpTransport: HttpTransport<GatewayComponentCommand>

  constructor(readonly componentId: ComponentId, readonly tokenFactory: TokenFactory) {
    this.httpTransport = new HttpTransport(resolveGateway, this.tokenFactory)
  }

  private componentCommand(msg: Req.CommandServiceHttpMessage | WsReq.CommandServiceWsMessage) {
    return new GatewayComponentCommand(this.componentId, msg)
  }

  private postComponentCmd<Res>(msg: Req.CommandServiceHttpMessage) {
    return this.httpTransport.requestRes<Res>(this.componentCommand(msg))
  }

  validate(command: ControlCommand): Promise<ValidateResponse> {
    return this.postComponentCmd(new Req.Validate(command))
  }

  submit(command: ControlCommand): Promise<SubmitResponse> {
    return this.postComponentCmd(new Req.Submit(command))
  }

  oneway(command: ControlCommand): Promise<OneWayResponse> {
    return this.postComponentCmd(new Req.Oneway(command))
  }

  query(runId: string): Promise<SubmitResponse> {
    return this.postComponentCmd(new Req.Query(runId))
  }

  private async ws(): Promise<Ws<GatewayComponentCommand>> {
    const { host, port } = await resolveGateway()
    return new Ws(host, port)
  }

  private async subscribe(stateNames: Set<string>, onStateChange: (state: CurrentState) => void) {
    return (await this.ws()).subscribe(
      this.componentCommand(new WsReq.SubscribeCurrentState(stateNames)),
      onStateChange
    )
  }

  subscribeCurrentState(
    stateNames: Set<string>,
    onStateChange: (state: CurrentState) => void
  ): Subscription {
    const subscriptionResponse = this.subscribe(stateNames, onStateChange)
    return {
      cancel: async () => {
        const response = await subscriptionResponse
        return response.cancel()
      }
    }
  }

  async queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse> {
    return (await this.ws()).singleResponse(
      this.componentCommand(new WsReq.QueryFinal(runId, timeoutInSeconds))
    )
  }
}
