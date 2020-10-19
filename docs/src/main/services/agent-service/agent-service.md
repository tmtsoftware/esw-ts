#Agent Service

[Agent service](../../../../../ts-docs/interfaces/clients.agentservice.html) provides HTTP interface to interact with all agent machines uniquely located using agent prefix.
APIs to spawn components takes agent prefix as parameter. Agent prefix is used to locate agent machine using location service.
After agent is located, command like spawn sequence manager or spwan sequence component is forwarded to that agent machine.
Agent service provides APIs to spawn sequence manager, sequence components and to kill spawned components.

##Creation of Agent Service
###Pre-requisite
####In order to use agent service APIs:

  1. Agent machines should be up and running.
  2. Locations of agent machines should be registered in Location Service.
  3. Authorization Token with correct access role.
     Documentation on how to fetch access token could be found @ref[here](../../aas/csw-aas-js.md).

####To create Agent client:

Typescript
:   @@snip [Agent-Service](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #agent-service-creation }

##APIs

@@@ note {title="Async-Await" }

Note that the examples are using async/await which makes handling of promises more readable.

@@@

Agent service has following APIs :

- [spawnSequenceManager](../../../../../ts-docs/interfaces/clients.agentservice.html#spawnsequencemanager)
- [spawnSequenceComponent](../../../../../ts-docs/interfaces/clients.agentservice.html#spawnsequencecomponent)
- [killComponent](../../../../../ts-docs/interfaces/clients.agentservice.html#killcomponent)
