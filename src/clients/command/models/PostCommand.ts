import { Parameter } from 'models/params/Parameter'
import { Key } from 'models/params/Key'

export interface QueryCommand {
  _type: 'Query'
  runId: string
}

export interface Command {
  _type: 'Setup' | 'Observe'
  source: string
  commandName: string
  maybeObsId?: string[]
  paramSet: Parameter<Key>[]
}

export type ControlCommand = Command | QueryCommand

export type ControlCommandType = 'Submit' | 'Validate' | 'Oneway' | 'Query'

export interface HttpCommand {
  _type: ControlCommandType
  controlCommand: ControlCommand
}
