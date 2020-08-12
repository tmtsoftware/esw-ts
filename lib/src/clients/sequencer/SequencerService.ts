import * as D from 'io-ts/lib/Decoder'
import type { TokenFactory } from '../..'
import { ComponentId, SequenceCommand, SubmitResponse } from '../../models'
import { Decoder } from '../../utils/Decoder'
import { HttpTransport } from '../../utils/HttpTransport'
import { Ws } from '../../utils/Ws'
import { QueryFinal } from '../command/models/WsCommand'
import { GatewaySequencerCommand } from '../gateway/models/Gateway'
import { resolveGateway } from '../gateway/ResolveGateway'
import * as Req from './models/PostCommand'
import * as Res from './models/SequencerRes'
import { OptionOfStepList, StepList } from './models/StepList'
import { SequencerWebsocketRequest } from './models/WsCommand'
import { Option } from '../../utils/Option'
import { getOptionValue, getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { WebSocketTransport } from '../../utils/WebSocketTransport'

export interface SequencerService {
  loadSequence(sequence: SequenceCommand[]): Promise<Res.OkOrUnhandledResponse>
  startSequence(): Promise<SubmitResponse>
  add(commands: SequenceCommand[]): Promise<Res.OkOrUnhandledResponse>
  prepend(commands: SequenceCommand[]): Promise<Res.OkOrUnhandledResponse>
  replace(id: string, commands: SequenceCommand[]): Promise<Res.GenericResponse>
  insertAfter(id: string, commands: SequenceCommand[]): Promise<Res.GenericResponse>
  delete(id: string): Promise<Res.GenericResponse>
  addBreakpoint(id: string): Promise<Res.GenericResponse>
  removeBreakpoint(id: string): Promise<Res.RemoveBreakpointResponse>
  reset(): Promise<Res.OkOrUnhandledResponse>
  resume(): Promise<Res.OkOrUnhandledResponse>
  pause(): Promise<Res.PauseResponse>
  getSequence(): Promise<Option<StepList>>
  isAvailable(): Promise<boolean>
  isOnline(): Promise<boolean>
  goOnline(): Promise<Res.GoOnlineResponse>
  goOffline(): Promise<Res.GoOfflineResponse>
  abortSequence(): Promise<Res.OkOrUnhandledResponse>
  stop(): Promise<Res.OkOrUnhandledResponse>
  diagnosticMode(startTime: Date, hint: string): Promise<Res.DiagnosticModeResponse>
  operationsMode(): Promise<Res.OperationsModeResponse>

  // websocket api
  queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse>
}

export const SequencerService = async (componentId: ComponentId, tokenFactory: TokenFactory) => {
  const { host, port } = await resolveGateway()
  const postEndpoint = getPostEndPoint({ host, port })
  const webSocketEndpoint = getWebSocketEndPoint({ host, port })

  return new SequencerServiceImpl(componentId, new HttpTransport(postEndpoint, tokenFactory), () =>
    WebSocketTransport(webSocketEndpoint)
  )
}

export class SequencerServiceImpl implements SequencerService {
  constructor(
    readonly componentId: ComponentId,
    private readonly httpTransport: HttpTransport<
      GatewaySequencerCommand<Req.SequencerPostRequest>
    >,
    private readonly ws: () => Ws<GatewaySequencerCommand<SequencerWebsocketRequest>>
  ) {}

  private sequencerCommand(request: Req.SequencerPostRequest) {
    return new GatewaySequencerCommand(this.componentId, request)
  }

  private postSequencerCmd<Res>(
    request: Req.SequencerPostRequest,
    decoder: Decoder<Res>
  ): Promise<Res> {
    return this.httpTransport.requestRes(this.sequencerCommand(request), decoder)
  }

  loadSequence(sequence: SequenceCommand[]): Promise<Res.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.LoadSequence(sequence), Res.OkOrUnhandledResponse)
  }

  startSequence(): Promise<SubmitResponse> {
    return this.postSequencerCmd(new Req.StartSequence(), SubmitResponse)
  }

  add(commands: SequenceCommand[]): Promise<Res.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.Add(commands), Res.OkOrUnhandledResponse)
  }

  prepend(commands: SequenceCommand[]): Promise<Res.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.Prepend(commands), Res.OkOrUnhandledResponse)
  }

  replace(id: string, commands: SequenceCommand[]): Promise<Res.GenericResponse> {
    return this.postSequencerCmd(new Req.Replace(id, commands), Res.GenericResponse)
  }

  insertAfter(id: string, commands: SequenceCommand[]): Promise<Res.GenericResponse> {
    return this.postSequencerCmd(new Req.InsertAfter(id, commands), Res.GenericResponse)
  }

  delete(id: string): Promise<Res.GenericResponse> {
    return this.postSequencerCmd(new Req.Delete(id), Res.GenericResponse)
  }

  addBreakpoint(id: string): Promise<Res.GenericResponse> {
    return this.postSequencerCmd(new Req.AddBreakpoint(id), Res.GenericResponse)
  }

  removeBreakpoint(id: string): Promise<Res.RemoveBreakpointResponse> {
    return this.postSequencerCmd(new Req.RemoveBreakpoint(id), Res.RemoveBreakpointResponse)
  }

  reset(): Promise<Res.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.Reset(), Res.OkOrUnhandledResponse)
  }

  resume(): Promise<Res.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.Resume(), Res.OkOrUnhandledResponse)
  }

  pause(): Promise<Res.PauseResponse> {
    return this.postSequencerCmd(new Req.Pause(), Res.PauseResponse)
  }

  async getSequence(): Promise<Option<StepList>> {
    return getOptionValue(await this.postSequencerCmd(new Req.GetSequence(), OptionOfStepList))
  }

  isAvailable(): Promise<boolean> {
    return this.postSequencerCmd(new Req.IsAvailable(), D.boolean)
  }

  isOnline(): Promise<boolean> {
    return this.postSequencerCmd(new Req.IsOnline(), D.boolean)
  }

  goOnline(): Promise<Res.GoOnlineResponse> {
    return this.postSequencerCmd(new Req.GoOnline(), Res.GoOnlineResponse)
  }

  goOffline(): Promise<Res.GoOfflineResponse> {
    return this.postSequencerCmd(new Req.GoOffline(), Res.GoOfflineResponse)
  }

  abortSequence(): Promise<Res.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.AbortSequence(), Res.OkOrUnhandledResponse)
  }

  stop(): Promise<Res.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.Stop(), Res.OkOrUnhandledResponse)
  }

  diagnosticMode(startTime: Date, hint: string): Promise<Res.DiagnosticModeResponse> {
    return this.postSequencerCmd(
      new Req.DiagnosticMode(startTime, hint),
      Res.DiagnosticModeResponse
    )
  }

  operationsMode(): Promise<Res.OperationsModeResponse> {
    return this.postSequencerCmd(new Req.OperationsMode(), Res.OperationsModeResponse)
  }

  async queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse> {
    return this.ws().singleResponse(
      new GatewaySequencerCommand(this.componentId, new QueryFinal(runId, timeoutInSeconds)),
      SubmitResponse
    )
  }
}
