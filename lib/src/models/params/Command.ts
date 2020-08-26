import * as D from 'io-ts/lib/Decoder'
import { ciLiteral, Decoder } from '../../utils/Decoder'
import { Key } from './Key'
import { Parameter, ParameterD } from './Parameter'
import { Prefix, PrefixD } from './Prefix'

// ##################### Decoders #####################
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

const mkCommandD = <L extends string>(_type: L): Decoder<Command<L>> =>
  D.type({
    _type: ciLiteral(_type),
    source: PrefixD,
    commandName: D.string,
    paramSet: D.array(ParameterD),
    maybeObsId: D.array(D.string)
  })

const SetupD: Decoder<Setup> = mkCommandD(SetupL)
const ObserveD: Decoder<Observe> = mkCommandD(ObserveL)
const WaitD: Decoder<Wait> = mkCommandD(WaitL)

export const SequenceCommandD: Decoder<SequenceCommand> = D.sum('_type')({
  [SetupL]: SetupD,
  [ObserveL]: ObserveD,
  [WaitL]: WaitD
})

export const ControlCommandD: Decoder<ControlCommand> = D.sum('_type')({
  [SetupL]: SetupD,
  [ObserveL]: ObserveD
})

// ######################################################

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

export type ControlCommand = Setup | Observe
export type SequenceCommand = Setup | Observe | Wait
