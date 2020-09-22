# Command Service
This service provides a handle to send commands to a component which is registered in location service.

Command service has following APIs:

* validate
* submit
* oneway
* query
* queryFinal
* subscribeCurrentState
* submitAndWait
* submitAllAndWait

Creation of Command Service
    
Typescript
:   @@snip [Command-Service](../../../../../example/src/documentation/command/CommandExamples.ts) { #Command-Service-creation }


### Validate

   This api takes Control command and return a promise of ValidateResponse (add a link to validate response).
   
   How to create control commands
   
Typescript
:   @@snip [control-command](../../../../../example/src/documentation/command/CommandExamples.ts) { #Control-commands }

   How to call validate api using the command service
   
Typescript
:   @@snip [control-command](../../../../../example/src/documentation/command/CommandExamples.ts) { #validate-call }



