# Location Service

The Location Service handles component (i.e. Applications, Sequencers, Assemblies, HCDs, and Services) discovery in the
distributed TMT software system.

A component’s location information can be used by other components and services to connect to it and use it.

Type definition for location model can be found @extref[here](ts-docs:modules/clients.html#Location).

## Creation of Location Service

### Pre-requisite

Access token is not necessary for using Location Service query APIs.

If You are using Location Service to unregister a component, you would need to have the authorization Token with correct
access role. Documentation on how to fetch access token could be found @ref[here](../aas/auth-components.md).

#### Examples to create a client for Location Service

Location Service constructor takes optional tokenFactory and optional location server configuration(host/port pair).

Typescript
: @@snip [Location-Service](../../../../example/src/documentation/location/LocationExample.ts) { #location-service-creation }

@@@ note {title="Async-Await"}

Note that the examples are using async/await which makes handling of promises more readable.

@@@

## Usages of Location Service

Type definitions for all methods can be found @extref[here](ts-docs:interfaces/clients.LocationService.html).

## Listing & Filtering Locations

Location Service provides multiple ways to get list of locations registered in the TMT cluster.

Type definitions for relevant listings methods can be found by following links:

1. @extref:[list](ts-docs:interfaces/clients.LocationService.html#list).
1. @extref:[listByPrefix](ts-docs:interfaces/clients.LocationService.html#listbyprefix).
1. @extref:[listByHostname](ts-docs:interfaces/clients.LocationService.html#listbyhostname).
1. @extref:[listByComponentType](ts-docs:interfaces/clients.LocationService.html#listbycomponenttype).
1. @extref:[listByConnectionType](ts-docs:interfaces/clients.LocationService.html#listbyconnectiontype).

Following example showcases the listByComponentType api usage

Typescript
: @@snip [Location-Service](../../../../example/src/documentation/location/LocationExample.ts) { #list-by-component-type }

## Resolving Connection

There are two ways to get/fetch a location information of a connection:

1. Using resolve API
1. Using find API

Location Service's `resolve` API uses @extref[Connection](ts-docs:modules/clients.html#Connection) a component to
resolve the location within some timeout duration.
However, `find` API does not wait to resolve location. If the location is not present, it returns `undefined`.

Type definitions for both methods can be found by following links:

1. @extref:[find](ts-docs:interfaces/clients.LocationService.html#find).
1. @extref:[resolve](ts-docs:interfaces/clients.LocationService.html#resolve).

Typescript
: @@snip [Location-Service](../../../../example/src/documentation/location/LocationExample.ts) { #resolve }

## Unregister a Connection

This is a secure API and takes a type of Connection as an input argument to be unregistered from the Location Service
and returns Done once unregistered.

Type definitions for `unregister` method can be found @extref[here](ts-docs:interfaces/clients.LocationService.html#unregister)

The following example shows `unregister` method can be called:

Typescript
: @@snip [Location-Service](../../../../example/src/documentation/location/LocationExample.ts) { #unregister }

## Tracking Connection

The lifecycle of a connection of interest can be followed using either the `track` API. The connection update events
will be received by the callback provided to this method. This method returns a subscription which can be used to cancel the
tracking subscription.

Type definitions for `track` method can be found @extref[here](ts-docs:interfaces/clients.LocationService.html#track)

The following example shows `track` method can be called:

Typescript
: @@snip [Location-Service](../../../../example/src/documentation/location/LocationExample.ts) { #track }
