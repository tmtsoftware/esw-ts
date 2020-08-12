import type { TokenFactory } from '../..'
import { ComponentId, SequenceCommand, SubmitResponse } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { resolveGateway } from '../gateway/ResolveGateway'
import * as Res from './models/SequencerRes'
import { StepList } from './models/StepList'
import { Option } from '../../utils/Option'
import { getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { WebSocketTransport } from '../../utils/WebSocketTransport'
import { SequencerServiceImpl } from './Impl'

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

export const SequencerService: (
  componentId: ComponentId,
  tokenFactory: TokenFactory
) => Promise<SequencerService> = async (componentId: ComponentId, tokenFactory: TokenFactory) => {
  const { host, port } = await resolveGateway()
  const postEndpoint = getPostEndPoint({ host, port })
  const webSocketEndpoint = getWebSocketEndPoint({ host, port })

  return new SequencerServiceImpl(componentId, new HttpTransport(postEndpoint, tokenFactory), () =>
    WebSocketTransport(webSocketEndpoint)
  )
}
