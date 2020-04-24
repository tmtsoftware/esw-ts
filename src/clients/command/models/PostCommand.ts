import { Parameter } from 'models/params/Parameter'
import { Key } from 'models/params/Key'

export type ControlCommandType = 'Setup' | 'Observe'
export type CommandServiceHttpMessageType = 'Submit' | 'Validate' | 'Oneway'

export interface ControlCommand {
  _type: ControlCommandType
  source: string
  commandName: string
  maybeObsId?: string[]
  paramSet: Parameter<Key>[]
}

export interface QueryCommand {
  _type: 'Query'
  runId: string
}

export type CommandServiceHttpMessage =
  | {
      _type: CommandServiceHttpMessageType
      controlCommand: ControlCommand
    }
  | QueryCommand

const controlCommandFactory = (_type: ControlCommandType) => (
  source: string,
  commandName: string,
  paramSet: Parameter<Key>[],
  maybeObsId?: string[]
) => {
  return { _type, source, commandName, maybeObsId, paramSet }
}

const commandHttpMsgFactory = (_type: CommandServiceHttpMessageType) => (
  controlCommand: ControlCommand
) => {
  return { _type, controlCommand }
}

export const Validate = commandHttpMsgFactory('Validate')
export const Submit = commandHttpMsgFactory('Submit')
export const Oneway = commandHttpMsgFactory('Oneway')
export const Query = (runId: string): QueryCommand => {
  return { _type: 'Query', runId }
}

export const Setup = controlCommandFactory('Setup')
export const Observe = controlCommandFactory('Observe')
