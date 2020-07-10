import { Key, KeyTag, KeyType } from './Key'
import { Units } from './Units'

export class Parameter<T extends Key> {
  constructor(
    readonly keyName: string,
    readonly keyTag: KeyTag<T>,
    readonly values: KeyType<T>[],
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
