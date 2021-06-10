import type { Subscription } from '../..'
import { OnewayResponseD, SubmitResponseD, ValidateResponseD } from '../../decoders/CommandDecoders'
import { CurrentStateD } from '../../decoders/CurrentStateDecoder'
import type { Decoder } from '../../decoders/Decoder'
import type * as M from '../../models'
import { isNegative, ServiceError } from '../../models'
import type { HttpTransport } from '../../utils/HttpTransport'
import type { Ws } from '../../utils/Ws'
import { GatewayComponentCommand } from '../gateway/models/Gateway'
import type { CommandService } from './CommandService'
import * as Req from './models/PostCommand'
import * as WsReq from './models/WsCommand'

export class CommandServiceImpl implements CommandService {
  constructor(
    private readonly componentId: M.ComponentId,
    private readonly httpTransport: HttpTransport<
      GatewayComponentCommand<Req.CommandServicePostMessage>
    >,
    private readonly ws: () => Ws<GatewayComponentCommand<WsReq.CommandServiceWsMessage>>
  ) {}

  private componentPostCommand(msg: Req.CommandServicePostMessage) {
    return new GatewayComponentCommand(this.componentId, msg)
  }

  private componentWsCommand(msg: WsReq.CommandServiceWsMessage) {
    return new GatewayComponentCommand(this.componentId, msg)
  }

  private postComponentCmd<Res>(msg: Req.CommandServicePostMessage, decoder: Decoder<Res>) {
    return this.httpTransport.requestRes<Res>(this.componentPostCommand(msg), decoder)
  }

  validate(command: M.ControlCommand): Promise<M.ValidateResponse> {
    return this.postComponentCmd(new Req.Validate(command), ValidateResponseD)
  }

  submit(command: M.ControlCommand): Promise<M.SubmitResponse> {
    return this.postComponentCmd(new Req.Submit(command), SubmitResponseD)
  }

  oneway(command: M.ControlCommand): Promise<M.OnewayResponse> {
    return this.postComponentCmd(new Req.Oneway(command), OnewayResponseD)
  }

  query(runId: string): Promise<M.SubmitResponse> {
    return this.postComponentCmd(new Req.Query(runId), SubmitResponseD)
  }

  private subscribe(
    stateNames: Set<string>,
    onStateChange: (state: M.CurrentState) => void,
    onError?: (error: ServiceError) => void
  ): Subscription {
    return this.ws().subscribe(
      this.componentWsCommand(new WsReq.SubscribeCurrentState(stateNames)),
      onStateChange,
      CurrentStateD,
      onError
    )
  }

  subscribeCurrentState =
    (stateNames: Set<string>) =>
    (
      onStateChange: (state: M.CurrentState) => void,
      onError?: (error: ServiceError) => void
    ): Subscription => {
      const subscriptionResponse = this.subscribe(stateNames, onStateChange, onError)
      return {
        cancel: async () => {
          const response = await subscriptionResponse
          return response.cancel()
        }
      }
    }

  queryFinal(runId: string, timeoutInSeconds: number): Promise<M.SubmitResponse> {
    return this.ws().singleResponse(
      this.componentWsCommand(new WsReq.QueryFinal(runId, timeoutInSeconds)),
      SubmitResponseD
    )
  }

  async submitAndWait(
    command: M.ControlCommand,
    timeoutInSeconds: number
  ): Promise<M.SubmitResponse> {
    const submitResponse = await this.submit(command)
    if (submitResponse._type === 'Started') {
      return this.queryFinal(submitResponse.runId, timeoutInSeconds)
    } else return Promise.resolve(submitResponse)
  }

  async submitAllAndWait(
    commands: M.ControlCommand[],
    timeoutInSeconds: number
  ): Promise<M.SubmitResponse[]> {
    const responses: M.SubmitResponse[] = []
    let latestResponse: M.SubmitResponse
    for (const command of commands) {
      latestResponse = await this.submitAndWait(command, timeoutInSeconds)
      if (isNegative(latestResponse)) break
      else responses.push(latestResponse)
    }
    return Promise.resolve(responses)
  }
}
