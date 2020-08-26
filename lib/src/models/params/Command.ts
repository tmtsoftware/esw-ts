import { pipe } from 'fp-ts/pipeable'
import * as D from 'io-ts/lib/Decoder'
import { ciLiteral, Decoder } from '../../utils/Decoder'
import { Key } from './Key'
import { Parameter, ParameterD } from './Parameter'
import { ParameterSetType } from './ParameterSetType'
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

type Constructor<L, T extends Command<L>> = new (
  source: Prefix,
  commandName: string,
  paramSet: Parameter<Key>[],
  maybeObsId: string[]
) => T

const Command = <L extends string, T extends Command<L>>(
  _type: L,
  apply: Constructor<L, T>
): Decoder<T> =>
  pipe(
    D.type({
      _type: ciLiteral(_type),
      source: PrefixD,
      commandName: D.string,
      paramSet: D.array(ParameterD),
      maybeObsId: D.array(D.string)
    }),
    D.parse((command) =>
      D.success(
        new apply(command.source, command.commandName, command.paramSet, command.maybeObsId)
      )
    )
  )

export class Setup extends ParameterSetType<Setup> implements Command<typeof SetupL> {
  readonly _type = SetupL

  constructor(
    readonly source: Prefix,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {
    super(paramSet)
  }

  create(data: Parameter<Key>[]): Setup {
    return new Setup(this.source, this.commandName, data, this.maybeObsId)
  }
}

export class Observe extends ParameterSetType<Observe> implements Command<typeof ObserveL> {
  readonly _type = ObserveL

  constructor(
    readonly source: Prefix,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {
    super(paramSet)
  }

  create(data: Parameter<Key>[]): Observe {
    return new Observe(this.source, this.commandName, data, this.maybeObsId)
  }
}

export class Wait extends ParameterSetType<Wait> implements Command<typeof WaitL> {
  readonly _type = WaitL

  constructor(
    readonly source: Prefix,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {
    super(paramSet)
  }

  create(data: Parameter<Key>[]): Wait {
    return new Wait(this.source, this.commandName, data, this.maybeObsId)
  }
}

const SetupD: Decoder<Setup> = Command(SetupL, Setup)
const ObserveD: Decoder<Observe> = Command(ObserveL, Observe)
const WaitD: Decoder<Wait> = Command(WaitL, Wait)

export const SequenceCommand: Decoder<SequenceCommand> = D.sum('_type')({
  [SetupL]: SetupD,
  [ObserveL]: ObserveD,
  [WaitL]: WaitD
})

export const ControlCommand: Decoder<ControlCommand> = D.sum('_type')({
  [SetupL]: SetupD,
  [ObserveL]: ObserveD
})

export type ControlCommand = Setup | Observe
export type SequenceCommand = Setup | Observe | Wait
