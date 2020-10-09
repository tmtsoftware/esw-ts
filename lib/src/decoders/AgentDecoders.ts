import * as D from 'io-ts/lib/Decoder'
import type { Failed, Killed, KillResponse, Spawned, SpawnResponse } from '..'
import { ciLiteral, Decoder } from '../utils/Decoder'

const SpawnedL = 'Spawned'
const KilledL = 'Killed'
const FailedL = 'Failed'

const SpawnedD: Decoder<Spawned> = D.type({
  _type: ciLiteral(SpawnedL)
})

const KilledD: Decoder<Killed> = D.type({
  _type: ciLiteral(KilledL)
})

const FailedD: Decoder<Failed> = D.type({
  _type: ciLiteral(FailedL),
  msg: D.string
})

export const SpawnResponseD: Decoder<SpawnResponse> = D.sum('_type')({
  [SpawnedL]: SpawnedD,
  [FailedL]: FailedD
})

export const KillResponseD: Decoder<KillResponse> = D.sum('_type')({
  [KilledL]: KilledD,
  [FailedL]: FailedD
})
