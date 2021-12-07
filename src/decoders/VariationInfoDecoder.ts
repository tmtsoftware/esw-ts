import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/lib/Decoder'
import { VariationInfo } from '../clients/sequence-manager/models/VariationInfo'
import type { Decoder } from './Decoder'

const parseVariationInfo = (variationInfo: string): E.Either<Error, VariationInfo> =>
  E.tryCatch(
    () => VariationInfo.fromString(variationInfo),
    (e) => (e instanceof Error ? e : new Error('unknown error'))
  )

export const VariationInfoD: Decoder<VariationInfo> = pipe(
  D.string,
  D.parse((str) => {
    const p = parseVariationInfo(str)
    return E.isRight(p) ? D.success(p.right) : D.failure(str, p.left.message)
  })
)
