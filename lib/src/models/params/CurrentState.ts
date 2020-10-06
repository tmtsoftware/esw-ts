import { pipe } from 'fp-ts/pipeable'
import * as D from 'io-ts/lib/Decoder'
import type { Decoder } from '../../utils/Decoder'
import type { Key } from './Key'
import { Parameter, ParameterD } from './Parameter'
import { ParameterSetType } from './ParameterSetType'
import { Prefix, PrefixD } from './Prefix'

// todo: scala has state variable ADT (CurrentState | DemandState)
// _type: "CurrentState" prop present in json coming from scala
export const CurrentStateD: Decoder<CurrentState> = pipe(
  D.type({
    prefix: PrefixD,
    stateName: D.string,
    paramSet: D.array(ParameterD)
  }),
  D.parse((cs) => D.success(new CurrentState(cs.prefix, cs.stateName, cs.paramSet)))
)

/**
 * A State variable that indicates the 'current' or actual state.
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
