import { ComponentId } from 'models/ComponentId'
import { post } from 'utils/Http'
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
import { GatewaySequencerCommand } from 'clients/gateway/models/Gateway'
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
  StartSequence,
  Stop
} from 'clients/sequencer/models/PostCommand'
import { SequenceCommand } from 'models/params/Command'
import { SubmitResponse } from 'models/params/CommandResponse'
import { StepList } from 'clients/sequencer/models/StepList'
import { Ws } from 'utils/Ws'
import { QueryFinal } from 'clients/command/models/WsCommand'

export interface SequencerServiceApi {
  loadSequence(...sequence: SequenceCommand[]): Promise<OkOrUnhandledResponse>
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
  constructor(readonly host: string, readonly port: number, readonly componentId: ComponentId) {}

  private httpPost<T>(gatewayCommand: GatewaySequencerCommand) {
    return post<GatewaySequencerCommand, T>(this.host, this.port, gatewayCommand)
  }

  loadSequence(...sequence: SequenceCommand[]): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(
      GatewaySequencerCommand(this.componentId, new LoadSequence(sequence))
    )
  }

  startSequence(): Promise<SubmitResponse> {
    return this.httpPost<SubmitResponse>(
      GatewaySequencerCommand(this.componentId, new StartSequence())
    )
  }

  add(commands: SequenceCommand[]): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(
      GatewaySequencerCommand(this.componentId, new Add(commands))
    )
  }

  prepend(commands: SequenceCommand[]): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(
      GatewaySequencerCommand(this.componentId, new Prepend(commands))
    )
  }

  replace(id: string, commands: SequenceCommand[]): Promise<GenericResponse> {
    return this.httpPost<GenericResponse>(
      GatewaySequencerCommand(this.componentId, new Replace(id, commands))
    )
  }

  insertAfter(id: string, commands: SequenceCommand[]): Promise<GenericResponse> {
    return this.httpPost<GenericResponse>(
      GatewaySequencerCommand(this.componentId, new InsertAfter(id, commands))
    )
  }

  delete(id: string): Promise<GenericResponse> {
    return this.httpPost<GenericResponse>(GatewaySequencerCommand(this.componentId, new Delete(id)))
  }

  addBreakpoint(id: string): Promise<GenericResponse> {
    return this.httpPost<GenericResponse>(
      GatewaySequencerCommand(this.componentId, new AddBreakpoint(id))
    )
  }

  removeBreakpoint(id: string): Promise<RemoveBreakpointResponse> {
    return this.httpPost<RemoveBreakpointResponse>(
      GatewaySequencerCommand(this.componentId, new RemoveBreakpoint(id))
    )
  }

  reset(): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(
      GatewaySequencerCommand(this.componentId, new Reset())
    )
  }

  resume(): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(
      GatewaySequencerCommand(this.componentId, new Resume())
    )
  }

  pause(): Promise<PauseResponse> {
    return this.httpPost<PauseResponse>(GatewaySequencerCommand(this.componentId, new Pause()))
  }

  getSequence(): Promise<StepList[]> {
    return this.httpPost<StepList[]>(GatewaySequencerCommand(this.componentId, new GetSequence()))
  }

  isAvailable(): Promise<boolean> {
    return this.httpPost<boolean>(GatewaySequencerCommand(this.componentId, new IsAvailable()))
  }

  isOnline(): Promise<boolean> {
    return this.httpPost<boolean>(GatewaySequencerCommand(this.componentId, new IsOnline()))
  }

  goOnline(): Promise<GoOnlineResponse> {
    return this.httpPost<GoOnlineResponse>(
      GatewaySequencerCommand(this.componentId, new GoOnline())
    )
  }

  goOffline(): Promise<GoOfflineResponse> {
    return this.httpPost<GoOfflineResponse>(
      GatewaySequencerCommand(this.componentId, new GoOffline())
    )
  }

  abortSequence(): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(
      GatewaySequencerCommand(this.componentId, new AbortSequence())
    )
  }

  stop(): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(
      GatewaySequencerCommand(this.componentId, new Stop())
    )
  }

  diagnosticMode(startTime: Date, hint: string): Promise<DiagnosticModeResponse> {
    return this.httpPost<DiagnosticModeResponse>(
      GatewaySequencerCommand(this.componentId, new DiagnosticMode(startTime, hint))
    )
  }

  operationsMode(): Promise<OperationsModeResponse> {
    return this.httpPost<OperationsModeResponse>(
      GatewaySequencerCommand(this.componentId, new OperationsMode())
    )
  }

  queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse> {
    return new Promise<SubmitResponse>((resolve) => {
      new Ws(this.host, this.port).sendThenSubscribe(
        GatewaySequencerCommand(this.componentId, new QueryFinal(runId, timeoutInSeconds)),
        (submitResponse: SubmitResponse) => {
          resolve(submitResponse)
        }
      )
    })
  }
}
