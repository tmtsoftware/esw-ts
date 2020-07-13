import { Key } from './Key'
import { Parameter } from './Parameter'
import { Prefix, PrefixV } from './Prefix'

abstract class Command {
  abstract readonly _type: 'Setup' | 'Observe' | 'Wait'
  abstract readonly source: Prefix
  abstract readonly commandName: string
  abstract readonly maybeObsId: string[]
  abstract readonly paramSet: Parameter<Key>[]

  toJSON() {
    return {
      _type: this._type,
      source: PrefixV.encode(this.source),
      commandName: this.commandName,
      maybeObsId: this.maybeObsId,
      paramSet: this.paramSet
    }
  }
}

export class Setup extends Command {
  readonly _type: 'Setup' = 'Setup'
  constructor(
    readonly source: Prefix,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {
    super()
  }
}

export class Observe extends Command {
  readonly _type: 'Observe' = 'Observe'
  constructor(
    readonly source: Prefix,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {
    super()
  }
}

export class Wait extends Command {
  readonly _type: 'Wait' = 'Wait'
  constructor(
    readonly source: Prefix,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {
    super()
  }
}

export type ControlCommand = Setup | Observe

export type SequenceCommand = Setup | Observe | Wait
