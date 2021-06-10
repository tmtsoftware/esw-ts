import { requirement } from '../../utils/Utils'
import type { Key, KTag } from './Key'
import { Parameter } from './Parameter'
import type { Units } from './Units'

/**
 * A Factory for creating Choice key
 * @class
 * @internal
 */
export class ChoiceKeyFactory<T extends Key, L extends readonly string[]> {
  /**
   * A key for a choice item similar to an enumeration
   *
   * @param keyName the name of the key
   * @param keyTag reference to an object of type KeyType[Choice]
   * @param choices the available choices, the values set must be in the choices
   * @param units the unit for the choice key
   * @return Instance of ChoiceKeyFactory
   */
  constructor(
    readonly keyName: string,
    readonly keyTag: KTag<T>,
    readonly choices: L,
    readonly units: Units
  ) {}

  /**
   * Sets the values for the key using a variable number of arguments
   *
   * @param values one or more values
   * @return Parameter containing the key name, values, key tag and units
   */
  set(...values: L[number][]) {
    /**
     * Validates the input Seq of choices
     */
    requirement(
      values.every((v) => this.choices.includes(v)),
      `Bad choice for key: ${this.keyName} which must be one of: ${this.choices}`
    )

    return new Parameter(this.keyName, this.keyTag, values, this.units)
  }
}
