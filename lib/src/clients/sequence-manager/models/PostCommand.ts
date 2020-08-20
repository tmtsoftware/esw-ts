import {ObsMode} from "./ObsMode";

export class Configure {
  readonly _type: 'Configure' = 'Configure'
  constructor(readonly obsMode: ObsMode) {}
}

export type SequenceManagerPostRequest = Configure
