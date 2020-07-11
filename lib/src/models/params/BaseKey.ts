import { Key } from './Key'
import { Parameter } from './Parameter'
import { Units } from './Units'

export class BaseKey<T extends Key> {
  constructor(readonly keyName: string, readonly keyTag: T['KeyTag'], readonly units: Units) {}

  set(values: T['KeyType'][]): Parameter<T> {
    return new Parameter(this.keyName, this.keyTag, values, this.units)
  }
}
