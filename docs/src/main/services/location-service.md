# Location Service
The Location Service handles component (i.e. Applications, Sequencers, Assemblies, HCDs, and Services) discovery in the
distributed TMT software system.

A component’s location information can be used by other components and services to connect to it and use it.

Type definition for location model can be found @extref[here](ts-docs:modules/models.html#location).

## Creation of Location Service

### Pre-requisite
Access token is not necessary for using Location Service query APIs.

If You are using Location Service to unregister a component, you would need to have the authorization Token with correct
access role. Documentation on how to fetch access token could be found @ref[here](../aas/csw-aas-js.md).

#### Examples to create a client for Location Service
Location Service constructor takes optional tokenFactory and optional location server configuration(host/port pair).

Typescript
: @@snip [Location-Service](../../../../example/src/documentation/location/LocationExample.ts) { #location-service-creation }

@@@ note {title="Async-Await"}

Note that the examples are using async/await which makes handling of promises more readable.

@@@


## Usages of Location Service

Type definitions for all APIs can be found @extref[here](ts-docs:interfaces/clients.locationservice.html).

### Listing & Filtering Locations
Location Service provides multiple ways to get list of locations registered in the TMT cluster.

Typescript
: @@snip [Location-Service](../../../../example/src/documentation/location/LocationExample.ts) { #list-by-component-type }

### Resolving Connection

There are two ways to get/fetch a location information of a connection:

1. Using resolve API
2. Using find API


Location Service's `resolve` API uses @extref[Connection](ts-docs:modules/models.html#connection-1) a component to
resolve the location within some timeout duration.
However, `find` API does not wait to resolve location. If the location is not present, it returns `undefined`.

Typescript
: @@snip [Location-Service](../../../../example/src/documentation/location/LocationExample.ts) { #resolve }

### Unregister a Connection
This is a secure API and takes a type of Connection as an input argument to be unregistered from the Location Service
and returns Done once unregistered.

The following example shows unregister API can be called:

Typescript
: @@snip [Location-Service](../../../../example/src/documentation/location/LocationExample.ts) { #unregister }

### Tracking Connection
The lifecycle of a connection of interest can be followed using either the `track` API. The connection update events
will be received by the callback provided to this API. This API returns a subscription which can be used to cancel the
tracking subscription.

The following example shows track API can be called:

Typescript
: @@snip [Location-Service](../../../../example/src/documentation/location/LocationExample.ts) { #track }
