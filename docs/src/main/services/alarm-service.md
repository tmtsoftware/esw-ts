# Alarm Service

This service provides an HTTP interface to interact with alarm server.

## Creation of Alarm Service

### Pre-requisite

In order to use Alarm Service API:

1. The Location Service
1. The Alarm Service
1. Gateway Server needs to be running in the network

### To create a client for Alarm Service

Typescript
:   @@snip [AlarmService](../../../../example/src/documentation/alarm/AlarmServiceExamples.ts) { #alarm-service-creation }

@@@ note {title="Async-Await" }

Note that the examples are using async/await which makes handling of promises more readable.

@@@

## Usages of Alarm Service

## Setting alarm Severity

@extref:[Alarm service](ts-docs:interfaces/clients.AlarmService.html) allows you to update the severity of alarms belonging to components.

Type Definitions of `setSeverity` method can be found @extref:[here](ts-docs:interfaces/clients.AlarmService.html#setseverity)

Typescript
:   @@snip [Agent-Service](../../../../example/src/documentation/alarm/AlarmServiceExamples.ts) { #setseverity }
