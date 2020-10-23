import type { Key } from './Key'
import type { Parameter } from './Parameter'
import { ParameterSetType } from './ParameterSetType'
import type { Prefix } from './Prefix'

/**
 * A State variable that indicates the 'current' or actual state.
 * @category Params
 */
export class CurrentState extends ParameterSetType<CurrentState> {
  /**
   * @param prefix    identifies the target subsystem
   * @param stateName identifies the name of the state
   * @param paramSet  an optional initial set of items (keys with values)
   */
  constructor(
    readonly prefix: Prefix,
    readonly stateName: string,
    readonly paramSet: Parameter<Key>[] = []
  ) {
    super()
  }

  /**
   * Create a new CurrentState instance when a parameter is added or removed
   *
   * @param data set of parameters
   * @return a new instance of CurrentState with provided data
   */
  create(data: Parameter<Key>[]): CurrentState {
    return new CurrentState(this.prefix, this.stateName, data)
  }
}
