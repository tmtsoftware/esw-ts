import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/lib/Decoder'
import { Decoder, object } from '../../utils/Decoder'
import { Key, KTag, KType, paramDecoders } from './Key'
import type { Units } from './Units'

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
    object(paramDecoders),
    D.parse(([key, body]) =>
      D.success(new Parameter(body.keyName, key as any, body.values as any, body.units))
    )
  )

export const ParameterD: Decoder<Parameter<Key>> = D.lazy('Parameter<Key>', decodeParameter)
