import { pipe } from 'fp-ts/pipeable'
import * as D from 'io-ts/lib/Decoder'
import { Decoder } from '../../utils/Decoder'
import { Key } from './Key'
import { Parameter, ParameterD } from './Parameter'
import { ParameterSetType } from './ParameterSetType'

export class Struct extends ParameterSetType<Struct> {
  constructor(readonly paramSet: Parameter<Key>[]) {
    super()
  }

  create(data: Parameter<Key>[]): Struct {
    return new Struct(data)
  }
}

export const StructD: Decoder<Struct> = D.lazy('Struct', () =>
  pipe(
    D.type({
      paramSet: D.array(ParameterD)
    }),
    D.parse((s) => D.success(new Struct(s.paramSet)))
  )
)
