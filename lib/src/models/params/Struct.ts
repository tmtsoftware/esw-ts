import * as t from 'io-ts'
import { Key, Parameter, ParamSetV } from './Parameter'

export interface Struct {
  paramSet: Parameter<Key>[]
}

const isStruct = (input: unknown): input is Struct => !!input && !!(input as Struct).paramSet
const decodeStruct = (input: unknown): t.Validation<Struct> => ParamSetV.decode(input)
const encodeStruct = (parameter: Struct) => ParamSetV.encode(parameter)

export const StructV: t.Type<Struct, unknown> = new t.Type(
  'Struct',
  isStruct,
  decodeStruct,
  encodeStruct
)
