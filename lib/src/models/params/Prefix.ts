import * as t from 'io-ts'
import { Subsystem } from './Subsystem'
import { requirement } from '../../utils/Utils'

const SEPARATOR = '.'

const validateComponentName = (name: string) => {
  requirement(name === name.trim(), `component name ${name} has leading/trailing whitespace`)
  requirement(!name.includes('-'), `component name ${name} has '-'`)
}

const parseSubsystemStr = (subsystem: string): Subsystem => {
  if (Subsystem.is(subsystem)) return subsystem
  else throw Error(`Subsystem: ${subsystem} is invalid`)
}

const splitSubsystemComponentName = (prefixStr: string) => {
  const stringL = prefixStr.split(SEPARATOR)
  const sub = stringL[0]
  const componentName = stringL.slice(1).join(SEPARATOR)
  return [sub, componentName]
}

export class Prefix {
  constructor(readonly subsystem: Subsystem, readonly componentName: string) {
    validateComponentName(componentName)
  }

  static fromString = (prefixStr: string): Prefix => {
    const [sub, componentName] = splitSubsystemComponentName(prefixStr)
    validateComponentName(componentName)
    return new Prefix(parseSubsystemStr(sub), componentName)
  }

  toJSON() {
    return PrefixV.encode(this)
  }
}

const decodePrefix = (input: unknown, context: t.Context): t.Validation<Prefix> =>
  typeof input === 'string'
    ? t.success(Prefix.fromString(input))
    : t.failure(input, context, `Failed to decode ${input} to Prefix model`)

const encodePrefix = (prefix: Prefix) => prefix.subsystem + SEPARATOR + prefix.componentName

const isPrefix = (input: unknown): input is Prefix => {
  if (t.string.is(input)) {
    const [sub, componentName] = splitSubsystemComponentName(input)
    return (
      Subsystem.is(sub) && componentName === componentName.trim() && !componentName.includes('-')
    )
  }
  return false
}

export const PrefixV: t.Type<Prefix, string> = new t.Type(
  'Prefix',
  isPrefix,
  decodePrefix,
  encodePrefix
)
