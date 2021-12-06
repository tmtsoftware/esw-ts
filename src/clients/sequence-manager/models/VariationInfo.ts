import type { Subsystem } from '../../../models'
import { splitSubsystemComponentName, parseSubsystemStr } from '../../../utils/Utils'
import { Variation } from './Variation'

const SEPARATOR = '.'

/**
 * @category Sequence Manager Service
 */
export class VariationInfo {
  constructor(readonly subsystem: Subsystem, readonly variation?: Variation) {}

  static fromString(str: string) {
    const [sub, variation] = splitSubsystemComponentName(str, SEPARATOR)
    if (!variation) return new VariationInfo(parseSubsystemStr(sub))
    return new VariationInfo(parseSubsystemStr(sub), new Variation(variation))
  }

  toJSON(): string {
    return this.variation ? this.subsystem + '.' + this.variation.name : this.subsystem
  }
}
