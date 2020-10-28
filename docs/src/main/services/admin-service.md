# Admin Service
This service provides a handle to admin related APIs which currently has logging related APIs.

## Creation of Admin Service

#### To create Admin client:

Typescript
:   @@snip [Admin-Service](../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #admin-service-creation }

## Usages of Admin Service

Type definitions for All Admin Service methods can be found @extref:[here](ts-docs:interfaces/clients.adminservice.html)

## Fetching LogMetadata

There is logging configuration set for all registered components within the TMT cluster. This method gives basic logging configuration values for specific component.

Type definitions for `getLogMetadata` can be found @extref:[here](ts-docs:interfaces/clients.adminservice.html#getlogmetadata)

Typescript
:   @@snip [getLogMetadata](../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #getLogMetadata }

## Setting LogLevel of a component

This method allows setting log level of specific component.

Type definitions for `setLogLevel` can be found @extref:[here](ts-docs:interfaces/clients.adminservice.html#setloglevel)

Typescript
:   @@snip [setLogLevel](../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #setLogLevel }
