import { Option } from '../..'
import { BaseKey } from './BaseKey'
import { Key } from './Key'
import { Parameter } from './Parameter'

export abstract class ParameterSetType<T extends ParameterSetType<T>> {
  abstract readonly paramSet: Parameter<Key>[]

  abstract create(data: Parameter<Key>[]): T

  size(): number {
    return this.paramSet.length
  }

  add<P extends Parameter<Key>>(parameter: P): T {
    return this.doAdd(this, parameter)
  }

  madd<P extends Parameter<Key>>(parametersToAdd: P[]): T {
    return parametersToAdd.reduce<ParameterSetType<T>>(this.doAdd.bind(this), this) as T
  }

  get<S extends Key>(key: BaseKey<S>): Option<Parameter<S>> {
    return this.paramSet.find(
      (param) => param.keyName == key.keyName && param.keyTag == key.keyTag
    ) as Option<Parameter<S>>
  }

  exists<S extends Key>(key: BaseKey<S>): boolean {
    return this.get(key) !== undefined
  }

  remove<S extends Key>(key: BaseKey<S>): T {
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
