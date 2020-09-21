import type { TokenFactory, Option } from '../..'
import { gatewayConnection, resolveConnection } from '../../config/Connections'
import type { ComponentId, SequenceCommand, SubmitResponse } from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'

import { getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { Ws } from '../../utils/Ws'
import type * as Res from './models/SequencerRes'
import type { StepList } from './models/StepList'
import { SequencerServiceImpl } from './SequencerServiceImpl'

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

  submit(commands: SequenceCommand[]): Promise<SubmitResponse>

  submitAndWait(commands: SequenceCommand[]): Promise<SubmitResponse>

  query(id: string): Promise<SubmitResponse>

  // websocket api
  queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse>
}

export const SequencerService: (
  componentId: ComponentId,
  tokenFactory: TokenFactory
) => Promise<SequencerService> = async (componentId: ComponentId, tokenFactory: TokenFactory) => {
  const { host, port } = await resolveConnection(gatewayConnection)
  const postEndpoint = getPostEndPoint({ host, port })
  const webSocketEndpoint = getWebSocketEndPoint({ host, port })

  return new SequencerServiceImpl(
    componentId,
    new HttpTransport(postEndpoint, tokenFactory),
    () => new Ws(webSocketEndpoint)
  )
}
