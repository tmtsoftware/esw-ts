import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'
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

const encodeParameter = (parameter: Parameter<Key>) => parameter.toJSON()

const isParameter = (input: unknown): input is Parameter<Key> => input instanceof Parameter

type ParameterJson<T extends Key> = {
  keyName: string
  values: KType<T>[]
  units: Units
}
type ParameterJsonResult<T extends Key> = E.Either<t.Errors, ParameterJson<T>>

const decodeKeyTag = (record: Record<string, unknown>) => KeyTag.decode(Object.keys(record)[0])

const decodeParamBody = <T extends Key>(
  keyTag: KeyTag,
  record: Record<string, unknown>
): ParameterJsonResult<T> => Keys[keyTag].props.paramDecoder.decode(record[keyTag])

const toParameter = <T extends Key>(keyTag: KeyTag, rawParam: ParameterJson<T>) =>
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

export const ParameterV: t.Type<Parameter<Key>, unknown> = t.recursion(
  'Parameter<Key>',
  () => new t.Type('Parameter', isParameter, decodeParameter, encodeParameter)
)
