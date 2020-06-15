import { Parameter } from './Parameter'
import { Units } from './Units'
import { Key, KeyTag, KeyType } from './Key'

export class BaseKey<T extends Key> {
  constructor(readonly keyName: string, readonly keyTag: KeyTag<T>, readonly units: Units) {}

  set(values: KeyType<T>[]): Parameter<T> {
    return new Parameter(this.keyName, this.keyTag, values, this.units)
  }
}
