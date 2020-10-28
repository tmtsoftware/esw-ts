# Logging Service

Logging Service provides the HTTP Interface to write log-messages for a Component.

## Pre-requisite

In order to use Logging Service APIs:

1. The Location Service
1. Gateway Server needs to be running in the network

## Creation of Logging Service

### To create Logging Service

Typescript
:   @@snip [LoggingService](../../../../example/src/documentation/log/LoggingServiceExamples.ts) { #logging-service-creation }

## APIs

@@@ note {title="Async-Await" }

Note that the examples are using async/await which makes handling of promises more readable.

@@@
## Usages of Logging Service

Type Definition for the Logging Service interface can be found @extref[here](ts-docs:interfaces/clients.loggingservice.html)

## Creating Log for an incident

This method will be used to create a log entry for a component with a specific log Level.

I.e. when a user submits a setup command for a component using Command Service.

User may want to create explicit log entry based on success or failure scenario.

Type definition can be found - @extref:[here](ts-docs:interfaces/clients.loggingservice.html#log).

Typescript
:   @@snip [LoggingService](../../../../example/src/documentation/log/LoggingServiceExamples.ts) { #logentry }

