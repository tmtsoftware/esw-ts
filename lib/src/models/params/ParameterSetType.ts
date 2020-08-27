import { Option } from '../../utils/types'
import { BaseKey } from './BaseKey'
import { Key } from './Key'
import { Parameter } from './Parameter'

export abstract class ParameterSetType<T extends ParameterSetType<T>> {
  abstract readonly paramSet: Parameter<Key>[]

  abstract create(data: Parameter<Key>[]): T

  typeName(): string {
    return this.constructor.name
  }

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
    return this.removeByKeyName(this, key.keyName)
  }

  private doAdd<P extends Parameter<Key>>(c: ParameterSetType<T>, parameter: P): T {
    return this.create(this.removeByKeyName(c, parameter.keyName).paramSet.concat(parameter))
  }

  private getByKeyName<P>(parametersIn: Parameter<Key>[], keyName: string): Option<P> {
    return parametersIn.find((p) => p.keyName == keyName) as Option<P>
  }

  private removeParam(paramSet: Parameter<Key>[], param: Parameter<Key>) {
    return paramSet.filter((p) => p !== param)
  }

  private removeByKeyName<P extends Parameter<Key>>(c: ParameterSetType<T>, keyName: string): T {
    const f: Option<P> = this.getByKeyName(c.paramSet, keyName)
    return f ? this.create(this.removeParam(c.paramSet, f)) : (c as T)
  }
}
