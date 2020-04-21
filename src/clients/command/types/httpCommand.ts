import { Parameter } from '../../../params/Parameter'
import { Key } from '../../../params/Key'

export interface QueryCommand {
  _type: 'Query'
  runId: string
}

export interface Command {
  source: string
  commandName: string
  maybeObsId?: string[]
  paramSet: Parameter<Key>[]
}

export interface HttpMessageControlCommand extends Command {
  _type: 'Setup' | 'Observe'
}

export type ControlCommand = HttpMessageControlCommand | QueryCommand

export type CommandType = 'Submit' | 'Validate' | 'Oneway' | 'Query'

export interface HttpCommandMessage {
  _type: CommandType
  controlCommand: ControlCommand
}
