import * as D from 'io-ts/lib/Decoder'
import { Key } from './Key'
import { Parameter, ParameterD } from './Parameter'
import { Prefix, PrefixD } from './Prefix'

const SetupL = 'Setup'
const ObserveL = 'Observe'
const WaitL = 'Wait'

interface Command<L> {
  readonly _type: L
  readonly source: Prefix
  readonly commandName: string
  readonly maybeObsId: string[]
  readonly paramSet: Parameter<Key>[]
}

const Command = <L extends string>(_type: L): D.Decoder<unknown, Command<L>> =>
  D.type({
    _type: D.literal(_type),
    source: PrefixD,
    commandName: D.string,
    paramSet: D.array(ParameterD),
    maybeObsId: D.array(D.string)
  })

export class Setup implements Command<typeof SetupL> {
  readonly _type = SetupL
  constructor(
    readonly source: Prefix,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {}
}

export class Observe implements Command<typeof ObserveL> {
  readonly _type = ObserveL
  constructor(
    readonly source: Prefix,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {}
}

export class Wait implements Command<typeof WaitL> {
  readonly _type = WaitL
  constructor(
    readonly source: Prefix,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {}
}

const SetupD: D.Decoder<unknown, Setup> = Command(SetupL)
const ObserveD: D.Decoder<unknown, Observe> = Command(ObserveL)
const WaitD: D.Decoder<unknown, Wait> = Command(WaitL)

export const SequenceCommand = D.sum('_type')({
  [SetupL]: SetupD,
  [ObserveL]: ObserveD,
  [WaitL]: WaitD
})

export type ControlCommand = Setup | Observe
export type SequenceCommand = Setup | Observe | Wait
