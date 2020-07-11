import * as t from 'io-ts'
import { Key } from './Key'
import { Parameter, ParameterV } from './Parameter'

export interface Struct {
  paramSet: Array<Parameter<Key>>
}

export const Struct: t.Type<Struct, unknown> = t.recursion('Struct', () =>
  t.type({
    paramSet: t.array(ParameterV)
  })
)
