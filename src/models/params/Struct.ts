import type { Key } from './Key'
import type { Parameter } from './Parameter'
import { ParameterSetType } from './ParameterSetType'

/**
 * A configuration for setting telescope and instrument parameters
 * @class
 * @category Params
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
