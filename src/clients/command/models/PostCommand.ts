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

export type CommandHttpMessage =
  | {
      _type: 'Submit' | 'Validate' | 'Oneway'
      command: ControlCommand
    }
  | QueryCommand
