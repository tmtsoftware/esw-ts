import type { Option } from '../..'
import type { BaseKeyType } from './BaseKeyType'
import type { Key } from './Key'
import type { Parameter } from './Parameter'

/**
 * Abstract class for various parameter set types (commands or events)
 *
 * @tparam T the subclass of ParameterSetType
 * @internal
 */
export abstract class ParameterSetType<T extends ParameterSetType<T>> {
  abstract readonly paramSet: Parameter<Key>[]

  abstract create(data: Parameter<Key>[]): T

  /**
   * The number of parameters in this parameter set
   *
   * @return the number of parameters in the parameter set
   */
  size(): number {
    return this.paramSet.length
  }

  /**
   * Adds a parameter to the parameter set
   *
   * @param parameter the parameter to add
   * @tparam P the Parameter type
   * @return a new instance of this parameter set with the given parameter added
   */
  add<P extends Parameter<Key>>(parameter: P): T {
    return this.doAdd(this, parameter)
  }

  /**
   * Adds several parameters to the parameter set
   *
   * @note madd ensures check for duplicate key
   * @param parametersToAdd the list of parameters to add to the parameter set
   * @tparam P must be a subclass of Parameter
   * @return a new instance of this parameter set with the given parameter added
   */
  madd<P extends Parameter<Key>>(parametersToAdd: P[]): T {
    return parametersToAdd.reduce<ParameterSetType<T>>(this.doAdd.bind(this), this) as T
  }

  /**
   * Returns an Option with the parameter for the key if found, otherwise undefined
   *
   * @param key the Key to be used for lookup
   * @tparam S the value type
   * @return the parameter for the key, if found
   */
  get<S extends Key>(key: BaseKeyType<S>): Option<Parameter<S>> {
    return this.paramSet.find(
      (param) => param.keyName == key.keyName && param.keyTag == key.keyTag
    ) as Option<Parameter<S>>
  }

  /**
   * Returns true if the key exists in the parameter set
   *
   * @param key the key to check for
   * @return true if the key is found
   * @tparam S the Key value
   */
  exists<S extends Key>(key: BaseKeyType<S>): boolean {
    return this.get(key) !== undefined
  }

  /**
   * Remove a parameter from the parameter set by key
   *
   * @param key the Key to be used for removal
   * @tparam S the Key value
   * @return a new T, where T is a parameter set child with the key removed or identical if the key is not present
   */
  remove<S extends Key>(key: BaseKeyType<S>): T {
    return this.create(this.removeByKeyName(this.paramSet, key.keyName))
  }

  private doAdd<P extends Parameter<Key>>(c: ParameterSetType<T>, parameter: P): T {
    return this.create(this.removeByKeyName(c.paramSet, parameter.keyName).concat(parameter))
  }

  private getByKeyName<P>(parametersIn: Parameter<Key>[], keyName: string): Option<P> {
    return parametersIn.find((p) => p.keyName == keyName) as Option<P>
  }

  private removeParam(paramSet: Parameter<Key>[], param: Parameter<Key>) {
    return paramSet.filter((p) => p !== param)
  }

  private removeByKeyName(paramSet: Parameter<Key>[], keyName: string): Parameter<Key>[] {
    const maybeParameter: Option<Parameter<Key>> = this.getByKeyName(paramSet, keyName)
    return maybeParameter ? this.removeParam(paramSet, maybeParameter) : paramSet
  }
}
