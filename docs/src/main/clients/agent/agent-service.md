#Agent Service
This service provides a handle to spawn sequence manager and sequence components, to kill the components.

Agent service has following [APIs](#apis):

|        API                                        |      Input args                                        |          Returns   |
| ------------------------------------------------- | -----------------------------------------------------  | ------------------
| [spawnSequenceManager](#spawnsequencemanager)     | agentPrefix, obsModeConfigPath, isConfigLocal, version |     SpawnResponse  |
| [spawnSequenceComponent](#spawnsequencecomponent) | agentPrefix, componentName, version                    |     SpawnResponse  |
| [killComponent](#killcomponent)                   | connection                                             |     KillResponse   |


##Creation of Agent Service
###Pre-requisite
####In order to use agent service APIs:

  1. Agent machine should be up and running. Its location should be registered with location service.
  2. Authorization Token with correct access role.
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
:   @@snip [spawnSeqeunceManager](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #spawnSeqeunceManager }

###spawnSequenceComponent

   This API spawns new sequence component on given agent machine.

   It takes prefix of the agent machine, component name and ocs-app library version. Version is an optional field.
    When version isn't specified, default version gets picked up.

   API returns `Spawned` as a response when sequence component has spawned successfully.
   API returns `Failed` as a response if a sequence component with given component name and agent's subsystem is already present on any agent machine.

The following example shows how to call spawnSequenceComponent API :

Typescript
:   @@snip [spawnSeqeunceComponent](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #spawnSeqeunceComponent }

###killComponent

   This API is used to kill any component registered with location service. It takes `Connection` as a input which can be
   either of following: `AkkaConnection`, `HttpConnection`, `TcpConnection`.

   API returns `Killed` as a response if component is killed successfully.
   API returns `Failed` as a response if it fails to kill the component.

The following example shows how to call killComponent API :

Typescript
:   @@snip [killComponent](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #killComponent }
