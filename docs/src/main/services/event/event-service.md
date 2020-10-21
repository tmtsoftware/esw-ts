# Event Service
@extref:[Event service](ts-docs:interfaces/clients.eventservice.html) provides methods to interact with the event server which implements the publish/subscribe messaging paradigm
where one component publishes an event and all clients that have subscribed receive the event.

## Creation of Event Service

### Pre-requisite

1. The Location Service, Event Service and Gateway Server needs to be running in the network
2. The necessary configuration, environment variables or system properties should be defined to point to the correct host and port number(s) for the Location Service nodes.

#### Examples to create a client for Event service

Typescript
: @@snip [Location-Service](../../../../../example/src/documentation/event/EventExample.ts) { #event-service }

## Event Model
 Type definition of Event models can be found @extref:[here](ts-docs:modules/models.html#event).


## Usages of Event Service

### Publishing an Event

Event service allows you to publish an @extref:[Event](ts-docs:modules/models.html#event) to the event server.
Type Definitions of publish API can be found @extref:[here](ts-docs:interfaces/clients.eventservice.html#publish).

Typescript
: @@snip [Event-Service](../../../../../example/src/documentation/event/EventExample.ts) { #publish }


### Get events

The @extref:[get](ts-docs:interfaces/clients.eventservice.html#get) API is used to get events for
set of @extref:[EventKeys](ts-docs:classes/models.eventkey.html).

Example for getting events:

Typescript
: @@snip [Event-Service](../../../../../example/src/documentation/event/EventExample.ts) { #get }

### Subscribe to the events
Subscribing Event can be done via two ways. User can subscribe to -

1. Multiple @extref:[EventKeys](ts-docs:classes/models.eventkey.html).
2. All the EventKeys of specific @extref:[subsystem](ts-docs:modules/models.html#subsystem) and pattern.

When events are subscribed for given EventKeys, events are received at `every` frequency.
The APIs take callback function which gets triggered whenever the events are received.

Below example uses @extref:[subscribe](ts-docs:interfaces/clients.eventservice.html#subscribe)
 and @extref:[pSubscribe](ts-docs:interfaces/clients.eventservice.html#psubscribe)
 APIs.

Example for subscribing events with given EventKeys:

Typescript
: @@snip [Event-Service](../../../../../example/src/documentation/event/EventExample.ts) { #subscribe }

Example for subscribing events with given subsystem:

Typescript
: @@snip [Event-Service](../../../../../example/src/documentation/event/EventExample.ts) { #p-subscribe }
