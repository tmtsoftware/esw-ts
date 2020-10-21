# Admin Service
This service provides a handle to admin related APIs which includes logging related APIs

Admin service has following [APIs](#apis):

|        API                        |      Input args    |   Returns   |
| --------------------------------- | ------------------ | ----------- |
| [getLogMetadata](#getlogmetadata) | componentId        | LogMetadata |
| [setLogLevel](#setloglevel)       | componentId, level | Done        |


## Creation of Admin Service

#### To create Admin client:

Typescript
:   @@snip [Admin-Service](../../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #admin-service-creation }

## APIs

### getLogMetadata

   This API gives basic logging configuration values for specific component.

The following example shows how to call getLogMetadata API :

Typescript
:   @@snip [getLogMetadata](../../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #getLogMetadata }

### setLogLevel

   This API allows setting log level of specific component.

The following example shows how to call setLogLevel API :

Typescript
:   @@snip [setLogLevel](../../../../../example/src/documentation/admin/AdminServiceExamples.ts) { #setLogLevel }
