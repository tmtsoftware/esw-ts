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

export interface SequencerService {
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
}

export class SequencerService implements SequencerService {
  constructor(readonly host: string, readonly port: number, readonly componentId: ComponentId) {}

  private httpPost<T>(gatewayCommand: GatewaySequencerCommand) {
    return post<GatewaySequencerCommand, T>(this.host, this.port, gatewayCommand)
  }

  loadSequence(...sequence: SequenceCommand[]): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(
      GatewaySequencerCommand(this.componentId, LoadSequence(sequence))
    )
  }

  startSequence(): Promise<SubmitResponse> {
    return this.httpPost<SubmitResponse>(GatewaySequencerCommand(this.componentId, StartSequence))
  }

  add(commands: SequenceCommand[]): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(
      GatewaySequencerCommand(this.componentId, Add(commands))
    )
  }

  prepend(commands: SequenceCommand[]): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(
      GatewaySequencerCommand(this.componentId, Prepend(commands))
    )
  }

  replace(id: string, commands: SequenceCommand[]): Promise<GenericResponse> {
    return this.httpPost<GenericResponse>(
      GatewaySequencerCommand(this.componentId, Replace(id, commands))
    )
  }

  insertAfter(id: string, commands: SequenceCommand[]): Promise<GenericResponse> {
    return this.httpPost<GenericResponse>(
      GatewaySequencerCommand(this.componentId, InsertAfter(id, commands))
    )
  }

  delete(id: string): Promise<GenericResponse> {
    return this.httpPost<GenericResponse>(GatewaySequencerCommand(this.componentId, Delete(id)))
  }

  addBreakpoint(id: string): Promise<GenericResponse> {
    return this.httpPost<GenericResponse>(
      GatewaySequencerCommand(this.componentId, AddBreakpoint(id))
    )
  }

  removeBreakpoint(id: string): Promise<RemoveBreakpointResponse> {
    return this.httpPost<RemoveBreakpointResponse>(
      GatewaySequencerCommand(this.componentId, RemoveBreakpoint(id))
    )
  }

  reset(): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(GatewaySequencerCommand(this.componentId, Reset))
  }

  resume(): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(GatewaySequencerCommand(this.componentId, Resume))
  }

  pause(): Promise<PauseResponse> {
    return this.httpPost<PauseResponse>(GatewaySequencerCommand(this.componentId, Pause))
  }

  getSequence(): Promise<StepList[]> {
    return this.httpPost<StepList[]>(GatewaySequencerCommand(this.componentId, GetSequence))
  }

  isAvailable(): Promise<boolean> {
    return this.httpPost<boolean>(GatewaySequencerCommand(this.componentId, IsAvailable))
  }

  isOnline(): Promise<boolean> {
    return this.httpPost<boolean>(GatewaySequencerCommand(this.componentId, IsOnline))
  }

  goOnline(): Promise<GoOnlineResponse> {
    return this.httpPost<GoOnlineResponse>(GatewaySequencerCommand(this.componentId, GoOnline))
  }

  goOffline(): Promise<GoOfflineResponse> {
    return this.httpPost<GoOfflineResponse>(GatewaySequencerCommand(this.componentId, GoOffline))
  }

  abortSequence(): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(
      GatewaySequencerCommand(this.componentId, AbortSequence)
    )
  }

  stop(): Promise<OkOrUnhandledResponse> {
    return this.httpPost<OkOrUnhandledResponse>(GatewaySequencerCommand(this.componentId, Stop))
  }

  diagnosticMode(startTime: Date, hint: string): Promise<DiagnosticModeResponse> {
    return this.httpPost<DiagnosticModeResponse>(
      GatewaySequencerCommand(this.componentId, DiagnosticMode(startTime, hint))
    )
  }

  operationsMode(): Promise<OperationsModeResponse> {
    return this.httpPost<OperationsModeResponse>(
      GatewaySequencerCommand(this.componentId, OperationsMode)
    )
  }
}
