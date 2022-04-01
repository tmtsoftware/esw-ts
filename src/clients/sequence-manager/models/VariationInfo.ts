/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ObsMode } from '..'
import { Prefix, Subsystem } from '../../../models'
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

  prefix(obsMode: ObsMode) {
    return new Prefix(this.subsystem, this.variation ? obsMode.name + SEPARATOR + this.variation.name : obsMode.name)
  }

  toJSON(): string {
    return this.variation ? this.subsystem + SEPARATOR + this.variation.name : this.subsystem
  }
}
