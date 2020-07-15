import { Key, KTag } from './Key'
import { Parameter } from './Parameter'
import { Units } from './Units'

export class ChoiceKeyFactory<T extends Key> {
  constructor(readonly keyName: string, readonly keyTag: KTag<T>, readonly units: Units) {}

  makeChoices = <L extends string[]>(...args: L) => args

  setChoice = <L extends string[]>(choices: L, values: typeof choices[number][]) =>
    new Parameter(this.keyName, this.keyTag, values, this.units)
}
