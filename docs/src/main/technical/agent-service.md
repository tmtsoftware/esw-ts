# Agent Service

Agent Service provides HTTP interface to interact with all agent machines uniquely located using agent prefix.
APIs to spawn components takes agent prefix as parameter. Agent prefix is used to locate agent machine using Location Service.

Agent Service provides APIs to spawn Sequence Manager, Sequence Components and to kill spawned components.

## Creation of Agent Service

### Pre-requisite

#### In order to use agent service APIs

  1. Agent machines should be up and running.
  1. Locations of agent machines should be registered in Location Service.
  1. Authorization token with correct access role.
     Documentation on how to fetch authorization token could be found @ref[here](../aas/auth-components.md).

#### To create Agent Service client

Typescript
:   @@snip [Agent-Service](../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #agent-service-creation }

@@@ note {title="Async-Await" }

Note that the examples are using async/await which makes handling of promises more readable.

@@@

## Usages of Agent Service

Type definitions for all Agent Service methods can be found @extref:[here](ts-docs:interfaces/clients.agentservice.html)

## Spawning a Sequence Manager

Agent Service requires agent (a component of type :`Machine`) to be able to process requests. Once it locates an agent using Location Service with the help of agent prefix, it sends a spawn Sequence Manager command to the agent machine.
The corresponding AP call fails if the Sequence Manager is already running, or the underlying agent fails to spawn it.

Type definitions for `spawnSequenceManager` can be found @extref:[here](ts-docs:interfaces/clients.agentservice.html#spawnsequencemanager)

Typescript
:   @@snip [Agent-Service](../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #spawnSeqeunceManager }

## Spawning a Sequence Component

Similar to spawning a @ref[Sequence Manager](#spawning-a-sequence-manager), Agent Service locates an agent and then it sends a spawn Sequence Component command to the agent machine.
The corresponding API call fails if the Sequence Component is already running, or the underlying agent fails to spawn it.

Type definitions for `spawnSequenceComponent` can be found @extref:[here](ts-docs:interfaces/clients.agentservice.html#spawnsequencecomponent)

Typescript
:   @@snip [Agent-Service](../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #spawnSeqeunceComponent }

## Kill a Sequence Component

Agent service kills any process running on the agent machine using the process id ([pid](https://www.computerhope.com/jargon/p/pid.htm)) of that component. it uses location service to find the process id from the metadata field of @extref:[location information.](ts-docs:modules/models.html#location)

Type definitions for `killComponent` can be found @extref:[here](ts-docs:interfaces/clients.agentservice.html#killcomponent)

Typescript
:   @@snip [Agent-Service](../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #killcomponent }

## Getting Agent Status

To get Agent Status for a running Agent, `AgentService` provides `getAgentStatus` method.
This method allows showing status of TMT ecosystem components (agents, sequence components and sequencers).
It returns all agents that are up and running, sequence components running on those agents and sequencer script loaded on sequence component.

Type definitions of `getAgentStatus` method can be found @extref:[here](ts-docs:interfaces/clients.agentservice.html#getagentstatus)

The following example shows how to call `getAgentStatus` method:

Typescript
: @@snip [getAgentStatus](../../../../example/src/documentation/agent/AgentServiceExamples.ts){#getAgentStatus}
