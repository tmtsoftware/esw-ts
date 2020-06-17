import { Parameter } from './Parameter'
import { Units } from './Units'
import { Key, KeyTag } from './Key'

export class ChoiceKeyFactory<T extends Key> {
  constructor(readonly keyName: string, readonly keyTag: KeyTag<T>, readonly units: Units) {}

  makeChoices = <S extends string[]>(...args: S) => args

  setChoice = <S extends string[]>(choices: S, values: typeof choices[number][]) =>
    new Parameter(this.keyName, this.keyTag, values, this.units)
}
