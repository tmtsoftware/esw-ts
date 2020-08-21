import { ObsMode } from './ObsMode'
import { ProvisionConfig } from './ProvisionConfig'

export class Configure {
  readonly _type: 'Configure' = 'Configure'
  constructor(readonly obsMode: ObsMode) {}
}
export class Provision {
  readonly _type: 'Provision' = 'Provision'
  constructor(readonly config: ProvisionConfig) {}
}

export type SequenceManagerPostRequest = Configure | Provision
