import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'
import { Key, Keys, KeyTag, KTag, KType } from './Key'
import { Units } from './Units'

export class Parameter<T extends Key> {
  constructor(
    readonly keyName: string,
    readonly keyTag: KTag<T>,
    readonly values: KType<T>[],
    readonly units: Units
  ) {}

  toJSON() {
    return {
      [this.keyTag]: {
        keyName: this.keyName,
        values: this.values,
        units: this.units
      }
    }
  }
}

const isParameter = <T extends Key>(input: unknown): input is Parameter<T> => {
  if (t.UnknownRecord.is(input)) {
    const keyTag = Object.keys(input)[0]
    if (KeyTag.is(keyTag)) return Keys[keyTag].props.paramDecoder.is(input[keyTag])
  }
  return false
}

const decodeParameter = <T extends Key>(input: unknown): t.Validation<Parameter<T>> =>
  pipe(
    t.UnknownRecord.decode(input),
    E.chain((record) =>
      pipe(
        KeyTag.decode(Object.keys(record)[0]),
        E.chain((keyTag) =>
          pipe(
            Keys[keyTag].props.paramDecoder.decode(record[keyTag]),
            E.map((body) => new Parameter(body.keyName, keyTag, body.values, body.units))
          )
        )
      )
    )
  )

export const ParameterV: t.Type<Parameter<Key>, unknown> = t.recursion(
  'Parameter<Key>',
  () => new t.Type('Parameter', isParameter, decodeParameter, (param) => param.toJSON())
)

export const ParamSet = t.type({ paramSet: t.array(ParameterV) })
