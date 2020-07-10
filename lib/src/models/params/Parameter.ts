import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'
import { IntArrayKey, IntKey, Key, KeyTag, KeyType, StringKey, StructKey } from './Key'
import { StructV } from './Struct'
import { Units, UnitsV } from './Units'

export class Parameter<T extends Key> {
  constructor(
    readonly keyName: string,
    readonly keyTag: KeyTag<T>,
    readonly values: KeyType<T>[],
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

const encodeParameter = (parameter: Parameter<Key>) => JSON.stringify(parameter.toJSON())

const isParameter = (input: unknown): input is Parameter<Key> => input instanceof Parameter

type ParameterJson<T extends Key> = {
  keyName: string
  values: T['KeyType'][]
  units: Units
}
type ParameterJsonResult<T extends Key> = E.Either<t.Errors, ParameterJson<T>>

const ParamBodyDecoder = <T extends Key>(valuesDec: t.Type<T['KeyType'], unknown>) =>
  t.type({
    keyName: t.string,
    values: t.array(valuesDec),
    units: UnitsV
  })

const decodeKeyTag = (record: Record<string, unknown>) => KeyTagV.decode(Object.keys(record)[0])

const decodeParamBody = <T extends Key>(
  keyTag: KeyTagT,
  record: Record<string, unknown>
): ParameterJsonResult<T> => ParamDecodersMap[keyTag].decode(record[keyTag])

const toParameter = <T extends Key>(keyTag: KeyTagT, rawParam: ParameterJson<T>) =>
  new Parameter(rawParam.keyName, keyTag, rawParam.values, rawParam.units)

const decodeParameter = <T extends Key>(input: unknown): t.Validation<Parameter<T>> =>
  pipe(
    t.UnknownRecord.decode(input),
    E.chain((record) =>
      pipe(
        decodeKeyTag(record),
        E.chain((keyTag) =>
          pipe(
            decodeParamBody<T>(keyTag, record),
            E.map((body) => toParameter<T>(keyTag, body))
          )
        )
      )
    )
  )

const ParamDecodersMap = {
  IntKey: ParamBodyDecoder<IntKey>(t.number),
  StringKey: ParamBodyDecoder<StringKey>(t.string),
  IntArrayKey: ParamBodyDecoder<IntArrayKey>(t.array(t.number)),
  StructKey: ParamBodyDecoder<StructKey>(StructV)
}

const KeyTagV = t.keyof(ParamDecodersMap)
type KeyTagT = t.TypeOf<typeof KeyTagV>

export const ParameterV: t.Type<Parameter<Key>, unknown> = new t.Type(
  'Parameter',
  isParameter,
  decodeParameter,
  encodeParameter
)
export const ParamSetV = t.type({ paramSet: t.array(ParameterV) })
