import { Key } from 'models/params/Key'
import { Parameter } from 'models/params/Parameter'

interface Command {
  source: string
  commandName: string
  maybeObsId?: string[]
  paramSet: Parameter<Key>[]
}

export interface ControlCommand extends Command {
  _type: 'Setup' | 'Observe'
}

export interface SequenceCommand extends Command {
  _type: 'Setup' | 'Observe' | 'Wait'
}
