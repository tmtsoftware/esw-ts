# Command Service
This service provides a handle to send commands to a component which is registered in location service.

Command service has following APIs:

|        API                |      Input args                       |          Returns                |     
| ------------------------- | ------------------------------------- | ----------------------------
| validate                  |   ControlCommand                      |     ValidateResponse            |   
| submit                    |   ControlCommand                      |     SubmitResponse              |                               
| oneway                    |   ControlCommand                      |     OnewayResponse              | 
| query                     |   runId                               |     SubmitResponse              |
| queryFinal                |   runId, timeoutInSeconds             |     SubmitResponse              |
| subscribeCurrentState     |   stateNames, onStateChangeCallback   |     Subscription                |
| submitAndWait             |   ControlCommand, timeoutInSeconds    |     SubmitResponse              |          
| submitAllAndWait          |   ControlCommand[ ], timeoutInSeconds |     SubmitResponse[ ]           |


## Creation of Command Service
### Pre-requisite
In order to use command client for a specific component:

  1. The component needs to be up and running behind the gateway server.
    `GatewayException(InvalidComponent)` will be thrown if the specified component is not found.
  2. Authorization Token with correct access role. 
     Examples of how to fetch access token can be found [here](../aas/token-factory.html).
          
For the given example : `Prefix(ESW.Component1)` needs to be registered in the location service as any of the component type (`HCD`, `Assembly`, etc.).

To create Command client for a component

Typescript
:   @@snip [Command-Service](../../../../../example/src/documentation/command/CommandExamples.ts) { #Command-Service-creation }

##APIs

### Validate

   This api takes Control command as input parameter and return a promise of `ValidateResponse`.
   
   In order to call this api, one of the control command is required. Depending on your use case, you will be sending either Setup or Observe Command.
   
Typescript
:   @@snip [control-command](../../../../../example/src/documentation/command/CommandExamples.ts) { #Control-commands }

  The following example shows how to call validate api :
   
Typescript
:   @@snip [control-command](../../../../../example/src/documentation/command/CommandExamples.ts) { #validate-call }



