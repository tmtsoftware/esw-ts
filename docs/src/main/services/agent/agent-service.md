#Agent Service

Agent service provides HTTP interface to interact with all agent machines uniquely located using agent prefix.
APIs to spawn components takes agent prefix as parameter. Agent prefix is used to locate agent machine using location service.
After agent is located, command like spawn sequence manager or spwan sequence component is forwarded to that agent machine.
Agent service provides APIs to spawn sequence manager, sequence components and to kill spawned components.

Agent service has following [APIs](#apis):

* [spawnSequenceManager](#spawnsequencemanager)
* [spawnSequenceComponent](#spawnsequencecomponent)
* [killComponent](#killcomponent)


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

###spawnSequenceManager

   This API spawns new sequence manager on given agent machine.

   It takes a prefix of the agent machine on which sequence manager needs to be spawned. Observation mode config file can
   be present on local(agent machine) or on config server. In case of local file, absolute path should be provided.
   Sequence manager version is an optional field. When version isn't specified, default version gets picked up.


| Arguments                                                  | Description                                                                | Required/Optional |Default |
|-----------------------                                     | -------------------------------------------------------------------------  | ------------ | ----------- |
| agentPrefix: [Prefix](../../params/commands.html#prefix)   | prefix of the agent machine on which sequence manager needs to be spawned  | Required |   |
| obsModeConfigPath: **string**                              | path of the observation mode (local path or remote i.e config server path) | Required |  |
| isConfigLocal: **boolean**                                 | true if configPath is local path, false in case of remote path.            | Required |  |
| version: **string**                                        | The sequence manager version.           | Optional |  latest |

The following example shows how to call spawnSequenceManager API :

Typescript
:   @@snip [spawnSequenceManager](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #spawnSeqeunceManager }

###spawnSequenceComponent

   This API spawns new sequence component on agent machine which is located using agent prefix provided.

   It takes a prefix of the agent machine, component name and ocs-app library version. Version is an optional field.
    When version isn't specified, default version gets picked up.

| Arguments                                                  | Description                                                                | Required/Optional | Default|
|-----------------------                                     | -------------------------------------------------------------------------  | ------------      |--------|
| agentPrefix: [Prefix](../../params/commands.html#prefix)   | prefix of the agent machine on which sequence manager needs to be spawned  | Required          |      |
| componentName: **string**                                  |The name of the component                                                   | Required          |      |
| version: **string**                                        | The OCS App version.                                                       | Optional          | latest |

The following example shows how to call spawnSequenceComponent API :

Typescript
:   @@snip [spawnSequenceComponent](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #spawnSeqeunceComponent }

###killComponent

   This API allows to kill any component registered with location service.

   It takes `Connection` as a input which can be either of following: `AkkaConnection`, `HttpConnection`, `TcpConnection`.

| Arguments                                                   | Description                                                                | Required/Optional | Default|
|------------------------------------------------------------ | -------------------------------------------------------------------------  | ------------      |--------|
| connection: [Connection](../../services/location/location-service.html#connections)   | The Connection of the machine where component is spawned. | Required |      |

The following example shows how to call killComponent API :

Typescript
:   @@snip [killComponent](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #killComponent }


## Sample usage

The following examples shows how to call AgentService api's and handle the response `SpawnResponse` and `KillResponse`.

This example also illustrates error handling of service specific exception `AgentNotFoundException` along with the generic errors like `TransportError` and `ArithmeticException` will look like.

@@@ note {title=try-catch is anti-pattern}
The example uses `try-catch` to handle errors and exceptions. Generally those errors/exceptions are handled at UI framework level on boundaries of service calls.
This example will be updated once we have frontend framework setup in place.
@@@

A function whose responsibility is to handle errors & exceptions

Typescript
:   @@snip [Response](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #handle-error }

Example for spawnSequenceManager api with error handling looks like following:

Typescript
:   @@snip [Response](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #response-handling-spawn }

Example for killComponent api with error handling looks like following:

Typescript
:   @@snip [Response](../../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #response-handling-kill }

