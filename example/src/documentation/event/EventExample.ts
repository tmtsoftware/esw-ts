import {
  Done,
  Event,
  EventKey,
  EventName,
  EventService,
  IntKey,
  intKey,
  ObserveEvent,
  ObserveEventNames,
  Parameter,
  Prefix,
  ServiceError,
  Subscription,
  Units
} from '@tmtsoftware/esw-ts'

//#event-service
const eventService: EventService = await EventService()
//#event-service

//#publish
const sourcePrefix = new Prefix('IRIS', 'component')
const eventName = new EventName('move-event')
const positionParameter = intKey('positions', Units.centimeter).set([10, 20, 30])
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
  //optional
  const onErrorCallback = (error: ServiceError) => {
    // do something when error occurs
    // for ex : close connection / cleanup resources
    console.log(error)
  }
  //optional
  const onCloseCallback = () => {
    // do something when connection is closed
    // for ex : reset client-side state
  }
  const subscription: Subscription = eventService.subscribe(eventKeys, 10)(
    onEventCallback,
    onErrorCallback,
    onCloseCallback
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
  //optional
  const onErrorCallback = (error: ServiceError) => {
    // do something when error occurs
    // for ex : close connection / cleanup resources
    console.log(error)
  }
  //optional
  const onCloseCallback = () => {
    // do something when connection is closed
    // for ex : reset client-side state
  }
  // subscribe to all ESW subsystem's event
  const subscription: Subscription = eventService.pSubscribe('ESW', 10, '.*')(
    onEventCallback,
    onErrorCallback,
    onCloseCallback
  )

  // subscribe to specific events having hcd in the event name
  const specificSubscription: Subscription = eventService.pSubscribe('ESW', 10, '(hcd)')(onEventCallback)

  //To cancel the subscription
  subscription.cancel()
  //#p-subscribe
}

const dddddd = async () => {
  //#subscribeObserveEvents
  const onEventCallback = (event: Event) => {
    // make use of ${event} inside this callback function
    console.log(event)
    // do filter specific observe events
    switch(event.eventName) {
      case ObserveEventNames.ObservationStart: /*<do something> */ break;
      case ObserveEventNames.ObserveStart:  /*<do something> */ break;
      case ObserveEventNames.ObservePaused: /*<do something> */ break;
      case ObserveEventNames.ObserveResumed: /*<do something> */ break;
      case ObserveEventNames.ObserveEnd :
      case ObserveEventNames.ObservationEnd: /*<do something same here when ObserveEnd or ObservationEnd> */ break;
      default : /* handleError() / noop */ 
    }
  }
  //optional
  const onErrorCallback = (error: ServiceError) => {
    // do something when error occurs
    // for ex : close connection / cleanup resources
    console.log(error)
  }
  //optional
  const onCloseCallback = () => {
    // do something when connection is closed
    // for ex : reset client-side state
  }
  // subscribe to all observe events
  const observeEventSubscription: Subscription = eventService.subscribeObserveEvents(1)(
    onEventCallback,
    onErrorCallback,
    onCloseCallback
  )

  //To cancel the subscription
  observeEventSubscription.cancel()
  //#subscribeObserveEvents
}
