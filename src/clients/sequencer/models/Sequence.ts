import { SequenceCommandsD } from '../../../decoders/CommandDecoders'
import type { SequenceCommand } from '../../../models'
import { getOrThrow } from '../../../utils/Utils'

export class Sequence {
  constructor(readonly commands: [SequenceCommand, ...SequenceCommand[]]) {}

  static from(commands: unknown) {
    const seq: SequenceCommand[] = getOrThrow(SequenceCommandsD.decode(commands))
    if (seq.length < 1) throw Error('Sequence can not be empty')
    return new Sequence([seq[0], ...seq.slice(1)])
  }

  toJSON() {
    return this.commands
  }
}
