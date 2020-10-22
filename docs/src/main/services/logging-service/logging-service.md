# Logging Service

Logging Service provides the Http Interface to be able to log into a component.

Type definition for the logging Service interface can be found @extref[here](ts-docs:interfaces/clients.loggingservice.html)

## Creation of Logging Service

### Pre-requisite

In order to use Logging Service APIs:

1. The Location Service, and Gateway Server needs to be running in the network

### To create Logging Service

Typescript
:   @@snip [LoggingService](../../../../../example/src/documentation/log/LoggingServiceExamples.ts) { #logging-service-creation }

## APIs

@@@ note {title="Async-Await" }

Note that the examples are using async/await which makes handling of promises more readable.

@@@
## Usages of Logging service

### Creating Log for an incident

This api will be used for to create a log entry for a component with a specific log Level.

For ex: when a user submits a setup command for a component using command service.

user may want to create explicit log entry based on success or failure scenario.

Type definition can be found - @extref:[here.](ts-docs:interfaces/clients.loggingservice.html#log)

Typescript
:   @@snip [LoggingService](../../../../../example/src/documentation/log/LoggingServiceExamples.ts) { #logentry }

