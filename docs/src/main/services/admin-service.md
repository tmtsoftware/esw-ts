# Admin Service
This service provides a handle to admin related APIs which currently has logging related APIs.

## Creation of Admin Service

#### To create Admin client:

Typescript
:   @@snip [Admin-Service](../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #admin-service-creation }

## Usages of Admin Service

Full API reference for Admin Service can be found @extref:[here](ts-docs:interfaces/clients.adminservice.html).

### Fetching LogMetadata

There is a logging configuration set for all registered components within the TMT cluster.

Method @extref:[getLogMetadata](ts-docs:interfaces/clients.adminservice.html#getLogMetadata) gives basic logging configuration values for specific component.

Typescript
:   @@snip [getLogMetadata](../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #getLogMetadata }

### Setting LogLevel of a component

Method @extref:[setLogLevel](ts-docs:interfaces/clients.adminservice.html#setloglevel) allows setting log level of specific component.

Typescript
:   @@snip [setLogLevel](../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #setLogLevel }
