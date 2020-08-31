import { pipe } from 'fp-ts/pipeable'
import * as D from 'io-ts/lib/Decoder'
import { Decoder } from '../../utils/Decoder'
import { Key } from './Key'
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

export class CurrentState extends ParameterSetType<CurrentState> {
  constructor(
    readonly prefix: Prefix,
    readonly stateName: string,
    readonly paramSet: Parameter<Key>[] = []
  ) {
    super()
  }

  create(data: Parameter<Key>[]): CurrentState {
    return new CurrentState(this.prefix, this.stateName, data)
  }
}
