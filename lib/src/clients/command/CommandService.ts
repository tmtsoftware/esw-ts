import type { TokenFactory } from '../../'
import * as M from '../../models'
import { Decoder } from '../../utils/Decoder'
import { HttpTransport } from '../../utils/HttpTransport'
import { Subscription, Ws } from '../../utils/Ws'
import { GatewayComponentCommand } from '../gateway/models/Gateway'
import { resolveGateway } from '../gateway/ResolveGateway'
import * as Req from './models/PostCommand'
import * as WsReq from './models/WsCommand'

export interface CommandService {
  validate(command: M.ControlCommand): Promise<M.ValidateResponse>

  submit(command: M.ControlCommand): Promise<M.SubmitResponse>

  oneway(command: M.ControlCommand): Promise<M.OnewayResponse>

  query(runId: string): Promise<M.SubmitResponse>

  queryFinal(runId: string, timeoutInSeconds: number): Promise<M.SubmitResponse>

  subscribeCurrentState(
    stateNames: Set<string>
  ): (onStateChange: (state: M.CurrentState) => void) => Subscription
}

export const CommandService = async (
  componentId: M.ComponentId,
  tokenFactory: TokenFactory
): Promise<CommandService> => {
  const { host, port } = await resolveGateway()
  const url = `http://${host}:${port}/post-endpoint`
  return new CommandServiceImpl(componentId, new HttpTransport(url, tokenFactory))
}

export class CommandServiceImpl implements CommandService {
  constructor(
    private readonly componentId: M.ComponentId,
    private readonly httpTransport: HttpTransport<GatewayComponentCommand>
  ) {}

  private componentCommand(msg: Req.CommandServiceHttpMessage | WsReq.CommandServiceWsMessage) {
    return new GatewayComponentCommand(this.componentId, msg)
  }

  private postComponentCmd<Res>(msg: Req.CommandServiceHttpMessage, decoder: Decoder<Res>) {
    return this.httpTransport.requestRes<Res>(this.componentCommand(msg), decoder)
  }

  validate(command: M.ControlCommand): Promise<M.ValidateResponse> {
    return this.postComponentCmd(new Req.Validate(command), M.ValidateResponse)
  }

  submit(command: M.ControlCommand): Promise<M.SubmitResponse> {
    return this.postComponentCmd(new Req.Submit(command), M.SubmitResponse)
  }

  oneway(command: M.ControlCommand): Promise<M.OnewayResponse> {
    return this.postComponentCmd(new Req.Oneway(command), M.OnewayResponse)
  }

  query(runId: string): Promise<M.SubmitResponse> {
    return this.postComponentCmd(new Req.Query(runId), M.SubmitResponse)
  }

  private async ws(): Promise<Ws<GatewayComponentCommand>> {
    const { host, port } = await resolveGateway()
    return new Ws(host, port)
  }

  private async subscribe(stateNames: Set<string>, onStateChange: (state: M.CurrentState) => void) {
    return (await this.ws()).subscribe(
      this.componentCommand(new WsReq.SubscribeCurrentState(stateNames)),
      onStateChange,
      M.CurrentState
    )
  }

  subscribeCurrentState = (stateNames: Set<string>) => (
    onStateChange: (state: M.CurrentState) => void
  ): Subscription => {
    const subscriptionResponse = this.subscribe(stateNames, onStateChange)
    return {
      cancel: async () => {
        const response = await subscriptionResponse
        return response.cancel()
      }
    }
  }

  async queryFinal(runId: string, timeoutInSeconds: number): Promise<M.SubmitResponse> {
    return (await this.ws()).singleResponse(
      this.componentCommand(new WsReq.QueryFinal(runId, timeoutInSeconds)),
      M.SubmitResponse
    )
  }
}
