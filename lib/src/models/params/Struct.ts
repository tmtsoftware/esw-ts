import * as D from 'io-ts/lib/Decoder'
import { Decoder } from '../../utils/Decoder'
import { Key } from './Key'
import { Parameter, ParamSet } from './Parameter'

export interface Struct {
  paramSet: Parameter<Key>[]
}

export const Struct: Decoder<Struct> = D.lazy('Struct', () => ParamSet)
