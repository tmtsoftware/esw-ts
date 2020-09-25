# Sequencer Service
This service provides a handle to send commands to a sequencer which is registered in location service.

Sequencer service has following [APIs](#apis):

|        API                            |      Input args                                           |          Returns                |
| ------------------------------------- | ----------------------------------------------------------|---------------------------------|
| [loadSequence](#loadsequence)         |   sequence: SequenceCommand[]                             |     OkOrUnhandledResponse       |
| [startSequence](#startsequence)       |                                                           |     SubmitResponse              |
| [add](#add)                           |   commands: SequenceCommand[]                             |     OkOrUnhandledResponse       |
| [prepend](#prepend)                   |   commands: SequenceCommand[]                             |     OkOrUnhandledResponse       |
| [replace](#replace)                   |   id: string, commands: SequenceCommand[]                 |     GenericResponse             |
| [insertAfter](#insertafter)           |   id: string, commands: SequenceCommand[]                 |     GenericResponse             |
| [delete](#delete)                     |   id: string                                              |     GenericResponse             |
| [addBreakpoint](#addbreakpoint)       |   id: string                                              |     GenericResponse             |
| [removeBreakpoint](#removebreakpoint) |   id: string                                              |     RemoveBreakpointResponse    |
| [reset](#reset)                       |                                                           |     OkOrUnhandledResponse       |
| [resume](#resume)                     |                                                           |     OkOrUnhandledResponse       |
| [pause](#pause)                       |                                                           |     PauseResponse               |
| [getSequence](#getsequence)           |                                                           |     StepList or undefined       |
| [isAvailable](#isavailable)           |                                                           |     boolean                     |
| [isOnline](#isonline)                 |                                                           |     boolean                     |
| [goOnline](#goonline)                 |                                                           |     GoOnlineResponse            |
| [goOffline](#gooffline)               |                                                           |     GoOfflineResponse           |
| [abortSequence](#abortsequence)       |                                                           |     OkOrUnhandledResponse       |
| [stop](#stop)                         |                                                           |     OkOrUnhandledResponse       |
| [diagnosticMode](#diagnosticmode)     |   startTime: Date, hint: string                           |     DiagnosticModeResponse      |
| [operationsMode](#operationsmode)     |                                                           |     OperationsModeResponse      |
| [query](#query)                       |   runId: string                                           |     SubmitResponse              |
| [queryFinal](#queryfinal)             |   runId: string, timeoutInSeconds: number                 |     SubmitResponse              |
| [submit](#submit)                     |   sequence: SequenceCommand[]                             |     SubmitResponse              |
| [submitAndWait](#submitandwait)       |   sequence: SequenceCommand[], timeoutInSeconds: number   |     SubmitResponse              |

##Creation of Sequencer Service
###Pre-requisite
####In order to use sequencer service client for a specific sequencer:

  1. The sequencer and gateway server should be running.
    `GatewayException(InvalidComponent)` will be thrown if the specified sequencer not found in the location service.
  2. Authorization Token with correct access role.
     To read more on how to fetch access token. [link](../../aas/csw-aas-js.html).

####Here is an example:

Typescript
: @@snip [Sequencer-Service](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #Sequencer-Service-creation }

###Creating SequenceCommands

Typescript
: @@snip [sequence-commands](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #sequence-commands-creation }

###Creating a Sequence
A sequence is a list of sequence commands:

Typescript
: @@snip [sequence](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #sequence-creation }

##APIs

####loadSequence
This API takes a sequence as a parameter,
loads the sequence into the sequencer
and returns the `OkOrUnhandledResponse` as a promise value.

Typescript
: @@snip [loadSequence](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #loadSequence }

####startSequence
This API starts the execution of the sequence which is loaded in the sequencer
and returns the `SubmitResponse` as a promise value.

Typescript
: @@snip [startSequence](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #startSequence }

####add
This API takes a list of SequenceCommands as a parameter,
adds that at last of the sequence
and returns the `OkOrUnhandledResponse` as a promise value.

Typescript
: @@snip [add](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #add }

####prepend
This API takes a list of `SequenceCommands` as a parameter,
adds that before all the pending steps of the sequence
and returns the `OkOrUnhandledResponse` as a promise value.

Typescript
: @@snip [prepend](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #prepend }

####replace
This API takes an `Id` of a pending step(command) of the sequence and a list of `SequenceCommands` as parameters,
replaces the command of the given `Id` with the given list of `SequenceCommands` and returns
the `GenericResponse` as a promise value.

Typescript
: @@snip [replace](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #replace }

####insertAfter
This API takes an `Id` of a pending step(command) of the sequence and a list of `SequenceCommands` as parameters,
inserts the given list of `SequenceCommands` after the command of the given `Id` and returns
the `GenericResponse` as a promise value.

Typescript
: @@snip [insertAfter](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #insertAfter }

####delete
This API takes an `Id` of a pending step(command) of the sequence as a parameter,
deletes the step from the sequencer
and returns the `GenericResponse` as a promise value.

Typescript
: @@snip [delete](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #delete }

####addBreakpoint
This API takes an `Id` of a pending step(command) of the sequence as a parameter,
adds a breakpoint to the step
and returns the `GenericResponse` as a promise value.

Typescript
: @@snip [addBreakpoint](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #addBreakpoint }

####removeBreakpoint
This API takes an `Id` of a pending step(command) of the sequence as a parameter,
removes the breakpoint from the step
and returns the `RemoveBreakpointResponse` as a promise value.

Typescript
: @@snip [removeBreakpoint](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #removeBreakpoint }

####reset
This API discards all the pending steps of the sequence and returns the `OkOrUnhandledResponse` as a promise value.

Typescript
: @@snip [reset](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #reset }

####resume
This API resumes the execution of the paused sequence and returns the `OkOrUnhandledResponse` as a promise value.

Typescript
: @@snip [resume](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #resume }

####pause
This API pauses the execution of the sequence by placing a breakpoint at the next pending step
and returns the `PauseResponse` as promise value.

Typescript
: @@snip [pause](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #pause }

####getSequence
This API returns the `StepList`(runtime representation of the sequence)
if there is a sequence executing in the sequencer else returns `undefined`,
as a promise value.

Typescript
: @@snip [getSequence](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #getSequence }

####isAvailable
This API returns `true` if sequencer is in `Idle` state else returns `false`, as a promise value.

Typescript
: @@snip [isAvailable](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #isAvailable }

####isOnline
This API returns `true` if sequencer is in any state but `Offline` else returns `false`, as a promise value.

Typescript
: @@snip [isOnline](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #isOnline }

####goOnline
This API makes sequencer to go into `Online` state and returns the `GoOnlineResponse` as a promise value.

Typescript
: @@snip [goOnline](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #goOnline }

####goOffline
This API makes sequencer to go into `Offline` state and returns the `GoOfflineResponse` as a promise value.

Typescript
: @@snip [goOffline](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #goOffline }

####abortSequence
This API discards all the pending steps of the sequence,
calls the `onAbortSequence` handler in the script of the sequencer
and returns the `OkOrUnhandledResponse` as a promise value.

Typescript
: @@snip [abortSequence](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #abortSequence }

####stop
This API discards all the pending steps of the sequence,
calls the `onStop` handler in the script of the sequencer
and returns the `OkOrUnhandledResponse` as a promise value.

Typescript
: @@snip [stop](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #stop }

####diagnosticMode
This API takes Date(an Instant) and string(as hint) as parameters,
calls the `onDiagnosticMode` handler in the script of the sequencer with those parameters
and returns the `DiagnosticModeResponse` as a promise value.

Typescript
: @@snip [diagnosticMode](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #diagnosticMode }

####operationsMode
This API calls the `onOperationsMode` handler in the script of the sequencer
and returns the `OperationsModeResponse` as a promise value.

Typescript
: @@snip [operationsMode](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #operationsMode }

####submit
This API takes a sequence as a parameter,
starts the execution of the sequence
and returns the immediate `SubmitResponse` as a promise value.

Typescript
: @@snip [submit](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #submit }

####submitAndWait
This API takes a sequence, and a timeout in seconds as parameters,
starts the execution of the sequence
and returns the final `SubmitResponse` in that given timeout as a promise value.

Typescript
: @@snip [submitAndWait](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #submitAndWait }

####query
This API takes the `runId` of the sequence as a parameter,
and returns the immediate `SubmitResponse` as a promise value.

Typescript
: @@snip [query](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #query }

####queryFinal
This API takes the `runId` of the sequence, and a timeout in seconds as parameters,
and returns the final `SubmitResponse` in that given timeout as a promise value.

Typescript
: @@snip [queryFinal](../../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #queryFinal }
