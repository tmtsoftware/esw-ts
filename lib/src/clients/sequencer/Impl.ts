import { ComponentId, SequenceCommand, SubmitResponse } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { GatewaySequencerCommand } from '../gateway/models/Gateway'
import * as Req from './models/PostCommand'
import { QueryFinal } from './models/WsCommand'
import { Ws } from '../../utils/Ws'
import { SequencerWebsocketRequest } from './models/WsCommand'
import { Decoder } from '../../utils/Decoder'
import * as Res from './models/SequencerRes'
import { Option } from '../../utils/Option'
import { OptionOfStepList, StepList } from './models/StepList'
import { headOption } from '../../utils/Utils'
import * as D from 'io-ts/lib/Decoder'
import { SequencerService } from './SequencerService'

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
    return headOption(await this.postSequencerCmd(new Req.GetSequence(), OptionOfStepList))
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

  async queryFinal(runId: string, timeout: number): Promise<SubmitResponse> {
    return this.ws().singleResponse(
      new GatewaySequencerCommand(this.componentId, new QueryFinal(runId, timeout)),
      SubmitResponse
    )
  }
}
