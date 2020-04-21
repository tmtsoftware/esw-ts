import { Subsystem } from './Subsystem'
import { requirement } from '../../utils/Utils'

const SEPARATOR = '.'

export class Prefix {
  constructor(readonly subsystem: Subsystem, readonly componentName: string) {
    requirement(
      componentName === componentName.trim(),
      `component name ${componentName} has leading/trailing whitespaces`,
    )
    requirement(!componentName.includes('-'), `component name ${componentName} has '-'`)
  }

  prefix: string = this.subsystem + SEPARATOR + this.componentName
}
