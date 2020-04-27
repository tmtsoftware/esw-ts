import { Oneway, Query, Submit, Validate } from 'clients/command/models/PostCommand'
import { QueryFinal, SubscribeCurrentState } from 'clients/command/models/WsCommand'
import { GatewayComponentCommand } from 'clients/gateway/models/Gateway'
import { ComponentId } from 'models/ComponentId'
import { ControlCommand } from 'models/params/Command'
import { OneWayResponse, SubmitResponse, ValidateResponse } from 'models/params/CommandResponse'
import { CurrentState } from 'models/params/CurrentState'
import { post } from 'utils/Http'
import { Subscription, Ws } from 'utils/Ws'

export interface CommandService {
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

export const CommandService = (
  host: string,
  port: number,
  componentId: ComponentId
): CommandService => {
  const httpPost = <T>(gatewayCommand: GatewayComponentCommand) =>
    post<GatewayComponentCommand, T>(host, port, gatewayCommand)

  const validate = async (command: ControlCommand) =>
    httpPost<ValidateResponse>(GatewayComponentCommand(componentId, Validate(command)))

  const submit = async (command: ControlCommand) =>
    httpPost<SubmitResponse>(GatewayComponentCommand(componentId, Submit(command)))

  const oneway = async (command: ControlCommand) =>
    httpPost<OneWayResponse>(GatewayComponentCommand(componentId, Oneway(command)))

  const query = async (runId: string) =>
    httpPost<SubmitResponse>(GatewayComponentCommand(componentId, Query(runId)))

  const subscribeCurrentState = (
    stateNames: Set<string>,
    onStateChange: (state: CurrentState) => void
  ): Subscription =>
    new Ws(host, port).sendThenSubscribe(
      GatewayComponentCommand(componentId, SubscribeCurrentState(stateNames)),
      onStateChange
    )

  const queryFinal = async (runId: string, timeoutInSeconds: number) =>
    new Promise<SubmitResponse>((resolve) => {
      new Ws(host, port).sendThenSubscribe(
        GatewayComponentCommand(componentId, QueryFinal(runId, timeoutInSeconds)),
        (submitResponse: SubmitResponse) => {
          resolve(submitResponse)
        }
      )
    })

  return { validate, submit, oneway, query, queryFinal, subscribeCurrentState }
}
