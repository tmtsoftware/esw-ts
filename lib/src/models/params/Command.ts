import { Key } from './Key'
import { Parameter } from './Parameter'
import { Prefix } from './Prefix'

interface Command {
  readonly _type: 'Setup' | 'Observe' | 'Wait'
  readonly source: Prefix
  readonly commandName: string
  readonly maybeObsId?: string[]
  readonly paramSet: Parameter<Key>[]
}

export class Setup implements Command {
  readonly _type: 'Setup' = 'Setup'
  constructor(
    readonly source: Prefix,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {}
}

export class Observe implements Command {
  readonly _type: 'Observe' = 'Observe'
  constructor(
    readonly source: Prefix,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {}
}

export class Wait implements Command {
  readonly _type: 'Wait' = 'Wait'
  constructor(
    readonly source: Prefix,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {}
}

export type ControlCommand = Setup | Observe

export type SequenceCommand = Setup | Observe | Wait
