import * as D from 'io-ts/lib/Decoder'
import type {
  Killed,
  KillResponse,
  Spawned,
  SpawnResponse
} from '../clients/agent-service/models/AgentRes'
import { FailedD } from './CommonDecoders'
import { ciLiteral, Decoder, sum } from './Decoder'

const SpawnedD: Decoder<Spawned> = D.type({
  _type: ciLiteral('Spawned')
})

const KilledD: Decoder<Killed> = D.type({
  _type: ciLiteral('Killed')
})

export const SpawnResponseD: Decoder<SpawnResponse> = sum('_type')({
  Spawned: SpawnedD,
  Failed: FailedD
})

export const KillResponseD: Decoder<KillResponse> = sum('_type')({
  Killed: KilledD,
  Failed: FailedD
})
