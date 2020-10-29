# Admin Service
This service provides a handle to admin related APIs which currently has logging related APIs.

## Creation of Admin Service

#### To create Admin client:

Typescript
:   @@snip [Admin-Service](../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #admin-service-creation }

## Usages of Admin Service

Type definitions for all Admin Service methods can be found @extref:[here](ts-docs:interfaces/clients.adminservice.html)

## Fetching LogMetadata & Setting log level

For instance, we need logging configuration to be known before setting log level of a component if it is not set to desired @extref:[log level](ts-docs:modules/models.html#level).

Type definitions for `getLogMetadata` can be found @extref:[here](ts-docs:interfaces/clients.adminservice.html#getlogmetadata)
Type definitions for `setLogLevel` can be found @extref:[here](ts-docs:interfaces/clients.adminservice.html#setloglevel)

In the given example, we want to set `ERROR` log level for the component if it's not already set to `ERROR`.

Typescript
:   @@snip [getLogMetadata](../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #getLogMetadata }
