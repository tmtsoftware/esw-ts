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
import { post } from 'utils/Http'
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
  ): Promise<Subscription>
}

export class CommandService implements CommandServiceApi {
  constructor(readonly componentId: ComponentId) {}

  private componentCommand = (msg: CommandServiceHttpMessage | CommandServiceWsMessage) =>
    new GatewayComponentCommand(this.componentId, msg)

  private httpPost = <T>(gatewayCommand: GatewayComponentCommand): Promise<T> =>
    resolveGateway().then(({ host, port }) =>
      post<GatewayComponentCommand, T>(host, port, gatewayCommand)
    )

  async validate(command: ControlCommand): Promise<ValidateResponse> {
    return this.httpPost<ValidateResponse>(this.componentCommand(new Validate(command)))
  }

  async submit(command: ControlCommand): Promise<SubmitResponse> {
    return this.httpPost<SubmitResponse>(this.componentCommand(new Submit(command)))
  }

  async oneway(command: ControlCommand): Promise<OneWayResponse> {
    return this.httpPost<OneWayResponse>(this.componentCommand(new Oneway(command)))
  }

  async query(runId: string): Promise<SubmitResponse> {
    return this.httpPost<SubmitResponse>(this.componentCommand(new Query(runId)))
  }

  async subscribeCurrentState(
    stateNames: Set<string>,
    onStateChange: (state: CurrentState) => void
  ): Promise<Subscription> {
    const { host, port } = await resolveGateway()
    return new Ws(host, port).subscribe(
      this.componentCommand(new SubscribeCurrentState(stateNames)),
      onStateChange
    )
  }

  async queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse> {
    const { host, port } = await resolveGateway()
    return new Ws(host, port).singleResponse(
      this.componentCommand(new QueryFinal(runId, timeoutInSeconds))
    )
  }
}
