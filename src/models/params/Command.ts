import { Key } from 'models/params/Key'
import { Parameter } from 'models/params/Parameter'

interface Command {
  readonly _type: 'Setup' | 'Observe' | 'Wait'
  readonly source: string
  readonly commandName: string
  readonly maybeObsId?: string[]
  readonly paramSet: Parameter<Key>[]
}

export class Setup implements Command {
  readonly _type: 'Setup' = 'Setup'
  constructor(
    readonly source: string,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {}
}

export class Observe implements Command {
  readonly _type: 'Observe' = 'Observe'
  constructor(
    readonly source: string,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {}
}

export class Wait implements Command {
  readonly _type: 'Wait' = 'Wait'
  constructor(
    readonly source: string,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {}
}

export type ControlCommand = Setup | Observe

export type SequenceCommand = Setup | Observe | Wait
