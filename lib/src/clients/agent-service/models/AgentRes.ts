import * as D from 'io-ts/lib/Decoder'
import { ciLiteral } from '../../../utils/Decoder'
const SpawnedL = 'Spawned'
const KilledL = 'Killed'
const FailedL = 'Failed'

const SpawnedD = D.type({
  _type: ciLiteral(SpawnedL)
})

const KilledD = D.type({
  _type: ciLiteral(KilledL)
})

const FailedD = D.type({
  _type: ciLiteral(FailedL)
})

export const SpawnResponseD = D.sum('_type')({
  [SpawnedL]: SpawnedD,
  [FailedL]: FailedD
})

export const KillResponseD = D.sum('_type')({
  [KilledL]: KilledD,
  [FailedL]: FailedD
})

export type SpawnResponse = D.TypeOf<typeof SpawnResponseD>
export type KillResponse = D.TypeOf<typeof KillResponseD>
export type Spawned = D.TypeOf<typeof SpawnedD>
export type Killed = D.TypeOf<typeof KilledD>
export type Failed = D.TypeOf<typeof FailedD>
