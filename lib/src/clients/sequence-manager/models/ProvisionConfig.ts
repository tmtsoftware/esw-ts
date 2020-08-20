import {Prefix, PrefixD} from "../../../models";
import {Decoder} from '../../../utils/Decoder'
import * as D from 'io-ts/lib/Decoder'

export class AgentProvisionConfig {
  constructor(readonly agentPrefix: Prefix, readonly countOfSeqComps: number) {}
}

export const AgentProvisionConfigD: Decoder<AgentProvisionConfig> = D.type({agentPrefix: PrefixD, countOfSeqComps: D.number})

export class ProvisionConfig {
  constructor(readonly config: AgentProvisionConfig[]) {}
}

export const ProvisionConfigD: Decoder<ProvisionConfig> = D.type({config: D.array(AgentProvisionConfigD)})
