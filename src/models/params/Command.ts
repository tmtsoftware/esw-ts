import type { Option } from '../..'
import type { Key } from './Key'
import type { Parameter } from './Parameter'
import { ParameterSetType } from './ParameterSetType'
import type { Prefix } from './Prefix'

/**
 * @internal
 */
const SetupL = 'Setup'
/**
 * @internal
 */
const ObserveL = 'Observe'
/**
 * @internal
 */
const WaitL = 'Wait'
/**
 * @internal
 */
export type CommandType = typeof SetupL | typeof ObserveL | typeof WaitL

/**
 * A common trait representing commands in TMT like Setup, Observe and Wait
 * @tparam L CommandType
 * @interface
 * @internal
 */
export interface Command<CommandType> {
  readonly _type: CommandType
  readonly source: Prefix
  readonly commandName: string
  readonly maybeObsId: Option<string>
  readonly paramSet: Parameter<Key>[]
}

/**
 * @internal
 */
export type Constructor<L extends CommandType, T extends Command<L>> = new (
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

/**
 * Wait Command
 * @class
 */
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
 * @category Command Service
 */
export type ControlCommand = Setup | Observe

/**
 * Marker type for sequence parameter sets which is applicable to Sequencer type of components
 * @category Sequencer Service
 */
export type SequenceCommand = Setup | Observe | Wait
