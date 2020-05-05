import { QueryFinal } from 'clients/command/models/WsCommand'
import { GatewaySequencerCommand } from 'clients/gateway/models/Gateway'
import { resolveGateway } from 'clients/gateway/resolveGateway'
import {
  AbortSequence,
  Add,
  AddBreakpoint,
  Delete,
  DiagnosticMode,
  GetSequence,
  GoOffline,
  GoOnline,
  InsertAfter,
  IsAvailable,
  IsOnline,
  LoadSequence,
  OperationsMode,
  Pause,
  Prepend,
  RemoveBreakpoint,
  Replace,
  Reset,
  Resume,
  SequencerPostRequest,
  StartSequence,
  Stop
} from 'clients/sequencer/models/PostCommand'
import {
  DiagnosticModeResponse,
  GenericResponse,
  GoOfflineResponse,
  GoOnlineResponse,
  OkOrUnhandledResponse,
  OperationsModeResponse,
  PauseResponse,
  RemoveBreakpointResponse
} from 'clients/sequencer/models/SequencerRes'
import { StepList } from 'clients/sequencer/models/StepList'
import { SequencerWebsocketRequest } from 'clients/sequencer/models/WsCommand'
import { ComponentId } from 'models/ComponentId'
import { SequenceCommand } from 'models/params/Command'
import { SubmitResponse } from 'models/params/CommandResponse'
import { post } from 'utils/post'
import { Ws } from 'utils/Ws'

export interface SequencerServiceApi {
  loadSequence(sequence: SequenceCommand[]): Promise<OkOrUnhandledResponse>
  startSequence(): Promise<SubmitResponse>
  add(commands: SequenceCommand[]): Promise<OkOrUnhandledResponse>
  prepend(commands: SequenceCommand[]): Promise<OkOrUnhandledResponse>
  replace(id: string, commands: SequenceCommand[]): Promise<GenericResponse>
  insertAfter(id: string, commands: SequenceCommand[]): Promise<GenericResponse>
  delete(id: string): Promise<GenericResponse>
  addBreakpoint(id: string): Promise<GenericResponse>
  removeBreakpoint(id: string): Promise<RemoveBreakpointResponse>
  reset(): Promise<OkOrUnhandledResponse>
  resume(): Promise<OkOrUnhandledResponse>
  pause(): Promise<PauseResponse>
  getSequence(): Promise<StepList[]>
  isAvailable(): Promise<boolean>
  isOnline(): Promise<boolean>
  goOnline(): Promise<GoOnlineResponse>
  goOffline(): Promise<GoOfflineResponse>
  abortSequence(): Promise<OkOrUnhandledResponse>
  stop(): Promise<OkOrUnhandledResponse>
  diagnosticMode(startTime: Date, hint: string): Promise<DiagnosticModeResponse>
  operationsMode(): Promise<OperationsModeResponse>

  // websocket api
  queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse>
}

export class SequencerService implements SequencerServiceApi {
  constructor(readonly componentId: ComponentId) {}

  private sequencerCommand = (request: SequencerPostRequest | SequencerWebsocketRequest) =>
    new GatewaySequencerCommand(this.componentId, request)

  private httpPost = async <T>(gatewayCommand: GatewaySequencerCommand) => {
    const { host, port } = await resolveGateway()
    return post<GatewaySequencerCommand, T>(host, port, gatewayCommand)
  }

  loadSequence(sequence: SequenceCommand[]): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(this.sequencerCommand(new LoadSequence(sequence)))
  }

  startSequence(): Promise<SubmitResponse> {
    return this.httpPost<SubmitResponse>(this.sequencerCommand(new StartSequence()))
  }

  add(commands: SequenceCommand[]): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(this.sequencerCommand(new Add(commands)))
  }

  prepend(commands: SequenceCommand[]): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(this.sequencerCommand(new Prepend(commands)))
  }

  replace(id: string, commands: SequenceCommand[]): Promise<GenericResponse> {
    return this.httpPost<GenericResponse>(this.sequencerCommand(new Replace(id, commands)))
  }

  insertAfter(id: string, commands: SequenceCommand[]): Promise<GenericResponse> {
    return this.httpPost<GenericResponse>(this.sequencerCommand(new InsertAfter(id, commands)))
  }

  delete(id: string): Promise<GenericResponse> {
    return this.httpPost<GenericResponse>(this.sequencerCommand(new Delete(id)))
  }

  addBreakpoint(id: string): Promise<GenericResponse> {
    return this.httpPost<GenericResponse>(this.sequencerCommand(new AddBreakpoint(id)))
  }

  removeBreakpoint(id: string): Promise<RemoveBreakpointResponse> {
    return this.httpPost<RemoveBreakpointResponse>(this.sequencerCommand(new RemoveBreakpoint(id)))
  }

  reset(): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(this.sequencerCommand(new Reset()))
  }

  resume(): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(this.sequencerCommand(new Resume()))
  }

  pause(): Promise<PauseResponse> {
    return this.httpPost<PauseResponse>(this.sequencerCommand(new Pause()))
  }

  getSequence(): Promise<StepList[]> {
    return this.httpPost<StepList[]>(this.sequencerCommand(new GetSequence()))
  }

  isAvailable(): Promise<boolean> {
    return this.httpPost<boolean>(this.sequencerCommand(new IsAvailable()))
  }

  isOnline(): Promise<boolean> {
    return this.httpPost<boolean>(this.sequencerCommand(new IsOnline()))
  }

  goOnline(): Promise<GoOnlineResponse> {
    return this.httpPost<GoOnlineResponse>(this.sequencerCommand(new GoOnline()))
  }

  goOffline(): Promise<GoOfflineResponse> {
    return this.httpPost<GoOfflineResponse>(this.sequencerCommand(new GoOffline()))
  }

  abortSequence(): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(this.sequencerCommand(new AbortSequence()))
  }

  stop(): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(this.sequencerCommand(new Stop()))
  }

  diagnosticMode(startTime: Date, hint: string): Promise<DiagnosticModeResponse> {
    return this.httpPost<DiagnosticModeResponse>(
      this.sequencerCommand(new DiagnosticMode(startTime, hint))
    )
  }

  operationsMode(): Promise<OperationsModeResponse> {
    return this.httpPost<OperationsModeResponse>(this.sequencerCommand(new OperationsMode()))
  }

  async queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse> {
    const { host, port } = await resolveGateway()
    return new Ws(host, port).singleResponse(
      this.sequencerCommand(new QueryFinal(runId, timeoutInSeconds))
    )
  }
}
