# Services

These are javascript adapters for each of public facing TMT services. They provide a handle to interact with backend server while adhering to the service contract.

- Service contracts for esw services : [ESW Services Contract](https://github.com/tmtsoftware/tmtsoftware.github.io/tree/master/esw/$esw-version$/contracts)

- Service contracts for csw services : [CSW Services Contract ](https://github.com/tmtsoftware/tmtsoftware.github.io/tree/master/csw/$csw-version$/contracts)

## Architecture

TMT Services are behind @extref:[ESW Gateway Server](esw:eswgateway/esw-gateway.html) except Location and Config Server.

Follow the instructions in the first step of our [quickstart](../common/getting-started.html) guide to integrate one or more services in the UI application.

![esw-ts-overview](../assets/esw-ts-architecture-overview.png)

## Common models

These common set of models which enables the interoperability and communication between services.

For Ex: When a @extref:[control command](ts-docs:modules/models.html#controlcommand) is going to be submitted to a component via Command service's [Submit Api](ts-docs:interfaces/clients.commandservice.html#submit), it can receives [SubmitResponse](modules/models.html#submitresponse) of Completed type which has ParamSet in the Result field.
the parameter then can be used by @extref:[LoggingService](ts-docs:interfaces/clients.loggingservice.html) to log it.

Type definition for all common models used by services can be found [here](ts-docs:modules/models.html)

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
