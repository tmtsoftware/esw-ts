# Event Service

Event Service provides methods to interact with the event server which implements the publish/subscribe messaging paradigm
where one component publishes an event and all clients that have subscribed receive the event.

## Pre-requisite

1. The Location Service, Event Service and Gateway Server needs to be running in the network
1. The necessary configuration, environment variables or system properties should be defined to point to the correct host and port number(s) for the Location Service nodes.

## Creation of Event Service

### Examples to create a client for Event Service

Typescript
: @@snip [Event-Service](../../../../example/src/documentation/event/EventExample.ts) { #event-service }

## Usages of Event Service

Type definitions for all Event Service methods can be found @extref:[here](ts-docs:interfaces/clients.EventService.html).

## Publishing an Event

Event Service allows you to publish an @extref:[Event](ts-docs:modules/clients.html#Event) to the event server.

Type definitions for `publish` method can be found @extref:[here](ts-docs:interfaces/clients.EventService.html#publish).

Typescript
: @@snip [Event-Service](../../../../example/src/documentation/event/EventExample.ts) { #publish }

## Get Events

This method is used to get events for set of @extref:[EventKeys](ts-docs:classes/models.EventKey.html).
This is different from subscribing to event. Use this method to get occurred events.
If you want to consume live events, use subscription methods.

Type definitions for `get` method can be found @extref:[here](ts-docs:interfaces/clients.EventService.html#get).

Example for getting events:

Typescript
: @@snip [Event-Service](../../../../example/src/documentation/event/EventExample.ts) { #get }

## Subscribe to the Events

Subscribing to Event can be done via two ways. User can subscribe to -

1. Multiple EventKeys.
1. All the EventKeys of specific @extref:[subsystem](ts-docs:modules/models.html#Subsystem) and pattern.

When you subscribe for the given EventKeys, events are received at `every` frequency.
The methods take callback function which gets triggered whenever the events are received.

Type definitions of both methods can be found by below links :

1. @extref:[subscribe](ts-docs:interfaces/clients.EventService.html#subscribe).
1. @extref:[pSubscribe](ts-docs:interfaces/clients.EventService.html#psubscribe).

Example for subscribing events with given EventKeys:

Typescript
: @@snip [Event-Service](../../../../example/src/documentation/event/EventExample.ts) { #subscribe }

Example for subscribing events with given subsystem:

Typescript
: @@snip [Event-Service](../../../../example/src/documentation/event/EventExample.ts) { #p-subscribe }
