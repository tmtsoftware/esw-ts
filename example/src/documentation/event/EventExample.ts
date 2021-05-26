import {
  Done,
  Event,
  EventKey,
  EventName,
  EventService,
  IntKey,
  intKey,
  ObserveEvent,
  Parameter,
  Prefix,
  ServiceError,
  Subscription
} from '@tmtsoftware/esw-ts'

//#event-service
const eventService: EventService = await EventService()
//#event-service

//#publish
const sourcePrefix = new Prefix('IRIS', 'component')
const eventName = new EventName('move-event')
const positionParameter = intKey('positions', 'centimeter').set([10, 20, 30])
const paramSet: Parameter<IntKey>[] = [positionParameter]

const event = ObserveEvent.make(sourcePrefix, eventName, paramSet)

const done: Done = await eventService.publish(event)
//#publish
const dd = async () => {
  //#get
  const sourcePrefix = new Prefix('IRIS', 'component')

  const eventKey1 = new EventKey(sourcePrefix, new EventName('eventKey1'))
  const eventKey2 = new EventKey(sourcePrefix, new EventName('eventKey2'))

  const eventKeys = new Set([eventKey1, eventKey2])
  const events: Event[] = await eventService.get(eventKeys)

  //#get
}
const ddd = async () => {
  //#subscribe
  const sourcePrefix = new Prefix('IRIS', 'component')

  const eventKey1 = new EventKey(sourcePrefix, new EventName('eventKey1'))
  const eventKey2 = new EventKey(sourcePrefix, new EventName('eventKey2'))

  const onEventCallback = (event: Event) => {
    console.log(event)
    // make use of ${event} inside this callback function
  }
  const eventKeys = new Set([eventKey1, eventKey2])
  const onErrorCallback = (error: ServiceError) => {
    // do something when error occurs
    // for ex : close connection / cleanup resources
    console.log(error)
  }
  const subscription: Subscription = eventService.subscribe(eventKeys, 10)(
    onEventCallback,
    onErrorCallback
  )

  //To cancel the subscription
  subscription.cancel()
  //#subscribe
}

const dddd = async () => {
  //#p-subscribe
  const onEventCallback = (event: Event) => {
    // make use of ${event} inside this callback function
    console.log(event)
  }
  const onErrorCallback = (error: ServiceError) => {
    // do something when error occurs
    // for ex : close connection / cleanup resources
    console.log(error)
  }
  // subscribe to all ESW subsystem's event
  const subscription: Subscription = eventService.pSubscribe(
    'ESW',
    10,
    '.*'
  )(onEventCallback, onErrorCallback)

  // subscribe to specific events having hcd in the event name
  const specificSubscription: Subscription = eventService.pSubscribe(
    'ESW',
    10,
    '(hcd)'
  )(onEventCallback)

  //To cancel the subscription
  subscription.cancel()
  //#p-subscribe
}
