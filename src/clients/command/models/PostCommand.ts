import { Parameter } from 'models/params/Parameter'
import { Key } from 'models/params/Key'
import { ControlCommand } from 'models/params/Command'

export type CommandServiceHttpMessage = Submit | Validate | Oneway | Query

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

export class Setup implements ControlCommand {
  readonly _type: 'Setup' = 'Setup'
  constructor(
    readonly source: string,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {}
}

export class Observe implements ControlCommand {
  readonly _type: 'Observe' = 'Observe'
  constructor(
    readonly source: string,
    readonly commandName: string,
    readonly paramSet: Parameter<Key>[],
    readonly maybeObsId: string[] = []
  ) {}
}
