# Sequencer Service
This service provides a handle to send commands to a sequencer which is registered in location service.

Sequencer service has following [APIs](#apis):

|        API                            |      Input args                                           |          Returns                |
| ------------------------------------- | ----------------------------------------------------------|---------------------------------|
| [loadSequence](#loadSequence)         |   sequence: SequenceCommand[]                             |     OkOrUnhandledResponse       |
| [startSequence](#startSequence)       |                                                           |     SubmitResponse              |
| [add](#add)                           |   commands: SequenceCommand[]                             |     OkOrUnhandledResponse       |
| [prepend](#prepend)                   |   commands: SequenceCommand[]                             |     OkOrUnhandledResponse       |
| [replace](#replace)                   |   id: string, commands: SequenceCommand[]                 |     GenericResponse             |
| [insertAfter](#insertAfter)           |   id: string, commands: SequenceCommand[]                 |     GenericResponse             |
| [delete](#delete)                     |   id: string                                              |     GenericResponse             |
| [addBreakpoint](#addBreakpoint)       |   id: string                                              |     GenericResponse             |
| [removeBreakpoint](#removeBreakpoint) |   id: string                                              |     RemoveBreakpointResponse    |
| [reset](#reset)                       |                                                           |     OkOrUnhandledResponse       |
| [resume](#resume)                     |                                                           |     OkOrUnhandledResponse       |
| [pause](#pause)                       |                                                           |     PauseResponse               |
| [getSequence](#getSequence)           |                                                           |     StepList or undefined       |
| [isAvailable](#isAvailable)           |                                                           |     boolean                     |
| [isOnline](#isOnline)                 |                                                           |     boolean                     |
| [goOnline](#goOnline)                 |                                                           |     GoOnlineResponse            |
| [goOffline](#goOffline)               |                                                           |     GoOfflineResponse           |
| [abortSequence](#abortSequence)       |                                                           |     OkOrUnhandledResponse       |
| [stop](#stop)                         |                                                           |     OkOrUnhandledResponse       |
| [diagnosticMode](#diagnosticMode)     |   startTime: Date, hint: string                           |     DiagnosticModeResponse      |
| [operationsMode](#operationsMode)     |                                                           |     OperationsModeResponse      |
| [query](#query)                       |   runId: string                                           |     SubmitResponse              |
| [queryFinal](#queryFinal)             |   runId: string, timeoutInSeconds: number                 |     SubmitResponse              |
| [submit](#submit)                     |   sequence: SequenceCommand[]                             |     SubmitResponse              |
| [submitAndWait](#submitAndWait)       |   sequence: SequenceCommand[], timeoutInSeconds: number   |     SubmitResponse              |

##Creation of Sequencer Service
###Pre-requisite
In order to use sequencer service client for a specific sequencer:

  1. The sequencer and gateway server should be running.
    `GatewayException(InvalidComponent)` will be thrown if the specified sequencer not found in the location service.
  2. Authorization Token with correct access role.
     To read more on how to fetch access token. [link](../../aas/csw-aas-js.md).

Here is an example:

Typescript
: @@snip [Sequencer-Service](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #Sequencer-Service-creation }


##APIs

###Creating SequenceCommands
Typescript
: @@snip [sequence-commands](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #sequence-commands-creation }

###Creating a Sequence
A sequence is a list of sequence commands:

Typescript
: @@snip [sequence](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #sequence-creation }

####loadSequence
This API takes a `sequence` and returns the promise of `OkOrUnhandledResponse`

Typescript
: @@snip [loadSequence](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #loadSequence }

####startSequence

Typescript
: @@snip [startSequence](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #startSequence }

####add

Typescript
: @@snip [add](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #add }

####prepend

Typescript
: @@snip [prepend](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #prepend }

####replace

Typescript
: @@snip [replace](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #replace }

####insertAfter

Typescript
: @@snip [insertAfter](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #insertAfter }

####delete

Typescript
: @@snip [delete](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #delete }

####addBreakpoint

Typescript
: @@snip [addBreakpoint](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #addBreakpoint }

####removeBreakpoint

Typescript
: @@snip [removeBreakpoint](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #removeBreakpoint }

####reset

Typescript
: @@snip [reset](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #reset }

####resume

Typescript
: @@snip [resume](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #resume }

####pause

Typescript
: @@snip [pause](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #pause }

####getSequence

Typescript
: @@snip [getSequence](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #getSequence }

####isAvailable

Typescript
: @@snip [isAvailable](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #isAvailable }

####isOnline

Typescript
: @@snip [isOnline](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #isOnline }

####goOnline

Typescript
: @@snip [goOnline](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #goOnline }

####goOffline

Typescript
: @@snip [goOffline](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #goOffline }

####abortSequence

Typescript
: @@snip [abortSequence](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #abortSequence }

####stop

Typescript
: @@snip [stop](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #stop }

####diagnosticMode

Typescript
: @@snip [diagnosticMode](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #diagnosticMode }

####operationsMode

Typescript
: @@snip [operationsMode](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #operationsMode }

####submit

Typescript
: @@snip [submit](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #submit }

####submitAndWait

Typescript
: @@snip [submitAndWait](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #submitAndWait }

####query

Typescript
: @@snip [query](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #query }

####queryFinal

Typescript
: @@snip [queryFinal](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #queryFinal }
