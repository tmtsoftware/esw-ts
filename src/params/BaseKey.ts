import { Parameter } from './Parameter'
import { Units } from './Units'
import { Key, KeyTag, KeyType, Primitive } from './Key'

export class BaseKey<T extends Key> {
  constructor(
    readonly keyName: string,
    readonly keyTag: KeyTag<T>,
    readonly units: Units,
  ) {}
  set(values: KeyType<T>[]): Parameter<T> {
    return new Parameter(this.keyName, this.keyTag, values, this.units)
  }
}

export class ChoiceKeyFactory<T extends Key> {
  constructor(
    readonly keyName: string,
    readonly keyTag: KeyTag<T>,
    readonly units: Units
  ) {}

  makeChoices = <S extends Primitive[]>(...args: S) => args

  setChoice = <S extends Primitive[]>(
    choices: S,
    values: typeof choices[number][],
  ) => new Parameter(this.keyName, this.keyTag, values, this.units)
}
