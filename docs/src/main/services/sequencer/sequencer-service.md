# Sequencer Service
This service provides a handle to send commands to a sequencer which is registered in location service.

##Creation of Sequencer Service

###Pre-requisite

####In order to use sequencer service client for a specific sequencer:

  1. The sequencer and gateway server should be running.
    `GatewayException(InvalidComponent)` will be thrown if the specified sequencer not found in the location service.
  2. Authorization Token with correct access role.
     Documentation on how to fetch access token could be found @ref[here](../../aas/csw-aas-js.md).

####To create Sequencer Service

Typescript
: @@snip [Sequencer-Service](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #Sequencer-Service-creation }

##APIs

@@@ note {title="Async-Await" }

Note that the examples are using async/await which makes handling of promises more readable.

@@@

Sequencer service has following APIs:

- @extref:[loadSequence](ts-docs:interfaces/clients.sequencerservice.html#loadsequence)
- @extref:[startSequence](ts-docs:interfaces/clients.sequencerservice.html#startsequence)
- @extref:[add](ts-docs:interfaces/clients.sequencerservice.html#add)
- @extref:[prepend](ts-docs:interfaces/clients.sequencerservice.html#prepend)
- @extref:[replace](ts-docs:interfaces/clients.sequencerservice.html#replace)
- @extref:[insertAfter](ts-docs:interfaces/clients.sequencerservice.html#insertafter)
- @extref:[delete](ts-docs:interfaces/clients.sequencerservice.html#delete)
- @extref:[addBreakpoint](ts-docs:interfaces/clients.sequencerservice.html#addbreakpoint)
- @extref:[removeBreakpoint](ts-docs:interfaces/clients.sequencerservice.html#removebreakpoint)
- @extref:[reset](ts-docs:interfaces/clients.sequencerservice.html#reset)
- @extref:[resume](ts-docs:interfaces/clients.sequencerservice.html#resume)
- @extref:[pause](ts-docs:interfaces/clients.sequencerservice.html#pause)
- @extref:[getSequence](ts-docs:interfaces/clients.sequencerservice.html#getsequence)
- @extref:[isAvailable](ts-docs:interfaces/clients.sequencerservice.html#isavailable)
- @extref:[isOnline](ts-docs:interfaces/clients.sequencerservice.html#isonline)
- @extref:[goOnline](ts-docs:interfaces/clients.sequencerservice.html#goonline)
- @extref:[goOffline](ts-docs:interfaces/clients.sequencerservice.html#gooffline)
- @extref:[abortSequence](ts-docs:interfaces/clients.sequencerservice.html#abortsequence)
- @extref:[stop](ts-docs:interfaces/clients.sequencerservice.html#stop)
- @extref:[diagnosticMode](ts-docs:interfaces/clients.sequencerservice.html#diagnosticmode)
- @extref:[operationsMode](ts-docs:interfaces/clients.sequencerservice.html#operationsmode)
- @extref:[query](ts-docs:interfaces/clients.sequencerservice.html#query)
- @extref:[queryFinal](ts-docs:interfaces/clients.sequencerservice.html#queryfinal)
- @extref:[submit](ts-docs:interfaces/clients.sequencerservice.html#submit)
- @extref:[submitAndWait](ts-docs:interfaces/clients.sequencerservice.html#submitandwait)
