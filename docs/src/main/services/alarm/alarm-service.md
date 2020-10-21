# Alarm Service

This service provide a http interface to interact with alarm server.

## Creation of Alarm Service

### Pre-requisite

In order to use Logging Service APIs:

1. The Location Service, and Gateway Server needs to be running in the network

### To create Alarm Service

Typescript
:   @@snip [AlarmService](../../../../../example/src/documentation/alarm/AlarmServiceExamples.ts) { #alarm-service-creation }

## APIs

@@@ note {title="Async-Await" }

Note that the examples are using async/await which makes handling of promises more readable.

@@@


## Setting alarm Severity
Alarm service allows you to update the severity of alarms belonging to components.

Type Definitions of setSeverity API can be found @extref:[here](ts-docs:interfaces/clients.alarmservice.html#setseverity)

Typescript
:   @@snip [Agent-Service](../../../../../example/src/documentation/alarm/AlarmServiceExamples.ts) { #setseverity }
