import { Key, KTag } from './Key'
import { Parameter } from './Parameter'
import { Units } from './Units'

export class ChoiceKeyFactory<T extends Key, L extends string[]> {
  constructor(
    readonly keyName: string,
    readonly keyTag: KTag<T>,
    readonly choices: L,
    readonly units: Units
  ) {}

  set = (...values: L[number][]) => new Parameter(this.keyName, this.keyTag, values, this.units)
}

export const makeChoices = <L extends string[]>(...args: L) => args
