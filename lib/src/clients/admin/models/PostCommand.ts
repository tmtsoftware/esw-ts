import { ComponentId } from '../../../models'
import { Level } from '../../logger'

export class GetLogMetadata {
  private readonly _type: 'GetLogMetadata' = 'GetLogMetadata'

  constructor(private readonly componentId: ComponentId) {}
}

export class SetLogLevel {
  private readonly _type: 'SetLogLevel' = 'SetLogLevel'

  constructor(private readonly componentId: ComponentId, private readonly level: Level) {}
}
