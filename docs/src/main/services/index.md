# Services

These are javascript adapters for each of public facing TMT services. They provide a handle to interact with backend server while adhering to the service contract.

## Architecture

TMT Services are behind @extref[ESW Gateway Server](esw:eswgateway/esw-gateway.html) except Location and Config Server.

Follow the instructions in the first step of our [quickstart](../index.html#getting-started) guide to integrate one or more services in the UI application.

## Common models
These common set of models enable interoperability between services.
For Ex: When a [control command](../../../ts-docs/modules/_lib_src_models_params_command_.html#controlcommand) is going to be submitted to a component via Command service's [Submit Api](../../../ts-docs/interfaces/_lib_src_clients_command_commandservice_.commandservice.html#submit), it can receives [SubmitResponse](../../../ts-docs/modules/_lib_src_models_params_commandresponse_.html#submitresponse) of Completed type which has ParamSet in the Result field.
the parameter then can be used by [LoggingService](../../../ts-docs/modules/_lib_src_clients_logger_loggingservice_.html) to log it.

Type definition for all common models can be found [here](../../../ts-docs/globals.html)

## Error handling pattern

The following examples shows how to call AgentService api's and handle the response `SpawnResponse` and `KillResponse`.

This example also illustrates error handling of service specific exception `AgentNotFoundException` along with the generic errors like `TransportError` and `ArithmeticException` will look like.

@@@ warning {title="Exploiting try-catch is an anti-pattern"}
The example uses `try-catch` to handle errors and exceptions. Generally those errors/exceptions are handled at UI framework level on boundaries of service calls.
This example will be updated once we have frontend framework setup in place.
@@@

A function whose responsibility is to handle errors & exceptions

Typescript
:   @@snip [Response](../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #handle-error }

Example for spawnSequenceManager api with error handling looks like following:

Typescript
:   @@snip [Response](../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #response-handling-spawn }

These are following services available:

@@toc { .main depth=0 }

@@@ index
- @ref:[Admin Service](admin/admin-service.md)
- @ref:[Agent Service](agent-service/agent-service.md)
- @ref:[Command Service](command/command-service.md)
- @ref:[Config Service](config/config-service.md)
- @ref:[Event Service](event/event-service.md)
- @ref:[Location Service](location/location-service.md)
- @ref:[Sequencer Service](sequencer/sequencer-service.md)
- @ref:[Sequence Manager Service](sequence-manager/sequence-manager-service.md)
@@@
