# Sequence Manager Service

The Sequence Manager Service manages all the operation related to the observations.
It manages all sequence components and sequencers required for the observations.

Sequence Manager Service has following [API](#apis):

| API                                                             | Input args         | Returns                           |
| --------------------------------------------------------------- | ------------------ | --------------------------------- |
| [configure](#configure)                                         | obsMode            | ConfigureResponse                 |
| [provision](#provision)                                         | config             | ProvisionResponse                 |
| [getRunningObsModes](#getrunningobsmodes)                       |                    | GetRunningObsModesResponse        |
| [startSequencer](#startsequencer)                               | subsystem, obsMode | StartSequencerResponse            |
| [restartSequencer](#restartsequencer)                           | subsystem, obsMode | RestartSequencerResponse          |
| [shutdownSequencer](#shutdownsequencer)                         | subsystem, obsMode | ShutdownSequencersResponse        |
| [shutdownSubsystemSequencers](#shutdownsubsystemsequencers)     | subsystem          | ShutdownSequencersResponse        |
| [shutdownObsModeSequencers](#shutdownobsmodesequencers)         | obsMode            | ShutdownSequencersResponse        |
| [shutdownAllSequencers](#shutdownallsequencers)                 |                    | ShutdownSequencersResponse        |
| [shutdownSequenceComponent](#shutdownsequencecomponent)         | prefix             | ShutdownSequenceComponentResponse |
| [shutdownAllSequenceComponents](#shutdownallsequencecomponents) |                    | ShutdownSequenceComponentResponse |
| [getAgentStatus](#getagentstatus)                               |                    | AgentStatusResponse               |

## Creation of Sequence Manager Service

### Pre-requisite

#### In order to use Sequence Manager Service APIs

1. Subsystem's agent machines should be up and running.
1. Sequence Manager should be spawned. Documentation on how to spawn Sequence Manager could be found @ref[here](agent-service.md).
1. Authorization Token with correct access role.
 Documentation on how to fetch authorization token could be found @ref[here](../aas/csw-aas-js.md).

#### To create Sequence Manager client

Typescript
: @@snip [Sequence-Manager-Service](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#sequence-manager-service-creation}

## Usages of Sequence Manager Service

### configure

 It starts sequencers needed for an observation mode. Before starting sequencer, it checks for resource
 conflict between requested observation mode and running observation mode. The required sequencers and
 resources are listed in `obsModeConfig` file provided at boot up time of Sequence Manager. It returns
 `ConflictingResourcesWithRunningObsMode` if required resources are not available. This method returns response
 containing `Success` as `ConfigureResponse` after successful start of all required sequencers.

The following example shows how to call `configure` method. Here machines will be setup for `'IRIS_DarkNight'` observation mode.

Typescript
: @@snip [configure](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#configure}

### provision

 This method shuts down all the running sequence components and provisions the new sequence components in
 accordance with the provided configuration. The configuration specifies number of sequence components
 needed to be spawned on a particular agent. It returns `Success` as `ProvisionResponse` after successful
 spawning of components.

 In following example, three sequence components will be spawned on `'ESW.agent-machine'` agent machine and two sequence
 component will be spawned on `'IRIS.agent-machine'` agent machine.

Typescript
: @@snip [provision](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#provision}

### getRunningObsModes

 This method returns all the running observation modes.

 The following example shows how to call `getRunningObsModes` method:

Typescript
: @@snip [getRunningObsModes](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#getRunningObsModes}

### startSequencer

 This method starts the sequencer for given subsystem and observation mode.
 It uses the subsystem's sequence component, if not available, fallbacks to ESW sequence component.

 The following example shows how to call `startSequencer` method:

Typescript
: @@snip [startSequencer](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#startSequencer}

### restartSequencer

This method restarts the existing running sequencer of given subsystem and observing mode.

The following example shows how to call `restartSequencer` method:

Typescript
: @@snip [restartSequencer](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#restartSequencer}

### shutdownSequencer

This method shuts down the running sequencer of given subsystem and observation mode.

The following example shows how to call `shutdownSequencer` method:

Typescript
: @@snip [shutdownSequencer](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#shutdownSequencer}

### shutdownSubsystemSequencers

This method shuts down all the running sequencers of given subsystem.

The following example shows how to call `shutdownSubsystemSequencers` method:

Typescript
: @@snip [shutdownSubsystemSequencers](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#shutdownSubsystemSequencers}

### shutdownObsModeSequencers

This method shuts down all the running sequencers of given observation mode.

The following example shows how to call `shutdownObsModeSequencers` method:

Typescript
: @@snip [shutdownObsModeSequencers](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#shutdownObsModeSequencers}

### shutdownAllSequencers

This method shuts down all the running sequencers.

The following example shows how to call `shutdownAllSequencers` method:

Typescript
: @@snip [shutdownAllSequencers](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#shutdownAllSequencers}

### shutdownSequenceComponent

This method shuts down sequence component with provided prefix.

The following example shows how to call `shutdownSequenceComponent` method:

Typescript
: @@snip [shutdownSequenceComponent](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#shutdownSequenceComponent}

### shutdownAllSequenceComponents

This method shuts down all the sequence components.

The following example shows how to call `shutdownAllSequenceComponents` method:

Typescript
: @@snip [shutdownAllSequenceComponents](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#shutdownAllSequenceComponents}

### getAgentStatus

 This method allows showing status of TMT ecosystem components (agents, sequence components and sequencers).
 It returns all agents that are up and running, sequence components running on those agents and sequencer script loaded on sequence component.

 The following example shows how to call `getAgentStatus` method:

Typescript
: @@snip [getAgentStatus](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#getAgentStatus}
