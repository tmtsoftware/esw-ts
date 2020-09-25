# Command Service
This client side service provides a handle to send commands to a component which is registered in location service.

Command service has following [APIs](#apis):

| API                                               | Input args                                            | Returns               |
| --------------------------------------------------| ----------------------------------------------------- | --------------------- |
| [validate](#validate)                             | ControlCommand                                        | ValidateResponse      |
| [submit](#submit)                                 | ControlCommand                                        | SubmitResponse        |
| [oneway](#oneway)                                 | ControlCommand                                        | OnewayResponse        |
| [query](#query)                                   | runId                                                 | SubmitResponse        |
| [queryFinal](#queryfinal)                         | runId, timeoutInSeconds                               | SubmitResponse        |
| [subscribeCurrentState](#subscribecurrentstate)   | stateNames, onStateChangeCallback                     | Subscription          |
| [submitAndWait](#submitandwait)                   | ControlCommand, timeoutInSeconds                      | SubmitResponse        |
| [submitAllAndWait](#submitallandwait)             | ControlCommand [ ], timeoutInSeconds                  | SubmitResponse[ ]     |


##Creation of Command Service

###Pre-requisite
In order to use command service for a specific component:

  1. The component needs to be up and running behind the gateway server.
    `GatewayException(InvalidComponent)` will be thrown if the specified component is not found.
  2. Authorization Token with correct access role.
     To read more on how to fetch access token. [link](../../aas/csw-aas-js.html).

For the given example : `Prefix(ESW.Component1)` needs to be registered in the location service as any of the component type (`HCD`, `Assembly`, etc.).

To create Command service client for a component

Typescript
:   @@snip [Command-Service](../../../../../example/src/documentation/command/CommandExamples.ts) { #command-service-creation }

## Control Commands
   In order to call following API, one of the control command needs to be sent. Depending on your use case, you will be sending either Setup or Observe Command.

   Following examples show how to create control commands:

Typescript
:   @@snip [control-command](../../../../../example/src/documentation/command/CommandExamples.ts) { #control-commands }

##APIs

@@@ note {title="Async-Await" }

Note that the examples are using async/await which makes handling of promises more readable.

@@@

###Validate

  This API takes Control command as input parameter and return a promise of `ValidateResponse`.

  The following example shows how to call validate API :

Typescript
:   @@snip [validate](../../../../../example/src/documentation/command/CommandExamples.ts) { #validate }

###Submit

  This API takes Control command as input parameter and return a promise of `SubmitResponse`.

  The following example shows how to call submit API :

Typescript
:   @@snip [submit](../../../../../example/src/documentation/command/CommandExamples.ts) { #submit }


###Oneway

  This API takes Control command as input parameter and return a promise of `OnewayResponse`.

  The following example shows how to call oneway API :

Typescript
:   @@snip [oneway](../../../../../example/src/documentation/command/CommandExamples.ts) { #oneway }

###Query

  This API takes runId of already submitted command as input parameter and return a promise of `SubmitResponse`.

  The following example shows how to call query API :

Typescript
:   @@snip [query](../../../../../example/src/documentation/command/CommandExamples.ts) { #query }

###QueryFinal

  This API is same as query , only difference is takes time-out (seconds) along with runId of already submitted command as input parameter and return a promise of `SubmitResponse`.

  The following example shows how to call query final API :

Typescript
:   @@snip [query](../../../../../example/src/documentation/command/CommandExamples.ts) { #query-final }

###SubscribeCurrentState

  This API takes set of current states to be subscribed along with a callback which will get triggered on change of the mentioned states.(`stateName1`,`stateName2`)

  The following example shows how subscribeCurrentState API call would look like :

Typescript
:   @@snip [query](../../../../../example/src/documentation/command/CommandExamples.ts) { #subscribe-current-state }

###SubmitAndWait

  This API takes Control command as input parameter along with time-out(seconds) and return a promise of `SubmitResponse` after waiting for a specified amount of time.

  The following example shows how submitAndWait API call would look like :

Typescript
:   @@snip [query](../../../../../example/src/documentation/command/CommandExamples.ts) { #submit-and-wait }

###SubmitAllAndWait

  This API takes multiple control commands as input parameter along with time-out(seconds) and return a promise of `SubmitResponse[]` after waiting for a specified amount of time.

  The following example shows how submitAllAndWait API call would look like :

Typescript
:   @@snip [query](../../../../../example/src/documentation/command/CommandExamples.ts) { #submit-all-and-wait }




