import { requirement } from '../../utils/Utils'
import { Key, KTag } from './Key'
import { Parameter } from './Parameter'
import { Units } from './Units'

export class ChoiceKeyFactory<T extends Key, L extends readonly string[]> {
  constructor(
    readonly keyName: string,
    readonly keyTag: KTag<T>,
    readonly choices: L,
    readonly units: Units
  ) {}

  set = (...values: L[number][]) => {
    requirement(
      values.every((v) => this.choices.includes(v)),
      `Bad choice for key: ${this.keyName} which must be one of: ${this.choices}`
    )

    return new Parameter(this.keyName, this.keyTag, values, this.units)
  }
}
