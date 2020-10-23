import type { Key } from './Key'
import type { Parameter } from './Parameter'
import { ParameterSetType } from './ParameterSetType'

/**
 * A result containing parameters for command response
 * @category Params
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
