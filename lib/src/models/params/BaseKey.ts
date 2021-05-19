import type { Key, KTag, KType } from './Key'
import { Parameter } from './Parameter'
import type { Units } from './Units'

/**
 * A Generic Key class. Never meant to be instantiated directly.
 * @class
 * @internal
 */
export class BaseKey<T extends Key> {
  /**
   *
   * Constructor to create instances of Key with KeyTag
   *
   * @param keyName the name of the key
   * @param keyTag reference to an object of type KeyTag<T>
   * @param units applicable units
   * @return an instance of BaseKey<T>
   */
  constructor(readonly keyName: string, readonly keyTag: KTag<T>, readonly units: Units) {}

  /**
   * Sets the values for the key using a set of KeyType<T>
   *
   * @param values one or more values
   * @return a new instance of Parameter<T> containing the key name, key tag, values on the result and units)
   */
  set(values: KType<T>[]): Parameter<T> {
    return new Parameter(this.keyName, this.keyTag, values, this.units)
  }
}
