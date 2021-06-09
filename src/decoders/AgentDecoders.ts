import * as D from 'io-ts/lib/Decoder'
import type {
  AgentStatus,
  AgentStatusResponse,
  AgentStatusSuccess,
  Killed,
  KillResponse,
  SequenceComponentStatus,
  Spawned,
  SpawnResponse
} from '../clients/agent-service'
import { FailedD, LocationServiceErrorD, UnhandledD } from './CommonDecoders'
import { ComponentIdD } from './ComponentIdDecoder'
import { ciLiteral, Decoder } from './Decoder'
import { AkkaLocationD } from './LocationDecoders'

const SpawnedD: Decoder<Spawned> = D.struct({
  _type: ciLiteral('Spawned')
})

const KilledD: Decoder<Killed> = D.struct({
  _type: ciLiteral('Killed')
})

export const SequenceComponentStatusD: Decoder<SequenceComponentStatus> = D.struct({
  seqCompId: ComponentIdD,
  sequencerLocation: D.array(AkkaLocationD)
})

const AgentStatusD: Decoder<AgentStatus> = D.struct({
  agentId: ComponentIdD,
  seqCompsStatus: D.array(SequenceComponentStatusD)
})

const AgentStatusSuccessD: Decoder<AgentStatusSuccess> = D.struct({
  _type: ciLiteral('Success'),
  agentStatus: D.array(AgentStatusD),
  seqCompsWithoutAgent: D.array(SequenceComponentStatusD)
})

export const SpawnResponseD: Decoder<SpawnResponse> = D.sum('_type')({
  Spawned: SpawnedD,
  Failed: FailedD
})

export const KillResponseD: Decoder<KillResponse> = D.sum('_type')({
  Killed: KilledD,
  Failed: FailedD
})

export const AgentStatusResponseD: Decoder<AgentStatusResponse> = D.sum('_type')({
  Unhandled: UnhandledD,
  LocationServiceError: LocationServiceErrorD,
  Success: AgentStatusSuccessD
})
