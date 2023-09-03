/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Subsystem } from './Subsystem'
import { requirement, splitSubsystemComponentName, parseSubsystemStr } from '../../utils/Utils'

const SEPARATOR = '.'

const validateComponentName = (name: string) => {
  requirement(name === name.trim(), `component name ${name} has leading/trailing whitespace`)
  requirement(!name.includes('-'), `component name ${name} has '-'`)
}

/**
 * A top level key for a parameter set: combination of subsystem and the subsystem's prefix
 * e.g. tcs.filter.wheel, wfos.prog.cloudcover, etc
 * @class
 * @category Params
 */
export class Prefix {
  /**
   * @note Component name should not contain
   *  - leading or trailing spaces
   *  - and hyphen (-)
   * @param subsystem     component subsystem - tcs (TCS), wfos (WFOS)
   * @param componentName component name - filter.wheel, prog.cloudcover
   * @constructor
   */
  constructor(
    readonly subsystem: Subsystem,
    readonly componentName: string
  ) {
    validateComponentName(componentName)
  }

  /**
   * Creates a Prefix based on the given value of format tcs.filter.wheel and splits it to have tcs as `subsystem` and filter.wheel
   * as `componentName`
   *
   * @param prefixStr of format tcs.filter.wheel
   * @return a Prefix instance
   */
  static fromString = (prefixStr: string): Prefix => {
    const [sub, componentName] = splitSubsystemComponentName(prefixStr, SEPARATOR)
    validateComponentName(componentName)
    return new Prefix(parseSubsystemStr(sub), componentName)
  }

  toJSON() {
    return this.subsystem + SEPARATOR + this.componentName
  }
}
