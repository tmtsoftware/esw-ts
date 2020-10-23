# Technical Design Documentation

@@@ index
 - [Agent service](../services/agent-service.md)
 - [Sequence Manager service](../services/sequence-manager-service.md)
 - [AAS](csw-aas-js.md)
 - [Service Contracts](../common/contract.md)

@@@

## Architectural overview

Following diagram explains UI application flow for making request to TMT backend component and explains where does the ESW-TS service fits in the whole TMT architecture.

![esw-ts-overview](../assets/esw-ts-architecture-overview.png)

For example:
A web app specifically created for sending control command to a HCD component.

1. User clicks on submit button.
1. Command Service of ESW-TS creates appropriate payload adhering to @ref:[service contract](../common/contract.md) exposed by GatewayServer
1. **ESW-TS** service uses fetch api of browser to make request.
1. Gateway Server on receiving correct payload, process it and sends the Control command to the destined HCD component.
1. On successfully handling of command by HCD component, GatewayServer returns a SuccessResponse.
1. esw-ts handles the response and returns it, as it was received to the caller web-ui component
   or in case of error throw's @extref:[ServiceError](ts-docs:classes/models.serviceerror.html).
