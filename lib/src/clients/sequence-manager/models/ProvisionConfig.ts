import * as D from 'io-ts/lib/Decoder'
import { Prefix, PrefixD } from '../../../models'
import { Decoder } from '../../../utils/Decoder'
import { requirement } from '../../../utils/Utils'

export class AgentProvisionConfig {
  constructor(readonly agentPrefix: Prefix, readonly countOfSeqComps: number) {
    requirement(
      countOfSeqComps > 0,
      'Invalid sequence component count: Count of sequence components must be greater than Zero'
    )
  }
}

export const AgentProvisionConfigD: Decoder<AgentProvisionConfig> = D.type({
  agentPrefix: PrefixD,
  countOfSeqComps: D.number
})

export class ProvisionConfig {
  constructor(readonly config: AgentProvisionConfig[]) {
    const mapOfPrefixes = config.reduce(
      (accumulator: Record<string, number>, b) => ({
        ...accumulator,
        [b.agentPrefix.toJSON()]: (accumulator[b.agentPrefix.toJSON()] || 0) + 1
      }),
      {}
    )
    const repeatedPrefixes = Object.keys(mapOfPrefixes).filter((a) => mapOfPrefixes[a] > 1)

    requirement(
      repeatedPrefixes.length === 0,
      `Invalid Provision config: Cannot have multiple entries for same agent prefix: Duplicate agents [${repeatedPrefixes.join(
        ','
      )}]`
    )
  }
}

export const ProvisionConfigD: Decoder<ProvisionConfig> = D.type({
  config: D.array(AgentProvisionConfigD)
})
