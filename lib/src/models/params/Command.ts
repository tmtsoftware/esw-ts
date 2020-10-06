import { pipe } from 'fp-ts/pipeable'
import * as D from 'io-ts/lib/Decoder'
import type { Option } from '../..'
import { ciLiteral, Decoder } from '../../utils/Decoder'
import type { Key } from './Key'
import { Parameter, ParameterD } from './Parameter'
import { ParameterSetType } from './ParameterSetType'
import { Prefix, PrefixD } from './Prefix'

// ######################################################
const SetupL = 'Setup'
const ObserveL = 'Observe'
const WaitL = 'Wait'

/**
 * Common trait representing commands in TMT like Setup, Observe and Wait
 * @interface
 */
interface Command<L> {
  readonly _type: L
  readonly source: Prefix
  readonly commandName: string
  readonly maybeObsId: Option<string>
  readonly paramSet: Parameter<Key>[]
}

type Constructor<L, T extends Command<L>> = new (
  source: Prefix,
  commandName: string,
  paramSet: Parameter<Key>[],
  maybeObsId: Option<string>
) => T

/**
 * Setup Command
 * @class
 */
export class Setup extends ParameterSetType<Setup> implements Command<typeof SetupL> {
  readonly _type = SetupL

  /**
   * A parameter set for setting telescope and instrument parameters.
   *
   * @param source prefix representing source of the command
   * @param commandName the name of the command
   * @param maybeObsId an optional obsId for command
   * @param paramSet an optional set of parameters
   * @return a new instance of Setup
   * @constructor
   */
  constructor(
    readonly source: Prefix,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[] = [],
    readonly maybeObsId: Option<string> = undefined
  ) {
    super()
  }

  /**
   * Create a new Setup instance when a parameter is added or removed
   *
   * @param data set of parameters
   * @return a new instance of Setup with provided data
   */
  create(data: Parameter<Key>[]): Setup {
    return new Setup(this.source, this.commandName, data, this.maybeObsId)
  }
}

/**
 * Observe Command
 * @class
 */
export class Observe extends ParameterSetType<Observe> implements Command<typeof ObserveL> {
  readonly _type = ObserveL
  /**
   * A parameter set for setting telescope and instrument parameters.
   *
   * @param source prefix representing source of the command
   * @param commandName the name of the command
   * @param maybeObsId an optional obsId for command
   * @param paramSet an optional set of parameters
   * @return a new instance of Observe
   * @constructor
   */
  constructor(
    readonly source: Prefix,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[] = [],
    readonly maybeObsId: Option<string> = undefined
  ) {
    super()
  }
  /**
   * Create a new Observe instance when a parameter is added or removed
   *
   * @param data set of parameters
   * @return a new instance of Observe with provided data
   */
  create(data: Parameter<Key>[]): Observe {
    return new Observe(this.source, this.commandName, data, this.maybeObsId)
  }
}

export class Wait extends ParameterSetType<Wait> implements Command<typeof WaitL> {
  readonly _type = WaitL
  /**
   * A parameter set for setting telescope and instrument parameters.
   *
   * @param source prefix representing source of the command
   * @param commandName the name of the command
   * @param maybeObsId an optional obsId for command
   * @param paramSet an optional set of parameters
   * @return a new instance of Wait
   * @constructor
   */
  constructor(
    readonly source: Prefix,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[] = [],
    readonly maybeObsId: Option<string> = undefined
  ) {
    super()
  }
  /**
   * Create a new Wait instance when a parameter is added or removed
   *
   * @param data set of parameters
   * @return a new instance of Wait with provided data
   */
  create(data: Parameter<Key>[]): Wait {
    return new Wait(this.source, this.commandName, data, this.maybeObsId)
  }
}

/**
 * Marker type for control parameter sets which is applicable to Assembly and HCD type of components
 */
export type ControlCommand = Setup | Observe

/**
 * Marker type for sequence parameter sets which is applicable to Sequencer type of components
 */
export type SequenceCommand = Setup | Observe | Wait

// ##################### Decoders #####################
const mkCommandD = <L extends string, T extends Command<L>>(
  _type: L,
  apply: Constructor<L, T>
): Decoder<T> =>
  pipe(
    D.intersect(
      D.type({
        _type: ciLiteral(_type),
        source: PrefixD,
        commandName: D.string,
        paramSet: D.array(ParameterD)
      })
    )(D.partial({ maybeObsId: D.string })),
    D.parse((command) =>
      D.success(
        new apply(command.source, command.commandName, command.paramSet, command.maybeObsId)
      )
    )
  )

const SetupD: Decoder<Setup> = mkCommandD(SetupL, Setup)
const ObserveD: Decoder<Observe> = mkCommandD(ObserveL, Observe)
const WaitD: Decoder<Wait> = mkCommandD(WaitL, Wait)

export const SequenceCommandD: Decoder<SequenceCommand> = D.sum('_type')({
  [SetupL]: SetupD,
  [ObserveL]: ObserveD,
  [WaitL]: WaitD
})

export const ControlCommandD: Decoder<ControlCommand> = D.sum('_type')({
  [SetupL]: SetupD,
  [ObserveL]: ObserveD
})
