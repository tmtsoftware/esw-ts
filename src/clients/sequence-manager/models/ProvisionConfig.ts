import type { Prefix } from '../../../models'
import { requirement } from '../../../utils/Utils'

/**
 * @category Sequence Manager Service
 */
export class AgentProvisionConfig {
  constructor(readonly agentPrefix: Prefix, readonly countOfSeqComps: number) {
    requirement(
      countOfSeqComps >= 0,
      'Invalid sequence component count: Count of sequence components must be greater than or equal to Zero'
    )
  }
}

/**
 * @category Sequence Manager Service
 */
export class ProvisionConfig {
  constructor(readonly config: AgentProvisionConfig[]) {
    const mapOfPrefixes = config.reduce(
      (accumulator: Record<string, number>, b) => ({
        ...accumulator,
        [b.agentPrefix.toJSON()]: (accumulator[b.agentPrefix.toJSON()] ?? 0) + 1
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
