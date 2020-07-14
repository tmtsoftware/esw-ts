import * as D from 'io-ts/lib/Decoder'
import { Key } from './Key'
import { Parameter, ParamSet } from './Parameter'

export interface Struct {
  paramSet: Array<Parameter<Key>>
}

export const Struct: D.Decoder<Struct> = D.lazy('Struct', () => ParamSet)
