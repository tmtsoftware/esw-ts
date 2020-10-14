import * as D from 'io-ts/lib/Decoder'
import type {
  Killed,
  KillResponse,
  Spawned,
  SpawnResponse
} from '../clients/agent-service/models/AgentRes'
import { ciLiteral, Decoder } from '../utils/Decoder'
import { FailedD } from './CommonDecoders'

const SpawnedD: Decoder<Spawned> = D.type({
  _type: ciLiteral('Spawned')
})

const KilledD: Decoder<Killed> = D.type({
  _type: ciLiteral('Killed')
})

export const SpawnResponseD: Decoder<SpawnResponse> = D.sum('_type')({
  Spawned: SpawnedD,
  Failed: FailedD
})

export const KillResponseD: Decoder<KillResponse> = D.sum('_type')({
  Killed: KilledD,
  Failed: FailedD
})
