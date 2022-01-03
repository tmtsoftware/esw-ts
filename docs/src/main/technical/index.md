# Technical Design Documentation

@@@ index

- [Agent Service](agent-service.md)
- [Sequencer Service](../technical/sequencer-service.md)
- [Sequence Manager Service](sequence-manager-service.md)
- [AAS](auth-components.md)
- [Service Contracts](../common/contract.md)

@@@

## Architectural overview

Following diagram explains UI application flow for making request to TMT backend component and explains where does the ESW-TS service fits in the whole TMT architecture.

![esw-ts-overview](../assets/esw-ts-architecture-overview.png)

For example:
A Web application specifically created for sending Control Command to a HCD component.

1. User clicks on "submit" button.
1. Command Service of ESW-TS creates appropriate payload adhering to @ref:[service contract](../common/contract.md) exposed by Gateway Server.
1. **ESW-TS** service uses fetch API of browser to make request.
1. Gateway Server on receiving correct payload, processes it and sends the Control Command to the destined HCD component.
1. On successfully handling of command by HCD component, Gateway Server returns a `SuccessResponse`.
1. ESW-TS handles the response and returns it, as it was received to the caller Web-UI component
   or in case of error throws @extref:[ServiceError](ts-docs:classes/models.ServiceError.html).
