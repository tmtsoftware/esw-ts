# Command Service
This client side service provides a handle to send commands to a component which is registered in location service.

Command service has following [APIs](#apis):

|        API                |      Input args                       |          Returns           |
| ------------------------- | ------------------------------------- | ---------------------------
| [validate](#validate)     |   ControlCommand                      |     ValidateResponse       |
| [submit](#submit)         |   ControlCommand                      |     SubmitResponse         |
| [oneway](#oneway)         |   ControlCommand                      |     OnewayResponse         |
| [query](#query)           |   runId                               |     SubmitResponse         |
| [queryFinal](#query-final) |   runId, timeoutInSeconds             |     SubmitResponse         |
| [subscribeCurrentState]
  (#subscribe-current-state)  |   stateNames, onStateChangeCallback   |     Subscription           |
| [submitAndWait]
   (#submit-and-wait)         |   ControlCommand, timeoutInSeconds    |     SubmitResponse         |
| [submitAllAndWait]
  (#submit-all-and-wait)       |   ControlCommand[ ], timeoutInSeconds |     SubmitResponse[ ]      |


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
   In order to call following api, one of the control command needs to be sent. Depending on your use case, you will be sending either Setup or Observe Command.

   Following examples show how to create control commands:

Typescript
:   @@snip [control-command](../../../../../example/src/documentation/command/CommandExamples.ts) { #control-commands }

##APIs

@@@ note {title="Async-Await" }

Note that the examples are using async/await which makes handling of promises more readable.

@@@

###Validate

  This api takes Control command as input parameter and return a promise of `ValidateResponse`.

  The following example shows how to call validate api :

Typescript
:   @@snip [validate](../../../../../example/src/documentation/command/CommandExamples.ts) { #validate }

###Submit

  This api takes Control command as input parameter and return a promise of `SubmitResponse`.

  The following example shows how to call submit api :

Typescript
:   @@snip [submit](../../../../../example/src/documentation/command/CommandExamples.ts) { #submit }


###Oneway

  This api takes Control command as input parameter and return a promise of `OnewayResponse`.

  The following example shows how to call oneway api :

Typescript
:   @@snip [oneway](../../../../../example/src/documentation/command/CommandExamples.ts) { #oneway }

###Query

  This api takes runId of already submitted command as input parameter and return a promise of `SubmitResponse`.

  The following example shows how to call query api :

Typescript
:   @@snip [query](../../../../../example/src/documentation/command/CommandExamples.ts) { #query }

###Query Final

  This api is same as query , only difference is takes time-out (seconds) along with runId of already submitted command as input parameter and return a promise of `SubmitResponse`.

  The following example shows how to call query final api :

Typescript
:   @@snip [query](../../../../../example/src/documentation/command/CommandExamples.ts) { #query-final }

###Subscribe Current State

  This api takes set of current states to be subscribed along with a callback which will get triggered on change of the mentioned states.(`stateName1`,`stateName2`)

  The following example shows how subscribeCurrentState api call would look like :

Typescript
:   @@snip [query](../../../../../example/src/documentation/command/CommandExamples.ts) { #subscribe-current-state }

###Submit And Wait

  This api takes Control command as input parameter along with time-out(seconds) and return a promise of `SubmitResponse` after waiting for a specified amount of time.

  The following example shows how submitAndWait api call would look like :

Typescript
:   @@snip [query](../../../../../example/src/documentation/command/CommandExamples.ts) { #submit-and-wait }

###Submit All And Wait

  This api takes multiple control commands as input parameter along with time-out(seconds) and return a promise of `SubmitResponse[]` after waiting for a specified amount of time.

  The following example shows how submitAllAndWait api call would look like :

Typescript
:   @@snip [query](../../../../../example/src/documentation/command/CommandExamples.ts) { #submit-all-and-wait }




