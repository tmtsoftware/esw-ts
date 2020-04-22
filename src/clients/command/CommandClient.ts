import {
  CommandMessage,
  ControlCommand,
  ControlCommandType,
  QueryCommand,
} from 'clients/command/models/PostCommand'
import { Http } from 'utils/Http'
import { GatewayCommand, GatewayCommandType } from 'clients/command/models/GatewayCommand'
import { ComponentId } from 'models/ComponentId'
import {
  OneWayResponse,
  SubmitResponse,
  ValidateResponse,
} from 'clients/command/models/CommandResponse'
import { Subscription, Ws } from '../../utils/Ws'
import {
  QueryFinalCommand,
  SubscribeCurrentStateCommand,
  WebsocketCommand,
} from './models/WsCommand'
import { CurrentState } from '../../models/params/CurrentState'

export interface CommandClient {
  validate(controlCommand: ControlCommand): Promise<ValidateResponse>

  submit(controlCommand: ControlCommand): Promise<SubmitResponse>

  oneway(controlCommand: ControlCommand): Promise<OneWayResponse>

  query(runId: string): Promise<SubmitResponse>

  queryFinal(runId: string, timeoutInSeconds: number): Promise<SubmitResponse>

  subscribeCurrentState(
    stateNames: Set<string>,
    onStateChange: (state: CurrentState) => void,
  ): Subscription
}

const getHttpCommand = (
  type: ControlCommandType,
  controlCommand: ControlCommand,
): CommandMessage => {
  return {
    _type: type,
    controlCommand,
  }
}

const getPostGatewayCommand = (
  commandType: ControlCommandType,
  componentId: ComponentId,
  controlCommand: ControlCommand,
): GatewayCommand => {
  return {
    _type: GatewayCommandType.ComponentCommand,
    componentId,
    command: getHttpCommand(commandType, controlCommand),
  }
}

const getWsGatewayCommand = (
  componentId: ComponentId,
  controlCommand: WebsocketCommand,
): GatewayCommand => {
  return {
    _type: GatewayCommandType.ComponentCommand,
    componentId,
    command: controlCommand,
  }
}

export const CommandClient = (
  host: string,
  port: number,
  componentId: ComponentId,
): CommandClient => {
  const validate = async (controlCommand: ControlCommand) => {
    const gatewayCommand: GatewayCommand = getPostGatewayCommand(
      'Validate',
      componentId,
      controlCommand,
    )
    return Http.post<ValidateResponse>(host, port, gatewayCommand)
  }
  const submit = async (controlCommand: ControlCommand) => {
    const gatewayCommand: GatewayCommand = getPostGatewayCommand(
      'Submit',
      componentId,
      controlCommand,
    )
    return Http.post<SubmitResponse>(host, port, gatewayCommand)
  }

  const oneway = async (controlCommand: ControlCommand) => {
    const gatewayCommand: GatewayCommand = getPostGatewayCommand(
      'Oneway',
      componentId,
      controlCommand,
    )
    return Http.post<OneWayResponse>(host, port, gatewayCommand)
  }

  const query = async (runId: string) => {
    const queryCommand: QueryCommand = {
      _type: 'Query',
      runId,
    }
    const gatewayCommand: GatewayCommand = getPostGatewayCommand(
      'Oneway',
      componentId,
      queryCommand,
    )
    return Http.post<SubmitResponse>(host, port, gatewayCommand)
  }

  const subscribeCurrentState = (
    stateNames: Set<string>,
    onStateChange: (state: CurrentState) => void,
  ): Subscription => {
    const websocket = new Ws(host, port)

    const command: SubscribeCurrentStateCommand = {
      _type: 'SubscribeCurrentState',
      names: Array.from(stateNames.values()),
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
      timeoutInSeconds,
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
