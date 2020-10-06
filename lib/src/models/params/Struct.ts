import { pipe } from 'fp-ts/pipeable'
import * as D from 'io-ts/lib/Decoder'
import type { Decoder } from '../../utils/Decoder'
import type { Key } from './Key'
import { Parameter, ParameterD } from './Parameter'
import { ParameterSetType } from './ParameterSetType'

/**
 * A configuration for setting telescope and instrument parameters
 * @class
 */
export class Struct extends ParameterSetType<Struct> {
  /**
   * @param paramSet a set of Parameters
   * @constructor
   */
  constructor(readonly paramSet: Parameter<Key>[] = []) {
    super()
  }
  /**
   * Create a new Struct instance when a parameter is added or removed
   *
   * @param data a set of parameters
   * @return a new instance of Struct with provided data
   */
  create(data: Parameter<Key>[]): Struct {
    return new Struct(data)
  }
}

export const StructD: Decoder<Struct> = D.lazy('Struct', () =>
  pipe(
    D.type({
      paramSet: D.array(ParameterD)
    }),
    D.parse((s) => D.success(new Struct(s.paramSet)))
  )
)
