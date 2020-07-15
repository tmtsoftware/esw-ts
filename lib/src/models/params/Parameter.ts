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
    D.parse((record) =>
      pipe(
        KeyTag.decode(Object.keys(record)[0]),
        E.chain((keyTag) =>
          pipe(
            Keys[keyTag].decode(record[keyTag]),
            E.map(
              (body) => new Parameter(body.keyName, keyTag as any, body.values as any, body.units)
            )
          )
        )
      )
    )
  )

export const ParameterD: D.Decoder<unknown, Parameter<Key>> = D.lazy(
  'Parameter<Key>',
  decodeParameter
)

export const ParamSet = D.type({ paramSet: D.array(ParameterD) })
