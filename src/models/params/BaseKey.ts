import { Parameter } from 'models/params/Parameter'
import { Units } from 'models/params/Units'
import { Key, KeyTag, KeyType } from 'models/params/Key'

export class BaseKey<T extends Key> {
  constructor(readonly keyName: string, readonly keyTag: KeyTag<T>, readonly units: Units) {}

  set(values: KeyType<T>[]): Parameter<T> {
    return new Parameter(this.keyName, this.keyTag, values, this.units)
  }
}
