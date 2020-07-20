import {Done} from "../location";
import {Event} from "./models/Event";
import {EventKey} from "./models/EventKey";

interface EventService {
  publish(event: Event): Promise<Done>

  get(eventKeys: Set<EventKey>): Promise<Set<Event>>
}
