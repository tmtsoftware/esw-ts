import { Parameter } from 'models/params/Parameter'
import { Key } from 'models/params/Key'

export type ControlCommandType = 'Setup' | 'Observe'

interface Command {
  source: string
  commandName: string
  maybeObsId?: string[]
  paramSet: Parameter<Key>[]
}

export interface ControlCommand extends Command {
  _type: ControlCommandType
}

export interface SequenceCommand extends Command {
  _type: ControlCommandType | 'Wait'
}
