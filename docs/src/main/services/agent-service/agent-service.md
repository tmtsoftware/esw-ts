#Agent Service

@extref:[Agent service](ts-docs:interfaces/clients.agentservice.html) provides HTTP interface to interact with all agent machines uniquely located using agent prefix.
APIs to spawn components takes agent prefix as parameter. Agent prefix is used to locate agent machine using location service.

Agent service provides APIs to spawn sequence manager, sequence components and to kill spawned components.

## Creation of Agent Service
### Pre-requisite
#### In order to use agent service APIs:

  1. Agent machines should be up and running.
  1. Locations of agent machines should be registered in Location Service.
  1. Authorization Token with correct access role.
     Documentation on how to fetch access token could be found @ref[here](../../aas/csw-aas-js.md).

#### To create Agent client:

Typescript
:   @@snip [Agent-Service](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #agent-service-creation }

## APIs

@@@ note {title="Async-Await" }

Note that the examples are using async/await which makes handling of promises more readable.

@@@

Type definations for all Agent Service API's can be found @extref:[here](ts-docs:interfaces/clients.agentservice.html) :

Type definations for specific api can be found by following links:

- @extref:[spawnSequenceManager](ts-docs:interfaces/clients.agentservice.html#spawnsequencemanager)
- @extref:[spawnSequenceComponent](ts-docs:interfaces/clients.agentservice.html#spawnsequencecomponent)
- @extref:[killComponent](ts-docs:interfaces/clients.agentservice.html#killcomponent)

## Spawn Component

### Spawning a Sequence Manager
Agent Service requires agent(a component of type :`Machine`) to be able to process requests. once it locates an agent using location service with the help of @extref[agent prefix](ts-docs:classes/models.prefix.html), it sends a spawn sequence manager command to the agent machine.
The corresponding api call fails If the Sequence Manager is already running, or the underlying agent fails to spawn it.

Typescript
:   @@snip [Agent-Service](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #spawnSeqeunceManager }


### Spawning a Sequence Component

Similar to spawning a [Sequence Manager](#spawning-a-sequence-manager), Agent service locates an agent then it sends a spawn sequence component command to the agent machine.
the corresponding api call fails If the Sequence Component is already running, or the underlying agent fails to spawn it.

Typescript
:   @@snip [Agent-Service](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #spawnSeqeunceComponent }

## Kill Component
Agent service kills any process running on the agent machine using the process id ([pid](https://www.computerhope.com/jargon/p/pid.htm)) of that component. it uses location service to find the process id from the metadata field of @extref:[location information](ts-docs:modules/models.html#location)

Typescript
:   @@snip [Agent-Service](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #killcomponent }
