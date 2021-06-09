import type { Key, KTag, KType } from './Key'
import type { Units } from './Units'

/**
 * Parameter represents a KeyName, KeyTag, array of values and units applicable to values. Parameter sits as payload for
 * sending commands and events between components.
 * @Category Params
 */
export class Parameter<T extends Key> {
  /**
   * @tparam T the type of items this parameter holds
   * @param keyName the name of the key
   * @param keyTag reference to an object of type KeyType[S]
   * @param values an Array of values of type S
   * @param units applicable units
   */
  constructor(
    readonly keyName: string,
    readonly keyTag: KTag<T>,
    readonly values: KType<T>[],
    readonly units: Units
  ) {}

  toJSON() {
    return {
      [this.keyTag]: {
        keyName: this.keyName,
        values: this.values,
        units: this.units
      }
    }
  }
}
