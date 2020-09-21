import { pipe } from 'fp-ts/pipeable'
import * as D from 'io-ts/lib/Decoder'
import type { Decoder } from '../../utils/Decoder'
import type { Key } from './Key'
import { Parameter, ParameterD } from './Parameter'
import { ParameterSetType } from './ParameterSetType'

export class Result extends ParameterSetType<Result> {
  constructor(readonly paramSet: Parameter<Key>[] = []) {
    super()
  }

  create(data: Parameter<Key>[]): Result {
    return new Result(data)
  }
}

export const ResultD: Decoder<Result> = pipe(
  D.type({
    paramSet: D.array(ParameterD)
  }),
  D.parse((r) => D.success(new Result(r.paramSet)))
)
