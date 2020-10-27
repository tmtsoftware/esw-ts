# Sequencer Service
This service provides a handle to send commands to a sequencer which is registered in location service.

##Creation of Sequencer Service

###Pre-requisite

####In order to use sequencer service client for a specific sequencer:

  1. The sequencer and gateway server should be running.
    `GatewayException(InvalidComponent)` will be thrown if the specified sequencer not found in the location service.
  2. Authorization Token with correct access role.
     Documentation on how to fetch access token could be found @ref[here](../aas/csw-aas-js.md).

####To create Sequencer Service

Typescript
: @@snip [Sequencer-Service](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #Sequencer-Service-creation }

###Creating SequenceCommands

Typescript
: @@snip [sequence-commands](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #sequence-commands-creation }

###Creating a Sequence
A sequence is a list of sequence commands:

Typescript
: @@snip [sequence](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #sequence-creation }


##Usages of Sequencer Service

@@@ note {title="Async-Await" }

Note that the examples are using async/await which makes handling of promises more readable.

@@@

Type Definitions for Sequencer Service can be found @extref:[here](ts-docs:interfaces/clients.sequencerservice.html)

###Loading and Starting a Sequence into a Sequencer

To load a sequence into a sequencer, `SequencerService` provides `loadSequence` API
which takes a `Sequence` and returns a `Promise<OkOrUnhandledResponse>`.
If sequencer is in `Idle` state, provided sequence gets loaded in the sequencer and an `Ok` response gets returned
otherwise an `Unhandled` response gets returned.

To start a loaded sequence, `SequencerService` provides `startSequence` API
which starts the sequence in the sequencer which is loaded by `loadSequence` API
and returns a `Promise<SubmitResponse>`.
If sequencer is in `Loaded` state, loaded sequence's execution gets started in the sequencer
and a `Started` response gets returned otherwise a negative SubmitResponse gets returned.

Typescript
: @@snip [loadSequence](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #loadSequence }

###Adding commands into the sequence after all the pending steps

To add commands into the sequence after all the pending steps, `SequencerService` provides `add` API
which takes list of `SequenceCommands` and returns `Promise<OkOrUnhandledResponses>`.
If sequencer is still in execution, then given list of `SequenceCommands` gets added into the sequence after all the pending steps
and a `Ok` response gets returned otherwise an `Unhandled` response gets returned.

Typescript
: @@snip [add](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #add }

###Prepending commands into the sequence before all the pending steps

To add commands into the sequence before all the pending steps, `SequencerService` provides `add` API
which takes list of `SequenceCommands` and returns `Promise<OkOrUnhandledResponses>`.
If sequencer is still in execution, then given list of `SequenceCommands` gets added into the sequence before all the pending steps
and a `Ok` response gets returned. Otherwise, an `Unhandled` response gets returned.

Typescript
: @@snip [prepend](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #prepend }

###Replacing a command with a list of commands

To replace a command with a list of commands, `SequencerService` provides `replace` API
which takes the `Id` of  the command which to be replaced and list of `SequenceCommands` and returns `Promise<GenericResponse>`.
In case, if the command of the given `Id` is not present in sequence, then `IdDoesNotExist` response gets returned.
Or if the command is already finished or in flight, then a `CannotOperateOnAnInFlightOrFinishedStep` response gets returned.
In case, if the command is still pending, then it gets replaced with the given list of `SequenceCommands`
Otherwise, an `Unhandled` response gets returned.

Typescript
: @@snip [replace](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #replace }

###Inserting a list of commands after a command

To insert a list of commands after a command, `SequencerService` provides `insertAfter` API
which takes the `Id` of  the command after which commands to be inserted and list of `SequenceCommands` and returns `Promise<GenericResponse>`.
In case, if the command of the given `Id` is not present in sequence, then `IdDoesNotExist` response gets returned.
Or if the command is already finished or in flight, then a `CannotOperateOnAnInFlightOrFinishedStep` response gets returned.
In case, if the command is still pending, then the given list of `SequenceCommands` gets inserted after it
Otherwise, an `Unhandled` response gets returned.

Typescript
: @@snip [insertAfter](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #insertAfter }

###Deleting a command from the sequence

To delete a command from the sequence, `SequencerService` provides `delete` API
which takes the `Id` of  the command which to be deleted and returns `Promise<GenericResponse>`.
If sequencer is not in `Inprogress` state, then `Unhandled` response gets returned.
Or if the command of the given `Id`, is not present in sequence, then `IdDoesNotExist` response gets returned.
Or if it is still pending, then it gets deleted and `Ok` response gets returned.
Otherwise, a `CannotOperateOnAnInFlightOrFinishedStep` response gets returned.

Typescript
: @@snip [delete](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #delete }

###Adding a breakpoint to a Step

To add a breakpoint to a Step, `SequencerService` provides `addBreakpoint` API
which takes the `Id` of  the command where breakpoint to be added and returns `Promise<GenericResponse>`.
If sequencer is not in `Inprogress` state, then `Unhandled` response gets returned.
Or if the command of the given `Id`, is not present in sequence, then `IdDoesNotExist` response gets returned.
Or if it is still pending, then breakpoint gets added and `Ok` response gets returned.
Otherwise, a `CannotOperateOnAnInFlightOrFinishedStep` response gets returned.

Typescript
: @@snip [addBreakpoint](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #addBreakpoint }

###Removing a breakpoint from a Step

To remove a breakpoint from a Step, `SequencerService` provides `removeBreakpoint` API
which takes the `Id` of  the command from where breakpoint to be removed and returns `Promise<RemoveBreakpointResponse>`.
If sequencer is not in `Inprogress` state, then `Unhandled` response gets returned.
Or if the command of the given `Id`, is not present in sequence, then `IdDoesNotExist` response gets returned.
Otherwise, breakpoint gets removed and `Ok` response gets returned.

Typescript
: @@snip [removeBreakpoint](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #removeBreakpoint }

###Pausing the sequence

To pause the sequence, `SequencerService` provides `pause` API which returns `Promise<PauseResponse>`.
If sequencer is in `Inprogress` state, then an `Ok` response gets returned if there is a `Step` pending,
otherwise, a `CannotOperateOnAnInFlightOrFinishedStep` response gets returned.
Or if sequencer is not in `Inprogress` state, then `Unhandled` response gets returned.

Typescript
: @@snip [pause](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #pause }

###Resuming a paused sequence

To resume a paused the sequence, `SequencerService` provides `resume` API which returns `Promise<PauseResponse>`.
If sequencer is in `Inprogress` state, an `Ok` response gets returned.
Otherwise, an `Unhandled` response gets returned.

Typescript
: @@snip [resume](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #resume }

###Getting the sequence from the sequencer

To get the sequence from the sequencer, `SequencerService` provides `getSequence` API
which returns the `StepList`(runtime representation of the sequence)
if there is a sequence executing in the sequencer else returns `undefined`.

Typescript
: @@snip [getSequence](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #getSequence }

###Checking if Sequencer is available

To check if Sequencer is available, `SequencerService` provides `isAvailable` API
which returns `Promise<boolean>`.
If sequencer is in `Idle` state, `true` get returned otherwise `false` gets returned.

Typescript
: @@snip [isAvailable](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #isAvailable }

###Checking if Sequencer is online

To check if Sequencer is online, `SequencerService` provides `isOnline` API
which returns `Promise<boolean>`.
If sequencer is in `Idle` state, `true` get returned otherwise `false` gets returned.

Typescript
: @@snip [isOnline](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #isOnline }

###Discarding all the pending Steps

To discard all the pending `Steps`, `SequencerService` provides a `reset` API
which returns `Promise<OkOrUnhandledResponse>`.
If sequencer is in `InProgress` state, then an `Ok` response gets returned.
Otherwise, an `Unhandled` response gets returned.

Typescript
: @@snip [reset](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #reset }

###Discarding all the pending Steps and calling the onAbortSequence handler of the script

To discard all the pending `Steps` and call the onAbortSequence handler of the script,
`SequencerService` provides a `abortSequence` API which returns `Promise<OkOrUnhandledResponse>`.
If sequencer is in `InProgress` state, then an `Ok` response gets returned.
Otherwise, an `Unhandled` response gets returned.

Typescript
: @@snip [abortSequence](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #abortSequence }

###Discarding all the pending Steps and calling the onStop handler of the script

To discard all the pending `Steps` and call the onStop handler of the script,
`SequencerService` provides a `stop` API which returns `Promise<OkOrUnhandledResponse>`.
If sequencer is in `InProgress` state, then an `Ok` response gets returned.
Otherwise, an `Unhandled` response gets returned.

Typescript
: @@snip [stop](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #stop }

###Changing sequencer state to Online

To change sequencer state to `Online`, `SequencerService` provides `goOnline` API
which returns `Promise<GoOnlineResponse>`.
If sequencer is in any State but `InProgress`,
then an `Ok` response get returned if `goOnline` handler gets executed successfully,
otherwise a `GoOnlineHookFailed` response gets returned.
Although, if sequencer is in `InProgress` state then an `Unhandled` response gets returned.

Typescript
: @@snip [goOnline](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #goOnline }

###Changing sequencer state to Offline

To change sequencer state to `Offline`, `SequencerService` provides `goOffline` API
which returns `Promise<GoOfflineResponse>`.
If sequencer is in any State but `InProgress`,
then an `Ok` response get returned if `goOffline` handler gets executed successfully,
otherwise a `GoOfflineHookFailed` response gets returned.
Although, if sequencer is in `InProgress` state then an `Unhandled` response gets returned.

Typescript
: @@snip [goOffline](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #goOffline }

###Running diagnosticMode

To run diagnosticMode handler, `SequencerService` provides `diagnosticMode` API
which returns `Promise<DiagnosticModeResponse>`.
If diagnosticMode handler of the script successfully executes, then an `Ok` response gets returned.
Otherwise, a `DiagnosticHookFailed` gets returned.

Typescript
: @@snip [diagnosticMode](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #diagnosticMode }

###Running operationsMode

To run operationsMode handler, `SequencerService` provides `operationsMode` API
which returns `Promise<OperationsModeResponse>`.
If operationsMode handler of the script successfully executes, then an `Ok` response gets returned.
Otherwise, a `OperationsHookFailed` gets returned.

Typescript
: @@snip [operationsMode](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #operationsMode }

###Submitting Sequence to a Sequencer

To submit a Sequence to a Sequencer, `SequencerCommandService` provides a `submit` API which takes a Sequence and returns a
`Promise<SubmitResponse>`.

If the sequencer is idle, the provided sequence is loaded in the sequencer and
execution of the sequence starts immediately, and a `Started` response is returned.
If the sequencer is already running another sequence, an `Invalid` response is returned.

Typescript
: @@snip [submit](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #submit }

`query` or `queryFinal` Apis, as shown above, could be used to query for the sequence result after the sequence is `submit`ted.
`query` returns the current response which could be either final response (eg. `Completed`) or intermediate response (eg. `Started`).
Whereas `queryFinal` will wait for the final response of the sequence for the given `timeout`. This Api will never return an intermediate response.

If you are not interested in initial/intermediate response but only in final response, you can use the `submitAndWait` api which submits
the sequence and waits for the final response if the sequence was successfully `Started`.

Typescript
: @@snip [submitAndWait](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #submitAndWait }
