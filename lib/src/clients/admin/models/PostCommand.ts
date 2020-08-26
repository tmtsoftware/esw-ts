import { ComponentId } from '../../../models'
import { Level } from '../../logger'

export class GetLogMetadata {
  readonly _type: 'GetLogMetadata' = 'GetLogMetadata'

  constructor(readonly componentId: ComponentId) {}
}

export class SetLogLevel {
  readonly _type: 'SetLogLevel' = 'SetLogLevel'

  constructor(readonly componentId: ComponentId, readonly level: Level) {}
}
