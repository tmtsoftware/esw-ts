import { SequenceD } from '../../../decoders/CommandDecoders'
import type { SequenceCommand } from '../../../models'
import { getOrThrow } from '../../../utils/Utils'

export class Sequence {
  constructor(readonly commands: SequenceCommand[]) {}

  static fromString(json: string): Sequence {
    return getOrThrow(SequenceD.decode(JSON.parse(json)))
  }
}
