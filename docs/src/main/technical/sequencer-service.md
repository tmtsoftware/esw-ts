# Sequencer Service

This service provides a handle to send commands to a Sequencer which is registered in Location Service.

## Creation of Sequencer Service

### Pre-requisite

### In order to use sequencer service client for a specific sequencer

  1. The Sequencer and Gateway Server should be running.
    `GatewayException(InvalidComponent)` will be thrown if the specified sequencer not found in the Location Service.
  2. Authorization token with correct access role.
     Documentation on how to fetch access token could be found @ref[here](../aas/auth-components.md).

### To create Sequencer Service

Typescript
: @@snip [Sequencer-Service](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #Sequencer-Service-creation }

## Creating SequenceCommands

Typescript
: @@snip [sequence-commands](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #sequence-commands-creation }

## Creating a Sequence

A sequence is a list of sequence commands:

Typescript
: @@snip [sequence](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #sequence-creation }

## Usages of Sequencer Service

@@@ note {title="Async-Await" }

Note that the examples are using async/await which makes handling of promises more readable.

@@@

Type Definitions for Sequencer Service can be found @extref:[here](ts-docs:interfaces/clients.sequencerservice.html)

### Loading and Starting a Sequence into a Sequencer

To load a sequence into a Sequencer, `SequencerService` provides `loadSequence` method
which takes a `Sequence` and returns a `Promise<OkOrUnhandledResponse>`.
If Sequencer is in `Idle` state, provided sequence gets loaded into the Sequencer and an `Ok` response gets returned.
Otherwise, an `Unhandled` response gets returned.

To start a loaded sequence, `SequencerService` provides `startSequence` method
which starts the sequence (which is loaded by `loadSequence` method) in the Sequencer
and returns a `Promise<SubmitResponse>`.
If Sequencer is in `Loaded` state, loaded sequence's execution gets started in the Sequencer
and a `Started` response gets returned. Otherwise, a negative SubmitResponse gets returned.

Type definitions for methods used in the given example are :

1. @extref[loadSequence](ts-docs:interfaces/clients.sequencerservice.html#loadsequence)
1. @extref[startSequence](ts-docs:interfaces/clients.sequencerservice.html#startsequence)
1. @extref[query](ts-docs:interfaces/clients.sequencerservice.html#query)
1. @extref[queryFinal](ts-docs:interfaces/clients.sequencerservice.html#queryfinal)

Typescript
: @@snip [loadSequence](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #loadSequence }

### Adding commands into the sequence after all the pending steps

To add commands into the sequence after all the pending steps, `SequencerService` provides `add` method
which takes list of `SequenceCommands` and returns `Promise<OkOrUnhandledResponses>`.
If Sequencer is still in execution, then given list of `SequenceCommands` gets added into the sequence after all the pending steps
and a `Ok` response gets returned. Otherwise, an `Unhandled` response gets returned.

Type definitions for `add` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#add)

Typescript
: @@snip [add](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #add }

### Prepending commands into the sequence before all the pending steps

To add commands into the sequence before all the pending steps, `SequencerService` provides `add` method
which takes list of `SequenceCommands` and returns `Promise<OkOrUnhandledResponses>`.
If Sequencer is still in execution, then given list of `SequenceCommands` gets added into the sequence before all the pending steps
and a `Ok` response gets returned. Otherwise, an `Unhandled` response gets returned.

Type definitions for `prepend` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#prepend)

Typescript
: @@snip [prepend](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #prepend }

### Replacing a command with a list of commands

To replace a command with a list of commands, `SequencerService` provides `replace` method
which takes the `Id` of the command which to be replaced and list of `SequenceCommands` and returns `Promise<GenericResponse>`.
In case, if the command of the given `Id` is not present in sequence, then `IdDoesNotExist` response gets returned.
Or if the command is already finished or in flight, then a `CannotOperateOnAnInFlightOrFinishedStep` response gets returned.
In case, if the command is still pending, then it gets replaced with the given list of `SequenceCommands`.
Otherwise, an `Unhandled` response gets returned.

Type definitions for `replace` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#replace)

Typescript
: @@snip [replace](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #replace }

### Inserting a list of commands after a command

To insert a list of commands after a command, `SequencerService` provides `insertAfter` method
which takes the `Id` of the command after which commands to be inserted and list of `SequenceCommands` and returns `Promise<GenericResponse>`.
In case, if the command of the given `Id` is not present in sequence, then `IdDoesNotExist` response gets returned.
Or if the command is already finished or in flight, then a `CannotOperateOnAnInFlightOrFinishedStep` response gets returned.
In case, if the command is still pending, then the given list of `SequenceCommands` gets inserted after it.
Otherwise, an `Unhandled` response gets returned.

Type definitions for `insertAfter` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#insertafter)

Typescript
: @@snip [insertAfter](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #insertAfter }

### Deleting a command from the sequence

To delete a command from the sequence, `SequencerService` provides `delete` method
which takes the `Id` of the command to be deleted and returns `Promise<GenericResponse>`.
If sequencer is not in `Running` state, then `Unhandled` response gets returned.
Or if the command of the given `Id`, is not present in sequence, then `IdDoesNotExist` response gets returned.
Or if the command is still pending, then it gets deleted and `Ok` response gets returned.
Otherwise, a `CannotOperateOnAnInFlightOrFinishedStep` response gets returned.

Type definitions for `delete` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#delete)

Typescript
: @@snip [delete](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #delete }

### Adding a breakpoint to a Step

To add a breakpoint to a Step, `SequencerService` provides `addBreakpoint` method
which takes the `Id` of the command where breakpoint to be added and returns `Promise<GenericResponse>`.
If sequencer is not in `Running` state, then `Unhandled` response gets returned.
Or if the command of the given `Id`, is not present in sequence, then `IdDoesNotExist` response gets returned.
Or if the command is still pending, then breakpoint gets added and `Ok` response gets returned.
Otherwise, a `CannotOperateOnAnInFlightOrFinishedStep` response gets returned.

Type definitions for `addBreakpoint` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#addbreakpoint)

Typescript
: @@snip [addBreakpoint](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #addBreakpoint }

### Removing a breakpoint from a Step

To remove a breakpoint from a Step, `SequencerService` provides `removeBreakpoint` method
which takes the `Id` of the command from where breakpoint to be removed and returns `Promise<RemoveBreakpointResponse>`.
If sequencer is not in `Running` state, then `Unhandled` response gets returned.
Or if the command of the given `Id`, is not present in sequence, then `IdDoesNotExist` response gets returned.
Otherwise, breakpoint gets removed and `Ok` response gets returned.

Type definitions for `removeBreakpoint` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#removebreakpoint)

Typescript
: @@snip [removeBreakpoint](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #removeBreakpoint }

### Pausing the sequence

To pause the sequence, `SequencerService` provides `pause` method which returns `Promise<PauseResponse>`.
If sequencer is in `Running` state, then an `Ok` response gets returned if there is a `Step` pending.
Otherwise, a `CannotOperateOnAnInFlightOrFinishedStep` response gets returned.
Or if sequencer is not in `Running` state, then `Unhandled` response gets returned.

Type definitions for `pause` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#pause)

Typescript
: @@snip [pause](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #pause }

### Resuming a paused sequence

To resume a paused sequence, `SequencerService` provides `resume` method which returns `Promise<PauseResponse>`.
If sequencer is in `Running` state, an `Ok` response gets returned.
Otherwise, an `Unhandled` response gets returned.

Type definitions for `resume` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#resume)

Typescript
: @@snip [resume](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #resume }

### Getting the sequence from the Sequencer

To get the sequence from the Sequencer, `SequencerService` provides `getSequence` method
which returns the `StepList` (runtime representation of the sequence).
if there is no sequence executing in the Sequencer, an `undefined` response gets returned.

Type definitions for `getSequence` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#getsequence)

Typescript
: @@snip [getSequence](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #getSequence }

### Checking if Sequencer is available

To check if Sequencer is available, `SequencerService` provides `isAvailable` method
which returns `Promise<boolean>`.
If Sequencer is in `Idle` state, then a `true` gets returned. Otherwise, `false` response gets returned.

Type definitions for `isAvailable` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#isavailable)

Typescript
: @@snip [isAvailable](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #isAvailable }

### Checking if Sequencer is online

To check if Sequencer is online, `SequencerService` provides `isOnline` method
which returns `Promise<boolean>`.
If Sequencer is in `Idle` state, then a `true` gets returned. Otherwise, `false` gets returned.

Type definitions for `isOnline` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#isonline)

Typescript
: @@snip [isOnline](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #isOnline }

### Discarding all the pending Steps

To discard all the pending `Steps`, `SequencerService` provides a `reset` method
which returns `Promise<OkOrUnhandledResponse>`.
If Sequencer is in `Running` state, then an `Ok` response gets returned.
Otherwise, an `Unhandled` response gets returned.

Type definitions for `reset` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#reset)

Typescript
: @@snip [reset](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #reset }

### Discarding all the pending Steps and calling the onAbortSequence handler of the script

To discard all the pending `Steps` and call the onAbortSequence handler of the script,
`SequencerService` provides a `abortSequence` method which returns `Promise<OkOrUnhandledResponse>`.
If Sequencer is in `Running` state, then an `Ok` response gets returned.
Otherwise, an `Unhandled` response gets returned.

Type definitions for `abortSequence` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#abortsequence)

Typescript
: @@snip [abortSequence](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #abortSequence }

### Discarding all the pending Steps and calling the onStop handler of the script

To discard all the pending `Steps` and call the onStop handler of the script,
`SequencerService` provides a `stop` method which returns `Promise<OkOrUnhandledResponse>`.
If Sequencer is in `Running` state, then an `Ok` response gets returned.
Otherwise, an `Unhandled` response gets returned.

Type definitions for `stop` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#stop)

Typescript
: @@snip [stop](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #stop }

### Changing Sequencer state to Online

To change Sequencer state to `Online`, `SequencerService` provides `goOnline` method
which returns `Promise<GoOnlineResponse>`.
If Sequencer is in any state but `Running`,
then an `Ok` response gets returned (if `goOnline` handler gets executed successfully).
Otherwise, a `GoOnlineHookFailed` response gets returned.
Although, if Sequencer is in `Running` state, then an `Unhandled` response gets returned.

Type definitions for `goOnline` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#goonline)

Typescript
: @@snip [goOnline](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #goOnline }

### Changing Sequencer state to Offline

To change Sequencer state to `Offline`, `SequencerService` provides `goOffline` method
which returns `Promise<GoOfflineResponse>`.
If Sequencer is in any State but `Running`,
then an `Ok` response gets returned (if `goOffline` handler gets executed successfully).
Otherwise, a `GoOfflineHookFailed` response gets returned.
Although, if Sequencer is in `Running` state, then an `Unhandled` response gets returned.

Type definitions for `goOffline` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#gooffline)

Typescript
: @@snip [goOffline](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #goOffline }

### Running diagnosticMode

To run diagnosticMode handler, `SequencerService` provides `diagnosticMode` method
which returns `Promise<DiagnosticModeResponse>`.
If diagnosticMode handler of the script successfully executes, then an `Ok` response gets returned.
Otherwise, a `DiagnosticHookFailed` gets returned.

Type definitions for `diagnosticMode` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#diagnosticmode)

Typescript
: @@snip [diagnosticMode](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #diagnosticMode }

### Running operationsMode

To run operationsMode handler, `SequencerService` provides `operationsMode` method
which returns `Promise<OperationsModeResponse>`.
If operationsMode handler of the script successfully executes, then an `Ok` response gets returned.
Otherwise, a `OperationsHookFailed` gets returned.

Type definitions for `operationsMode` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#operationsmode)

Typescript
: @@snip [operationsMode](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #operationsMode }

### Submitting Sequence to a Sequencer

To submit a Sequence to a Sequencer, `SequencerCommandService` provides a `submit` method which takes a Sequence and returns a
`Promise<SubmitResponse>`.

If the Sequencer is idle, then provided sequence gets loaded in the Sequencer,
execution of the sequence starts immediately and a `Started` response gets returned.
If the sequencer is already running another sequence, then an `Invalid` response gets returned.

Typescript
: @@snip [submit](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #submit }

The `query` or `queryFinal` methods, as shown above, could be used to query for the sequence result after the sequence is `submit`ted.
The `query` method returns a current response which could be either final response (eg. `Completed`) or intermediate response (eg. `Started`).
Whereas `queryFinal` will wait for the final response of the sequence for the given `timeout`. This method will never return an intermediate response.

If you are not interested in initial/intermediate response but only in final response, you can use the `submitAndWait` method which submits
the sequence and waits for the final response (if the sequence was successfully `Started`).

Typescript
: @@snip [submitAndWait](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #submitAndWait }

Type definitions for APIs used in the given example are :

1. @extref[submit](ts-docs:interfaces/clients.sequencerservice.html#submit)
1. @extref[submitAndWait](ts-docs:interfaces/clients.sequencerservice.html#submitandwait)
1. @extref[query](ts-docs:interfaces/clients.sequencerservice.html#query)
1. @extref[queryFinal](ts-docs:interfaces/clients.sequencerservice.html#queryFinal)

### Getting Status of Sequencer

To get Sequencer's State, `SequenceService` provides `getSequencerState` method.
This method returns `Promise<SequencerState>`
the state of sequencer can be Idle, Processing, Loaded, Offline, Running

Type definitions for `getSequencerState` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#getSequencerState)

Typescript
: @@snip [getSequencerState](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #getSequencerState }

### Subscribing to Sequencer State

To subscribe to state of Sequencer, `subscribeSequencerState` method can be used. This method invokes the given `callback` on every state change with newly received `SequencerStateResponse`.
`SequencerStateResponse` contains the current `SequencerState` and `StepList`. This method returns a `Subscription` which can be used to unsubscribe, as shown in example. 

Type definitions for `subscribeSequencerState` method used can be found @extref[here](ts-docs:interfaces/clients.sequencerservice.html#subscribeSequencerState)

Typescript
: @@snip [subscribeSequencerState](../../../../example/src/documentation/sequencer/SequencerExamples.ts) { #subscribeSequencerState }
