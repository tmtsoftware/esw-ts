import type { TokenFactory } from '../../'
import * as M from '../../models'
import { HttpTransport } from '../../utils/HttpTransport'
import { Subscription } from '../../utils/Ws'
import { resolveGateway } from '../gateway/ResolveGateway'
import { getPostEndPoint, getWebSocketEndPoint } from '../../utils/Utils'
import { WebSocketTransport } from '../../utils/WebSocketTransport'
import { CommandServiceImpl } from './CommandServiceImpl'

export interface CommandService {
  validate(command: M.ControlCommand): Promise<M.ValidateResponse>

  submit(command: M.ControlCommand): Promise<M.SubmitResponse>

  oneway(command: M.ControlCommand): Promise<M.OnewayResponse>

  query(runId: string): Promise<M.SubmitResponse>

  queryFinal(runId: string, timeoutInSeconds: number): Promise<M.SubmitResponse>

  subscribeCurrentState(
    stateNames: Set<string>
  ): (onStateChange: (state: M.CurrentState) => void) => Subscription
}

export const CommandService = async (
  componentId: M.ComponentId,
  tokenFactory: TokenFactory
): Promise<CommandService> => {
  const { host, port } = await resolveGateway()
  const postEndpoint = getPostEndPoint({ host, port })
  const webSocketEndpoint = getWebSocketEndPoint({ host, port })
  return new CommandServiceImpl(componentId, new HttpTransport(postEndpoint, tokenFactory), () =>
    WebSocketTransport(webSocketEndpoint)
  )
}
