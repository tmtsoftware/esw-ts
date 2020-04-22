import { ControlCommand } from 'clients/command/models/PostCommand'
import { Http } from 'utils/Http'
import { GatewayCommand, GatewayCommandType } from 'clients/command/models/GatewayCommand'
import { ComponentId } from 'models/ComponentId'
import {
  OneWayResponse,
  SubmitResponse,
  ValidateResponse
} from 'clients/command/models/CommandResponse'
import { Subscription, Ws } from 'utils/Ws'
import {
  QueryFinalCommand,
  SubscribeCurrentStateCommand,
  WebsocketCommand
} from './models/WsCommand'
import { CurrentState } from 'models/params/CurrentState'
import { ComponentCommandFactory } from 'clients/command/ComponentCommandFactory'

export interface CommandClient {
  validate(command: ControlCommand): Promise<ValidateResponse>
  submit(command: ControlCommand): Promise<SubmitResponse>
  oneway(command: ControlCommand): Promise<OneWayResponse>
  query(runId: string): Promise<SubmitResponse>

  queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse>
  subscribeCurrentState(
    stateNames: Set<string>,
    onStateChange: (state: CurrentState) => void
  ): Subscription
}

const getWsGatewayCommand = (
  componentId: ComponentId,
  controlCommand: WebsocketCommand
): GatewayCommand => {
  return {
    _type: GatewayCommandType.ComponentCommand,
    componentId,
    command: controlCommand
  }
}

export const CommandClient = (
  host: string,
  port: number,
  componentId: ComponentId
): CommandClient => {
  const commandFactory = new ComponentCommandFactory(componentId)
  const post = <T>(gatewayCommand: GatewayCommand) => Http.post<T>(host, port, gatewayCommand)

  const validate = async (command: ControlCommand) =>
    post<ValidateResponse>(commandFactory.validate(command))

  const submit = async (command: ControlCommand) =>
    post<SubmitResponse>(commandFactory.submit(command))

  const oneway = async (command: ControlCommand) =>
    post<OneWayResponse>(commandFactory.oneway(command))

  const query = async (runId: string) => post<SubmitResponse>(commandFactory.query(runId))

  const subscribeCurrentState = (
    stateNames: Set<string>,
    onStateChange: (state: CurrentState) => void
  ): Subscription => {
    const websocket = new Ws(host, port)

    const command: SubscribeCurrentStateCommand = {
      _type: 'SubscribeCurrentState',
      names: Array.from(stateNames.values())
    }
    const gatewayCommand: GatewayCommand = getWsGatewayCommand(componentId, command)
    websocket.send(gatewayCommand)
    return websocket.subscribe<CurrentState>(onStateChange)
  }

  const queryFinal = async (runId: string, timeoutInSeconds: number) => {
    const websocket = new Ws(host, port)
    const queryFinalCommand: QueryFinalCommand = {
      _type: 'QueryFinal',
      runId,
      timeoutInSeconds
    }
    const gatewayCommand: GatewayCommand = getWsGatewayCommand(componentId, queryFinalCommand)
    websocket.send(gatewayCommand)
    return new Promise<SubmitResponse>((resolve) => {
      websocket.subscribe<SubmitResponse>((submitResponse: SubmitResponse) => {
        resolve(submitResponse)
      })
    })
  }
  return { validate, submit, oneway, query, queryFinal, subscribeCurrentState }
}
