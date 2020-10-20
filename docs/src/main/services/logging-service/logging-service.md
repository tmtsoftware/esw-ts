#Logging Service

Logging Service provides the Http Interface to be able to log into a component.


##Creation of Logging Service

###Pre-requisite

In order to use Logging Service APIs:

1. The Location Service, and Gateway Server needs to be running in the network

###To create Logging Service

Typescript
:   @@snip [LoggingService](../../../../../example/src/documentation/log/LoggingServiceExamples.ts) { #logging-service-creation }

##APIs

@@@ note {title="Async-Await" }

Note that the examples are using async/await which makes handling of promises more readable.

@@@

Logging Service has following API:

- @extref:[log](ts-docs:interfaces/clients.loggingservice.html#log)
