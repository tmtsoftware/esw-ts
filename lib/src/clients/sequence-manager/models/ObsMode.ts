import { pipe } from 'fp-ts/lib/pipeable'
import * as D from 'io-ts/lib/Decoder'
import { Decoder } from '../../../utils/Decoder'

export class ObsMode {
  constructor(readonly name: string) {}

  toJSON(): string {
    return this.name
  }
}

export const ObsModeD: Decoder<ObsMode> = pipe(
  D.string,
  D.parse((name) => D.success(new ObsMode(name)))
)
