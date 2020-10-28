# Services

These are javascript adapters for each of public facing TMT services. They provide a handle to interact with backend server while adhering to the service contract.

TMT Services are behind @extref:[ESW Gateway Server](esw:eswgateway/esw-gateway.html) except Location and Config Server.

Follow the instructions in the first step of our [quickstart](../common/getting-started.html) guide to integrate one or more services in the UI application.

These are following services available:

@@toc { .main depth=0 }

@@@ index

- @ref:[Admin Service](admin-service.md)
- @ref:[Alarm Service](alarm-service.md)
- @ref:[Command Service](command-service.md)
- @ref:[Config Service](config-service.md)
- @ref:[Event Service](event-service.md)
- @ref:[Location Service](location-service.md)
- @ref:[Logging Service](logging-service.md)
@@@

Type definition for all services can be found @extref[here](ts-docs:modules/clients.html)

- Admin Service : This service provides a handle to admin related APIs which includes logging related APIs
- Agent Service : The Agent Service is used to spawn a component of machine or kill a running component. To do so, it uses the agent running on that specific machine where component is to be spawned or killed.
- Command Service : This client side service provides a handle to send commands to a component which is registered in location service.
- Config Service : The Config Service wraps the low level communication with Configuration Service Server and exposes simple to use methods to access and manage configuration files.
- Event Service : The Event Service enables users to publish events and subscribe to events which are published by underlying TMT components.
- Location Service : The Location Service provides access to location information of various components which are currently running the TMT cluster.
- Sequencer Service : This service provides a handle to send commands to a sequencer which is registered in location service.
- Sequence Manager Service : The Sequence Manager Service manages all the operation related to the observations. It manages all sequence components and sequencers required for the observations.
