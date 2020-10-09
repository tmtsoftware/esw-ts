# Location Service
The Location Service handles component (i.e., Applications, Sequencers, Assemblies, HCDs, and Services) discovery in the distributed TMT software system.

A component’s location information can be used by other components and services to connect to it and use it. An example of location information is:

- Host address/port pairs
- URL/URIs paths
- Connection protocols
- Metadata if available (process_id, agent_id, etc).

Location service has following [APIs](#apis):


|  API                                          | Input args                          | Returns            |
| --------------------------------------------- | ----------------------------------- | ------------------ |
| [list](#list)                                 |                                     | Location[ ]        |
| [listByComponentType](#listbycomponenttype)   | ComponentType                       | Location[ ]        |
| [listByHostname](#listbyhostname)             | hostname                            | Location[ ]        |
| [listByConnectionType](#listbyconnectiontype) | ConnectionType                      | Location[ ]        |
| [listByPrefix](#listbyprefix)                 | prefix                              | Location[ ]        |
| [find](#find)                                 | Connection                          | Option< Location > |
| [unregister](#unregister)                     | Connection                          | Done               |
| [resolve](#resolve)                           | Connection, within, TimeUnit        | Option< Location > |
| [track](#track)                               | Connection, onTrackingEventCallback | Subscription       |


## Creation of Location Service

### Pre-requisite
Access token is not neccessarily needed for creating location service.

If You are using location service to unregister a component, you would need to have the access token with specific permissions :

1. Authorization Token with correct access role.
    Documentation on how to fetch access token could be found @ref[here](../../aas/csw-aas-js.md).

#### Examples to create client for Location service
Location service constructor takes optional tokenFactory and optional location server configuration(host/port pair).

Typescript
: @@snip [Location-Service](../../../../../example/src/documentation/location/locationExample.ts) { #location-service-creation }


##APIs

@@@ note {title="Async-Await" }

Note that the examples are using async/await which makes handling of promises more readable.

@@@
## Models
### Components
### Connections
### Resolving connections

### list
This API returns a list of Locations of components that are registered in the location service.

The following example shows how to call list API :

Typescript
: @@snip [Location-Service](../../../../../example/src/documentation/location/locationExample.ts) { #list }

### listByComponentType
This API takes a component type as an argument and returns a list of Locations for that specific component type which are registered in the location service.

The following examples shows various ways listByComponentType API can be called

Typescript
: @@snip [Location-Service](../../../../../example/src/documentation/location/locationExample.ts) { #list-by-component-type }

### listByConnectionType
This API takes a connection type as an argument and returns a list of Locations for that specific connection type which are registered in the location service.

The following examples shows various ways listByConnectionType API can be called:

Typescript
: @@snip [Location-Service](../../../../../example/src/documentation/location/locationExample.ts) { #list-by-connection-type }

### listByHostname
This API takes a hostname as an argument and returns a list of Locations registered with that host in the location service.

The following examples shows various ways listByHostname API can be called:

Typescript
: @@snip [Location-Service](../../../../../example/src/documentation/location/locationExample.ts) { #list-by-hostname }

### listByPrefix
This API takes a prefix of a component as an argument and returns a list of Locations registered with that prefix in the location service.

The following example shows listByPrefix API can be called:

Typescript
: @@snip [Location-Service](../../../../../example/src/documentation/location/locationExample.ts) { #list-by-prefix }

### find
This API takes a type of Connection as an argument to be located and returns a Option of Location.

The following example shows find API can be called:

Typescript
: @@snip [Location-Service](../../../../../example/src/documentation/location/locationExample.ts) { #find }

### unregister
This is a secure API and takes a type of Connection as an input argument to be unregistered from the location service and returns Done once unregistered.

The following example shows unregister API can be called:

Typescript
: @@snip [Location-Service](../../../../../example/src/documentation/location/locationExample.ts) { #unregister }

### resolve
This API takes a type of Connection along with the timeout value(within), and the timeout unit(TimeUnit) as arguments to resolve connection, and it returns the Option of location.

The following example shows resolve API can be called:

Typescript
: @@snip [Location-Service](../../../../../example/src/documentation/location/locationExample.ts) { #resolve }

### track
This API takes a type of Connection to be tracked, and the callback function for that connection which will be called when the connection's location is updated or removed.

The following example shows track API can be called:

Typescript
: @@snip [Location-Service](../../../../../example/src/documentation/location/locationExample.ts) { #track }
