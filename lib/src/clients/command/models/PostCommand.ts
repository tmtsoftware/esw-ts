import type { ControlCommand } from '../../../models'

export type CommandServicePostMessage = Submit | Validate | Oneway | Query

export class Validate {
  readonly _type: 'Validate' = 'Validate'

  constructor(readonly controlCommand: ControlCommand) {}
}

export class Submit {
  readonly _type: 'Submit' = 'Submit'

  constructor(readonly controlCommand: ControlCommand) {}
}

export class Oneway {
  readonly _type: 'Oneway' = 'Oneway'

  constructor(readonly controlCommand: ControlCommand) {}
}

export class Query {
  readonly _type: 'Query' = 'Query'

  constructor(readonly runId: string) {}
}
