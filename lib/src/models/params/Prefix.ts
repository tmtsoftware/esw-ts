import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import * as D from 'io-ts/lib/Decoder'
import type { Decoder } from '../../utils/Decoder'
import { requirement } from '../../utils/Utils'
import { Subsystem, SubsystemD } from './Subsystem'

const SEPARATOR = '.'

const validateComponentName = (name: string) => {
  requirement(name === name.trim(), `component name ${name} has leading/trailing whitespace`)
  requirement(!name.includes('-'), `component name ${name} has '-'`)
}

const parseSubsystemStr = (subsystem: string): Subsystem => {
  const s = SubsystemD.decode(subsystem)
  if (E.isLeft(s)) throw Error(`Subsystem: ${subsystem} is invalid`)
  return s.right
}

const splitSubsystemComponentName = (prefixStr: string) => {
  const stringParts = prefixStr.split(SEPARATOR)
  const sub = stringParts[0]
  const componentName = stringParts.slice(1).join(SEPARATOR)
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
    return this.subsystem + SEPARATOR + this.componentName
  }
}

const parsePrefix = (prefixStr: string): E.Either<Error, Prefix> =>
  E.tryCatch(
    () => Prefix.fromString(prefixStr),
    (e) => (e instanceof Error ? e : new Error('unknown error'))
  )

export const PrefixD: Decoder<Prefix> = pipe(
  D.string,
  D.parse((str) => {
    const p = parsePrefix(str)
    return E.isRight(p) ? D.success(p.right) : D.failure(str, p.left.message)
  })
)
