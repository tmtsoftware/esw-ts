import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import * as t from 'io-ts'
import * as D from 'io-ts/lib/Decoder'
import { requirement } from '../../utils/Utils'
import { Subsystem } from './Subsystem'

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

const parsePrefix = (prefixStr: string): E.Either<Error, Prefix> =>
  E.tryCatch(
    () => Prefix.fromString(prefixStr),
    (e) => (e instanceof Error ? e : new Error('unknown error'))
  )

const decodePrefix = (input: unknown, context: t.Context): t.Validation<Prefix> =>
  pipe(
    t.string.decode(input),
    E.chain((str) => {
      const p = parsePrefix(str)
      if (E.isRight(p)) return t.success(p.right)
      else return t.failure(input, context, p.left.message)
    })
  )

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

export const PrefixD: D.Decoder<Prefix> = pipe(
  D.string,
  D.parse((str) => {
    const p = parsePrefix(str)
    if (E.isRight(p)) return D.success(p.right)
    else return D.failure(str, p.left.message)
  })
)
