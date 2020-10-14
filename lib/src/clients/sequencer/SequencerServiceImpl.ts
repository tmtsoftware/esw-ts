import type * as T from '../..'
import { SubmitResponseD } from '../../decoders/CommandDecoders'
import { BooleanD } from '../../decoders/CommonDecoders'
import type { Decoder } from '../../decoders/Decoder'
import * as Res from '../../decoders/SequencerDecoders'
import type { ComponentId, SequenceCommand, SubmitResponse } from '../../models'
import type { HttpTransport } from '../../utils/HttpTransport'
import { headOption } from '../../utils/Utils'
import type { Ws } from '../../utils/Ws'
import { GatewaySequencerCommand } from '../gateway/models/Gateway'
import * as Req from './models/PostCommand'
import type { StepList } from './models/StepList'
import { QueryFinal, SequencerWebsocketRequest } from './models/WsCommand'
import type { SequencerService } from './SequencerService'

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

  loadSequence(sequence: SequenceCommand[]): Promise<T.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.LoadSequence(sequence), Res.OkOrUnhandledResponseD)
  }

  startSequence(): Promise<SubmitResponse> {
    return this.postSequencerCmd(new Req.StartSequence(), SubmitResponseD)
  }

  add(commands: SequenceCommand[]): Promise<T.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.Add(commands), Res.OkOrUnhandledResponseD)
  }

  prepend(commands: SequenceCommand[]): Promise<T.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.Prepend(commands), Res.OkOrUnhandledResponseD)
  }

  replace(id: string, commands: SequenceCommand[]): Promise<T.GenericResponse> {
    return this.postSequencerCmd(new Req.Replace(id, commands), Res.GenericResponseD)
  }

  insertAfter(id: string, commands: SequenceCommand[]): Promise<T.GenericResponse> {
    return this.postSequencerCmd(new Req.InsertAfter(id, commands), Res.GenericResponseD)
  }

  delete(id: string): Promise<T.GenericResponse> {
    return this.postSequencerCmd(new Req.Delete(id), Res.GenericResponseD)
  }

  addBreakpoint(id: string): Promise<T.GenericResponse> {
    return this.postSequencerCmd(new Req.AddBreakpoint(id), Res.GenericResponseD)
  }

  removeBreakpoint(id: string): Promise<T.RemoveBreakpointResponse> {
    return this.postSequencerCmd(new Req.RemoveBreakpoint(id), Res.RemoveBreakpointResponseD)
  }

  reset(): Promise<T.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.Reset(), Res.OkOrUnhandledResponseD)
  }

  resume(): Promise<T.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.Resume(), Res.OkOrUnhandledResponseD)
  }

  pause(): Promise<T.PauseResponse> {
    return this.postSequencerCmd(new Req.Pause(), Res.PauseResponseD)
  }

  async getSequence(): Promise<T.Option<StepList>> {
    return headOption(await this.postSequencerCmd(new Req.GetSequence(), Res.OptionOfStepList))
  }

  isAvailable(): Promise<boolean> {
    return this.postSequencerCmd(new Req.IsAvailable(), BooleanD)
  }

  isOnline(): Promise<boolean> {
    return this.postSequencerCmd(new Req.IsOnline(), BooleanD)
  }

  goOnline(): Promise<T.GoOnlineResponse> {
    return this.postSequencerCmd(new Req.GoOnline(), Res.GoOnlineResponseD)
  }

  goOffline(): Promise<T.GoOfflineResponse> {
    return this.postSequencerCmd(new Req.GoOffline(), Res.GoOfflineResponseD)
  }

  abortSequence(): Promise<T.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.AbortSequence(), Res.OkOrUnhandledResponseD)
  }

  stop(): Promise<T.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.Stop(), Res.OkOrUnhandledResponseD)
  }

  diagnosticMode(startTime: Date, hint: string): Promise<T.DiagnosticModeResponse> {
    return this.postSequencerCmd(
      new Req.DiagnosticMode(startTime, hint),
      Res.DiagnosticModeResponseD
    )
  }

  operationsMode(): Promise<T.OperationsModeResponse> {
    return this.postSequencerCmd(new Req.OperationsMode(), Res.OperationsModeResponseD)
  }

  submit(sequence: SequenceCommand[]): Promise<SubmitResponse> {
    return this.postSequencerCmd(new Req.Submit(sequence), SubmitResponseD)
  }

  async submitAndWait(
    sequence: SequenceCommand[],
    timeoutInSeconds: number
  ): Promise<SubmitResponse> {
    const submitResponse = await this.submit(sequence)
    if (submitResponse._type === 'Started') {
      return this.queryFinal(submitResponse.runId, timeoutInSeconds)
    } else return Promise.resolve(submitResponse)
  }

  query(id: string): Promise<SubmitResponse> {
    return this.postSequencerCmd(new Req.Query(id), SubmitResponseD)
  }

  queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse> {
    return this.ws().singleResponse(
      new GatewaySequencerCommand(this.componentId, new QueryFinal(runId, timeoutInSeconds)),
      SubmitResponseD
    )
  }
}
