import * as D from 'io-ts/lib/Decoder'
import { Decoder } from '../../utils/Decoder'
import { Key } from './Key'
import { Parameter, ParamSetD } from './Parameter'
export interface Struct {
  paramSet: Array<Parameter<Key>>
}

export const Struct: Decoder<Struct> = D.lazy('Struct', () => ParamSetD)
