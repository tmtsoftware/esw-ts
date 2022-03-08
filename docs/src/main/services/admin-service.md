# Admin Service

This service provides a handle to admin related APIs which currently has logging related APIs.

## Creation of Admin Service

### To create Admin client

Typescript
:   @@snip [Admin-Service](../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #admin-service-creation }

## Usages of Admin Service

Type definitions for all Admin Service methods can be found @extref:[here](ts-docs:interfaces/clients.AdminService.html).

## Fetching LogMetadata & Setting log level

For instance, we need logging configuration to be known before setting log level of a component if it is not set to desired @extref:[log level](ts-docs:modules/clients.html#Level).

Type definitions for `getLogMetadata` can be found @extref:[here](ts-docs:interfaces/clients.AdminService.html#getlogmetadata).
Type definitions for `setLogLevel` can be found @extref:[here](ts-docs:interfaces/clients.AdminService.html#setloglevel).

In the given example, we want to set `ERROR` log level for the component if it's not already set to `ERROR`.

Typescript
:   @@snip [getLogMetadata](../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #getLogMetadata }

## Component & Container level actions

Admin actions like restarting, shutting down or making component(HCD, Assembly) or container to go online/offline are provided in Admin Service.
Following examples represents admin actions provided on Admin Service.

Type definitions for `restart` can be found @extref:[here](ts-docs:interfaces/clients.AdminService.html#restart).
Type definitions for `shutdown` can be found @extref:[here](ts-docs:interfaces/clients.AdminService.html#shutdown).
Type definitions for `goOffline` can be found @extref:[here](ts-docs:interfaces/clients.AdminService.html#goOffline).
Type definitions for `goOnline` can be found @extref:[here](ts-docs:interfaces/clients.AdminService.html#goOnline).

Typescript
:   @@snip [adminActions](../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #adminActions }

## Querying lifecycle states of Component & Container

Component(HCD, Assembly) lifecycle states are queried using `getComponentLifecycleState` API Method.

Container lifecycle state is queried using `getContainerLifecycleState` API Method.

Following examples shows how to make use of these API's.

Type definitions for `getContainerLifecycleState` can be found @extref:[here](ts-docs:interfaces/clients.AdminService.html#getContainerLifecycleState)
Type definitions for `getComponentLifecycleState` can be found @extref:[here](ts-docs:interfaces/clients.AdminService.html#getComponentLifecycleState)

Typescript
:   @@snip [getLifecycleState](../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #getLifecycleState }
