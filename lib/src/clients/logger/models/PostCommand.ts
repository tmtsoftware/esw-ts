import { Prefix } from '../../../models'
import { Level } from './Level'

export class Log {
  readonly _type: 'Log' = 'Log'

  constructor(
    readonly prefix: Prefix,
    readonly level: Level,
    readonly message: string,
    readonly metadata: Record<string, any>
  ) {}
}
