import { Parameter } from 'models/params/Parameter'
import { Key } from 'models/params/Key'

export interface QueryCommand {
  _type: 'Query'
  runId: string
}

export interface ControlCommand {
  _type: 'Setup' | 'Observe'
  source: string
  commandName: string
  maybeObsId?: string[]
  paramSet: Parameter<Key>[]
}

export type CommandServiceHttpMessage =
  | {
      _type: 'Submit' | 'Validate' | 'Oneway'
      controlCommand: ControlCommand
    }
  | QueryCommand

const Command = (
  _type: 'Validate' | 'Submit' | 'Oneway',
  controlCommand: ControlCommand
): CommandServiceHttpMessage => {
  return { _type, controlCommand }
}

export const Validate = (command: ControlCommand) => Command('Validate', command)
export const Submit = (command: ControlCommand) => Command('Submit', command)
export const Oneway = (command: ControlCommand) => Command('Oneway', command)
export const Query = (runId: string): QueryCommand => {
  return { _type: 'Query', runId }
}
