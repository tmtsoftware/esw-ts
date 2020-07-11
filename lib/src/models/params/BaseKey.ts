import { Key, KTag, KType } from './Key'
import { Parameter } from './Parameter'
import { Units } from './Units'

export class BaseKey<T extends Key> {
  constructor(readonly keyName: string, readonly keyTag: KTag<T>, readonly units: Units) {}

  set(values: KType<T>[]): Parameter<T> {
    return new Parameter(this.keyName, this.keyTag, values, this.units)
  }
}
