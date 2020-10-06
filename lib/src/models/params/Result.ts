import { pipe } from 'fp-ts/pipeable'
import * as D from 'io-ts/lib/Decoder'
import type { Decoder } from '../../utils/Decoder'
import type { Key } from './Key'
import { Parameter, ParameterD } from './Parameter'
import { ParameterSetType } from './ParameterSetType'
/**
 * A result containing parameters for command response
 */
export class Result extends ParameterSetType<Result> {
  /**
   * @param paramSet an optional set of parameters
   * @constructor
   */
  constructor(readonly paramSet: Parameter<Key>[] = []) {
    super()
  }
  /**
   * Create a new Result instance when a parameter is added or removed
   *
   * @param data set of parameters
   * @return a new instance of Result with provided data
   */
  create(data: Parameter<Key>[]): Result {
    return new Result(data)
  }
}

export const ResultD: Decoder<Result> = pipe(
  D.type({
    paramSet: D.array(ParameterD)
  }),
  D.parse((r) => D.success(new Result(r.paramSet)))
)
