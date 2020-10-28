# Event Service
Event service provides methods to interact with the event server which implements the publish/subscribe messaging paradigm
where one component publishes an event and all clients that have subscribed receive the event.


## Pre-requisite

1. The Location Service, Event Service and Gateway Server needs to be running in the network
2. The necessary configuration, environment variables or system properties should be defined to point to the correct host and port number(s) for the Location Service nodes.

## Creation of Event Service

#### Examples to create a client for Event Service

Typescript
: @@snip [Event-Service](../../../../example/src/documentation/event/EventExample.ts) { #event-service }


## Usages of Event Service

Type definitions for All Event Service methods can be found @extref:[here](ts-docs:interfaces/clients.eventservice.html).

## Publishing an Event

Event Service allows you to publish an @extref:[Event](ts-docs:modules/models.html#event) to the event server.

Type definitions for `publish` method can be found @extref:[here](ts-docs:interfaces/clients.eventservice.html#publish).

Typescript
: @@snip [Event-Service](../../../../example/src/documentation/event/EventExample.ts) { #publish }


## Get Events

The get method is used to get events for set of @extref:[EventKeys](ts-docs:classes/models.eventkey.html).
This is different from subscribing event. Use this API when occurred events are required.
If you want to consume live events, use subscription APIs.

Type definitions for `get` method can be found @extref:[here](ts-docs:interfaces/clients.eventservice.html#get).

Example for getting events:

Typescript
: @@snip [Event-Service](../../../../example/src/documentation/event/EventExample.ts) { #get }

## Subscribe to the Events

1. Multiple EventKeys.
2. All the EventKeys of specific @extref:[subsystem](ts-docs:modules/models.html#subsystem) and pattern.

When events are subscribed for given EventKeys, events are received at `every` frequency.
The method take callback function which gets triggered whenever the events are received.

Type definitions of both methods can be found by below links :

1. @extref:[subscribe](ts-docs:interfaces/clients.eventservice.html#subscribe).
1. @extref:[pSubscribe](ts-docs:interfaces/clients.eventservice.html#psubscribe).

Example for subscribing events with given EventKeys:

Typescript
: @@snip [Event-Service](../../../../example/src/documentation/event/EventExample.ts) { #subscribe }

Example for subscribing events with given subsystem:

Typescript
: @@snip [Event-Service](../../../../example/src/documentation/event/EventExample.ts) { #p-subscribe }
