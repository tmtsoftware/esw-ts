import {ComponentId, ComponentType, Prefix, PrefixD} from "../../../models";
import {EventName, EventNameD} from "./EventName";
import {Decoder} from "../../../utils/Decoder";
import {pipe} from "fp-ts/lib/pipeable";
import * as D from "io-ts/lib/Decoder";
import * as E from "fp-ts/lib/Either";
import {requirement} from "../../../utils/Utils";

const SEPARATOR = '.'

export class EventKey {
  constructor(readonly source: Prefix, readonly eventName: EventName) {
  }

  static fromString = (eventKeyStr: string): EventKey => {
    requirement(eventKeyStr != null || eventKeyStr != undefined, "event key cannot be null or undefined")
    const [source, eventName] = splitSourceEventName(eventKeyStr)
    return new EventKey(Prefix.fromString(source), new EventName(eventName))
  }

  toJSON() {
    return this.source + SEPARATOR + this.eventName
  }
}

const splitSourceEventName = (eventKeyStr: string) => {
  const index = eventKeyStr.lastIndexOf(SEPARATOR)
  const source = eventKeyStr.substr(0, index)
  const eventName = eventKeyStr.substr(index + 1)
  return [source, eventName]
}

const parseEventKey = (eventKeyStr: string): E.Either<Error, EventKey> =>
  E.tryCatch(
    () => EventKey.fromString(eventKeyStr),
    (e) => (e instanceof Error ? e : new Error('unknown error'))
  )

export const EventKeyD: Decoder<EventKey> = pipe(
  D.string,
  D.parse((str) => {
    const p = parseEventKey(str)
    return E.isRight(p) ? D.success(p.right) : D.failure(str, p.left.message)
  })
)
