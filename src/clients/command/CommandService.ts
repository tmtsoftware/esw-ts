import {
  CommandServiceHttpMessage,
  Oneway,
  Query,
  Submit,
  Validate
} from 'clients/command/models/PostCommand'
import {
  CommandServiceWsMessage,
  QueryFinal,
  SubscribeCurrentState
} from 'clients/command/models/WsCommand'
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

  private componentCommand(msg: CommandServiceHttpMessage | CommandServiceWsMessage) {
    return new GatewayComponentCommand(this.componentId, msg)
  }

  validate(command: ControlCommand): Promise<ValidateResponse> {
    return this.httpTransport.requestRes<ValidateResponse>(
      this.componentCommand(new Validate(command))
    )
  }

  submit(command: ControlCommand): Promise<SubmitResponse> {
    return this.httpTransport.requestRes<SubmitResponse>(this.componentCommand(new Submit(command)))
  }

  oneway(command: ControlCommand): Promise<OneWayResponse> {
    return this.httpTransport.requestRes<OneWayResponse>(this.componentCommand(new Oneway(command)))
  }

  query(runId: string): Promise<SubmitResponse> {
    return this.httpTransport.requestRes<SubmitResponse>(this.componentCommand(new Query(runId)))
  }

  subscribeCurrentState(
    stateNames: Set<string>,
    onStateChange: (state: CurrentState) => void
  ): Subscription {
    const subscriptionResponse = resolveGateway().then(({ host, port }) =>
      new Ws(host, port).subscribe(
        this.componentCommand(new SubscribeCurrentState(stateNames)),
        onStateChange
      )
    )
    return {
      cancel: () => {
        return subscriptionResponse.then((response) => response.cancel())
      }
    }
  }

  async queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse> {
    const { host, port } = await resolveGateway()
    return new Ws(host, port).singleResponse(
      this.componentCommand(new QueryFinal(runId, timeoutInSeconds))
    )
  }
}
