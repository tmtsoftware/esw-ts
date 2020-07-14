import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import * as D from 'io-ts/lib/Decoder'
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

const decodeParameter = () =>
  pipe(
    D.UnknownRecord,
    D.parse((record) => {
      const kt = Object.keys(record)[0]
      const keyTagE = KeyTag.decode(kt)
      if (E.isLeft(keyTagE)) return keyTagE
      const keyTag = keyTagE.right
      const paramDecoder = Keys[keyTag]
      const bodyE = paramDecoder.decode(record[keyTag])
      if (E.isLeft(bodyE)) return bodyE
      const body = bodyE.right
      const p = new Parameter(body.keyName, keyTag as any, body.values as any, body.units)
      return D.success(p)
    })
  )

export const ParameterD: D.Decoder<Parameter<Key>> = D.lazy('Parameter<Key>', decodeParameter)

export const ParamSet = D.type({ paramSet: D.array(ParameterD) })
