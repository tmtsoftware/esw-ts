# Command Service

Command Service provides a handle to send commands to a component which is registered in Location Service.

## Creation of Command Service

### Pre-requisite

### In order to use command service for a specific component

  1. The component needs to be up and running behind the gateway server.
    `GatewayException(InvalidComponent)` will be thrown if the specified component is not found.
  2. Authorization Token with correct access role.
     Documentation on how to fetch authorization token could be found @ref[here](../aas/auth-components.md).

For the given example : `Prefix(ESW.Component1)` needs to be registered in the Location Service as any of the component type (`HCD`, `Assembly`, etc.).

### To create Command Service client for a component

Typescript
:   @@snip [Command-Service](../../../../example/src/documentation/command/CommandExamples.ts) { #command-service-creation }

## Type of Actions

Whenever a command gets submitted to a component, it results into in either `Immediate completion` or `Long Running action`.

### Immediate completion

If the actions of the `submit` or `submitAndWait` command take a very short time to complete, it is referred as `Immediate completion`.
The actions are successful, if the `Completed SubmitResponse` is returned. If there is a result, the `Completed` is returned with a parameter set of `Result` type that can be inspected by the caller.

### Long running Actions

When actions take longer than 1 second the Component returns the `Started SubmitResponse`. The `Started` response indicates to the framework that long-running actions have been started.

## Control Commands

In order to call the following method, one of the control command needs to be sent. Depending on your use case, you will be sending either `Setup` or `Observe` Command.

Following examples show how to create control commands:

Typescript
:   @@snip [control-command](../../../../example/src/documentation/command/CommandExamples.ts) { #control-commands }

@@@ note {title="Async-Await" }

Note that the examples are using async/await which makes handling of promises more readable.

@@@

## Usages of Command Service

Type definitions of all Command Service methods can be found @extref:[here](ts-docs:interfaces/clients.commandservice.html)

## Validating command

A `validate` message is used to ask a destination component to validate a command and determine if the command can be executed. It does not execute the command and only returns the result of validation. In some scenarios, it may be useful to test and see if a command can be executed prior to trying to execute the command.

Type definitions of `validate` method can be found @extref:[here](ts-docs:interfaces/clients.commandservice.html#validate)

Typescript
:   @@snip [validate](../../../../example/src/documentation/command/CommandExamples.ts) { #validate }

## Submitting commands

A `submit` message can be used when the sender of a command needs to do additional work before long-running actions are completed. For instance, send another command to execute in parallel. If commands are short, `submit` and `submitAndWait` behave the same way. When the actions started by submit are long-running, the caller can wait for the actions to complete if needed using the [queryFinal](#queryfinal) call.

Type definitions of `submit` method can be found @extref:[here](ts-docs:interfaces/clients.commandservice.html#submit)

Typescript
:   @@snip [submit](../../../../example/src/documentation/command/CommandExamples.ts) { #submit }

## Submit And Wait for Response

This is a convenience method which sends a `submit` message and if the command is long-running, it waits for final completion. Sending `submit` message with a command returns a @extref:[SubmitResponse](ts-docs:modules/models.html#submitresponse) as a Future.

Type definitions of `submitAndWait` method can be found @extref:[here](ts-docs:interfaces/clients.commandservice.html#submitandwait)

Typescript
:   @@snip [query](../../../../example/src/documentation/command/CommandExamples.ts) { #submit-and-wait }

## Submit Multiple commands and Wait

Similar to [SubmitAndWait](#submit-and-wait-for-response), `submitAllAndWait` method can be used to send multiple commands sequentially to the same component. This could be used to send initialization commands to an HCD, for instance.

Type definitions of `submitAllAndWait` method can be found @extref:[here](ts-docs:interfaces/clients.commandservice.html#submitallandwait)

Typescript
:   @@snip [query](../../../../example/src/documentation/command/CommandExamples.ts) { #submit-all-and-wait }

## Sending Oneway Command

Oneway is useful when Command Service needs to send commands to an HCD as quickly as possible. The command gets validated on the destination and the validation response is returned, but no other responses are provided.

Type definitions of `oneway` method can be found @extref:[here](ts-docs:interfaces/clients.commandservice.html#oneway)

Typescript
:   @@snip [oneway](../../../../example/src/documentation/command/CommandExamples.ts) { #oneway }

## Querying Result

This method is useful to get the result of a submitted command which returns a `Started` response if the command has triggered a long-running action, The caller can then determine that the actions have started properly, or wishes to poll the destination component for the final response using `queryFinal` method.

Type definitions of `query` method can be found @extref:[here](ts-docs:interfaces/clients.commandservice.html#query)

Typescript
:   @@snip [query](../../../../example/src/documentation/command/CommandExamples.ts) { #query }

## Querying for Final result

Similar to [query](#querying-result), `queryFinal` uses the Id returned by `Started`. However, in this case rather than returning immediately like `query`, it waits and only returns when the final `SubmitResponse` is sent. The `queryFinal` method is useful exclusively with `submit` in the case where some other activity must be done before the actions started by the `submit` complete.

Type definitions of `queryFinal` method can be found @extref:[here](ts-docs:interfaces/clients.commandservice.html#queryfinal)

Typescript
:   @@snip [query](../../../../example/src/documentation/command/CommandExamples.ts) { #query-final }

## SubscribeCurrentState

This method can be used to subscribe to the @extref:[CurrentState](ts-docs:classes/models.currentstate.html) of a component by providing a callback that is called with the arrival of every `CurrentState` item.

Type definitions of `subscribeCurrentState` method can be found @extref:[here](ts-docs:interfaces/clients.commandservice.html#subscribecurrentstate)

Typescript
:   @@snip [query](../../../../example/src/documentation/command/CommandExamples.ts) { #subscribe-current-state }
