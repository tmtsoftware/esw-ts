import {Decoder} from "../../../utils/Decoder";
import {pipe} from "fp-ts/lib/pipeable";
import * as D from 'io-ts/lib/Decoder'

export class EventName {
  constructor(readonly name: string) {
  }

  toJSON() {
    return this.name
  }
}

export const EventNameD: Decoder<EventName> = pipe(
  D.string,
  D.parse((name)=> D.success(new EventName(name)))
)
