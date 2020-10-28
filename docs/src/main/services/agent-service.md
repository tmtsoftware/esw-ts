#Agent Service

Agent service provides HTTP interface to interact with all agent machines uniquely located using agent prefix.
APIs to spawn components takes agent prefix as parameter. Agent prefix is used to locate agent machine using location service.

Agent service provides APIs to spawn sequence manager, sequence components and to kill spawned components.

## Creation of Agent Service
### Pre-requisite
#### In order to use agent service APIs:

  1. Agent machines should be up and running.
  1. Locations of agent machines should be registered in Location Service.
  1. Authorization Token with correct access role.
     Documentation on how to fetch access token could be found @ref[here](../aas/csw-aas-js.md).

#### To create Agent client:

Typescript
:   @@snip [Agent-Service](../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #agent-service-creation }

@@@ note {title="Async-Await" }

Note that the examples are using async/await which makes handling of promises more readable.

@@@

## Usages of Agent Service

Type definitions for All Agent Service methods can be found  @extref:[here](ts-docs:interfaces/clients.agentservice.html)

## Spawning a Sequence Manager
Agent Service requires agent(a component of type :`Machine`) to be able to process requests. once it locates an agent using location service with the help of agent prefix, it sends a spawn sequence manager command to the agent machine.
The corresponding api call fails If the Sequence Manager is already running, or the underlying agent fails to spawn it.

Type definitions for `spawnSequenceManager` can be found @extref:[here](ts-docs:interfaces/clients.agentservice.html#spawnsequencemanager)

Typescript
:   @@snip [Agent-Service](../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #spawnSeqeunceManager }


## Spawning a Sequence Component

Similar to spawning a [Sequence Manager](#spawning-a-sequence-manager), Agent service locates an agent then it sends a spawn sequence component command to the agent machine.
the corresponding api call fails If the Sequence Component is already running, or the underlying agent fails to spawn it.

Type definitions for `spawnSequenceComponent` can be found @extref:[here](ts-docs:interfaces/clients.agentservice.html#spawnsequencecomponent)

Typescript
:   @@snip [Agent-Service](../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #spawnSeqeunceComponent }

## Kill Component
Agent service kills any process running on the agent machine using the process id ([pid](https://www.computerhope.com/jargon/p/pid.htm)) of that component. it uses location service to find the process id from the metadata field of @extref:[location information.](ts-docs:modules/models.html#location)

Type definitions for `killComponent` can be found @extref:[here](ts-docs:interfaces/clients.agentservice.html#killcomponent)

Typescript
:   @@snip [Agent-Service](../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #killcomponent }
