# Admin Service
@extref:[Admin service](ts-docs:interfaces/clients.adminservice.html) provides a handle to admin related APIs which currently has logging related APIs.

## Creation of Admin Service

#### To create Admin client:

Typescript
:   @@snip [Admin-Service](../../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #admin-service-creation }

## APIs

Type definitions for all Admin Service API's can be found @extref:[here](ts-docs:interfaces/clients.adminservice.html):

Type definitions for specific api can be found by following links:

- @extref:[getLogMetadata](ts-docs:interfaces/clients.adminservice.html#getlogmetadata)
- @extref:[setLogLevel](ts-docs:interfaces/clients.adminservice.html#setloglevel)

## Fetching LogMetadata

There is logging configuration set for all registered components within the TMT cluster. this API gives basic logging configuration values for specific component.

Typescript
:   @@snip [getLogMetadata](../../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #getLogMetadata }

## Setting LogLevel of a component

This API allows setting log level of specific component.

Typescript
:   @@snip [setLogLevel](../../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #setLogLevel }
