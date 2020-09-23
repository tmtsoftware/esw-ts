import * as D from 'io-ts/lib/Decoder'
import type { Option } from '../..'
import type { ComponentId, SequenceCommand, SubmitResponse } from '../../models'
import { SubmitResponseD } from '../../models/params/CommandResponse'
import type { Decoder } from '../../utils/Decoder'
import type { HttpTransport } from '../../utils/HttpTransport'
import { headOption } from '../../utils/Utils'
import type { Ws } from '../../utils/Ws'
import { GatewaySequencerCommand } from '../gateway/models/Gateway'
import * as Req from './models/PostCommand'
import * as Res from './models/SequencerRes'
import { OptionOfStepList, StepList } from './models/StepList'
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

  loadSequence(sequence: SequenceCommand[]): Promise<Res.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.LoadSequence(sequence), Res.OkOrUnhandledResponseD)
  }

  startSequence(): Promise<SubmitResponse> {
    return this.postSequencerCmd(new Req.StartSequence(), SubmitResponseD)
  }

  add(commands: SequenceCommand[]): Promise<Res.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.Add(commands), Res.OkOrUnhandledResponseD)
  }

  prepend(commands: SequenceCommand[]): Promise<Res.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.Prepend(commands), Res.OkOrUnhandledResponseD)
  }

  replace(id: string, commands: SequenceCommand[]): Promise<Res.GenericResponse> {
    return this.postSequencerCmd(new Req.Replace(id, commands), Res.GenericResponseD)
  }

  insertAfter(id: string, commands: SequenceCommand[]): Promise<Res.GenericResponse> {
    return this.postSequencerCmd(new Req.InsertAfter(id, commands), Res.GenericResponseD)
  }

  delete(id: string): Promise<Res.GenericResponse> {
    return this.postSequencerCmd(new Req.Delete(id), Res.GenericResponseD)
  }

  addBreakpoint(id: string): Promise<Res.GenericResponse> {
    return this.postSequencerCmd(new Req.AddBreakpoint(id), Res.GenericResponseD)
  }

  removeBreakpoint(id: string): Promise<Res.RemoveBreakpointResponse> {
    return this.postSequencerCmd(new Req.RemoveBreakpoint(id), Res.RemoveBreakpointResponseD)
  }

  reset(): Promise<Res.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.Reset(), Res.OkOrUnhandledResponseD)
  }

  resume(): Promise<Res.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.Resume(), Res.OkOrUnhandledResponseD)
  }

  pause(): Promise<Res.PauseResponse> {
    return this.postSequencerCmd(new Req.Pause(), Res.PauseResponseD)
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
    return this.postSequencerCmd(new Req.GoOnline(), Res.GoOnlineResponseD)
  }

  goOffline(): Promise<Res.GoOfflineResponse> {
    return this.postSequencerCmd(new Req.GoOffline(), Res.GoOfflineResponseD)
  }

  abortSequence(): Promise<Res.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.AbortSequence(), Res.OkOrUnhandledResponseD)
  }

  stop(): Promise<Res.OkOrUnhandledResponse> {
    return this.postSequencerCmd(new Req.Stop(), Res.OkOrUnhandledResponseD)
  }

  diagnosticMode(startTime: Date, hint: string): Promise<Res.DiagnosticModeResponse> {
    return this.postSequencerCmd(
      new Req.DiagnosticMode(startTime, hint),
      Res.DiagnosticModeResponseD
    )
  }

  operationsMode(): Promise<Res.OperationsModeResponse> {
    return this.postSequencerCmd(new Req.OperationsMode(), Res.OperationsModeResponseD)
  }

  submit(sequence: SequenceCommand[]): Promise<SubmitResponse> {
    return this.postSequencerCmd(new Req.Submit(sequence), SubmitResponseD)
  }

  async submitAndWait(sequence: SequenceCommand[]): Promise<SubmitResponse> {
    const submitResponse = await this.submit(sequence)
    if (submitResponse._type === 'Started') {
      return this.queryFinal(submitResponse.runId, 5)
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
