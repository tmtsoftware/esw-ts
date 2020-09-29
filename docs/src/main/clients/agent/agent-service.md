#Agent Service

Agent service provides HTTP interface to interact with all agent machines uniquely located using agent prefix.
APIs to spawn components takes agent prefix as parameter. Agent prefix is used to locate agent machine using location service.
After agent is located, command like spawn sequence manager or spwan sequence component is forwarded to that agent machine.
Agent service provides APIs to spawn sequence manager, sequence components and to kill spawned components.

Agent service has following [APIs](#apis):

|        API                                        |      Input args                                        |          Returns   |
| ------------------------------------------------- | -----------------------------------------------------  | ------------------
| [spawnSequenceManager](#spawnsequencemanager)     | agentPrefix, obsModeConfigPath, isConfigLocal, version |     SpawnResponse  |
| [spawnSequenceComponent](#spawnsequencecomponent) | agentPrefix, componentName, version                    |     SpawnResponse  |
| [killComponent](#killcomponent)                   | connection                                             |     KillResponse   |


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

###spawnSequenceManager

   This API spawns new sequence manager on given agent machine.

   It takes a prefix of the agent machine on which sequence manager needs to be spawned. Observation mode config file can
   be present on local(agent machine) or on config server. In case of local file, absolute path should be provided.
   Sequence manager version is an optional field. When version isn't specified, default version gets picked up.

   API returns `Spawned` as a response when sequence manager has spawned successfully.
   API returns `Failed` as a response if a sequence manager is already present.

The following example shows how to call spawnSequenceManager API :

Typescript
:   @@snip [spawnSequenceManager](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #spawnSeqeunceManager }

###spawnSequenceComponent

   This API spawns new sequence component on agent machine which is located using agent prefix provided.

   It takes a prefix of the agent machine, component name and ocs-app library version. Version is an optional field.
    When version isn't specified, default version gets picked up.

   API returns `Spawned` as a response when sequence component has spawned successfully.
   API returns `Failed` as a response if a sequence component with given component name and agent's subsystem is already present on any agent machine.

The following example shows how to call spawnSequenceComponent API :

Typescript
:   @@snip [spawnSequenceComponent](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #spawnSeqeunceComponent }

###killComponent

   This API allows to kill any component registered with location service. It takes `Connection` as a input which can be
   either of following: `AkkaConnection`, `HttpConnection`, `TcpConnection`.

   API returns `Killed` as a response if component is killed successfully.
   API returns `Failed` as a response if it fails to kill the component.

The following example shows how to call killComponent API :

Typescript
:   @@snip [killComponent](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #killComponent }
