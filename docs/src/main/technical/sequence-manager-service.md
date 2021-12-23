# Sequence Manager Service

The Sequence Manager Service manages all the operation related to the observations.
It manages all sequence components and sequencers required for the observations.

## Creation of Sequence Manager Service

### Pre-requisite

#### In order to use Sequence Manager Service APIs

1. Subsystem's agent machines should be up and running.
1. Sequence Manager should be spawned. Documentation on how to spawn Sequence Manager could be found @ref[here](agent-service.md).
1. Authorization Token with correct access role.
 Documentation on how to fetch authorization token could be found @ref[here](../aas/auth-components.md).

#### To create Sequence Manager client

Typescript
: @@snip [Sequence-Manager-Service](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#sequence-manager-service-creation}

## Usages of Sequence Manager Service

## Configuring Resources

To configure resources, `SequenceManagerService` provides `configure` method.
This method starts sequencers needed for an observation mode. Before starting sequencer, it checks for resource
conflict between requested observation mode and running observation mode. The required sequencers and
resources are listed in `obsModeConfig` file provided at boot up time of Sequence Manager. It returns
`ConflictingResourcesWithRunningObsMode` if required resources are not available. This method returns response
containing `Success` as `ConfigureResponse` after successful start of all required sequencers.

The following example shows how to call `configure` method. Here machines will be setup for `'IRIS_DarkNight'` observation mode.

Type definitions of `configure` method can be found @extref:[here](ts-docs:interfaces/clients.sequencemanagerservice.html#configure)

Typescript
: @@snip [configure](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#configure}

## Provisioning

To provision resources, `SequenceManagerService` provides `provision` method.
This method shuts down all the running sequence components and provisions the new sequence components in
accordance with the provided configuration. The configuration specifies number of sequence components
needed to be spawned on a particular agent. It returns `Success` as `ProvisionResponse` after successful
spawning of components.

In following example, three sequence components will be spawned on `'ESW.agent-machine'` agent machine and two sequence
component will be spawned on `'IRIS.agent-machine'` agent machine.

Type definitions of `provision` method can be found @extref:[here](ts-docs:interfaces/clients.sequencemanagerservice.html#provision)

Typescript
: @@snip [provision](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#provision}

## Getting ObsModes Details

To get all obsModes details, `SequenceManagerService` provides `getObsModesDetails` method.
This method returns all the observation modes with their status.

Type definitions of `getObsModesDetails` method can be found @extref:[here](ts-docs:interfaces/clients.sequencemanagerservice.html#getObsModesDetails)

The following example shows how to call `getObsModesDetails` method:

Typescript
: @@snip [getObsModesDetails](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#getObsModesDetails}

## Starting a Sequencer

To start a Sequencer, `SequenceManagerService` provides `startSequencer` method.
This method starts the sequencer for given subsystem, observation mode and variation(optional parameter). Variation can be used when users whats to run multiple sequencers of the same susbystem and observation mode.
It uses the subsystem's sequence component, if not available, fallbacks to ESW sequence component.

Type definitions of `startSequencer` method can be found @extref:[here](ts-docs:interfaces/clients.sequencemanagerservice.html#startsequencer)

The following example shows how to call `startSequencer` method:

Typescript
: @@snip [startSequencer](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#startSequencer}

### Restarting a Sequencer

To restart a Sequencer, `SequenceManagerService` provides `restartSequencer` method.
This method restarts the existing running sequencer of given subsystem, observation mode  and variation(optional parameter). Variation can be used when users whats to restart multiple sequencers of the same susbystem and observation mode.

Type definitions of `restartSequencer` method can be found @extref:[here](ts-docs:interfaces/clients.sequencemanagerservice.html#restartsequencer)

The following example shows how to call `restartSequencer` method:

Typescript
: @@snip [restartSequencer](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#restartSequencer}

## Shutting down Sequencers

To shut down one or more Sequencer, `SequenceManagerService` provides following methods:

- **shutdownSequencer** - This method shuts down the running sequencer of given subsystem,  observation mode  and variation(optional parameter). Variation can be used when users whats to shutdown multiple sequencers of the same susbystem and observation mode.

Typescript
: @@snip [shutdownSequencer](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#shutdownSequencer}

- **shutdownSubsystemSequencers** - This method shuts down all the running sequencers of given subsystem.

Typescript
: @@snip [shutdownSubsystemSequencers](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#shutdownSubsystemSequencers}

- **shutdownObsModeSequencers** - This method shuts down all the running sequencers of given observation mode.

Typescript
: @@snip [shutdownObsModeSequencers](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#shutdownObsModeSequencers}

- **shutdownAllSequencers** - This method shuts down all the running sequencers.

Typescript
: @@snip [shutdownAllSequencers](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#shutdownAllSequencers}

Type definitions of these methods are below:

- @extref:[shutdownSequencer](ts-docs:interfaces/clients.sequencemanagerservice.html#shutdownsequencer)
- @extref:[shutdownSubsystemSequencers](ts-docs:interfaces/clients.sequencemanagerservice.html#shutdownsubsystemsequencers)
- @extref:[shutdownObsModeSequencers](ts-docs:interfaces/clients.sequencemanagerservice.html#shutdownobsmodesequencers)
- @extref:[shutdownAllSequencers](ts-docs:interfaces/clients.sequencemanagerservice.html#shutdownallsequencers)

## Shutting down Sequence Components

To shut down one or more Sequence Components, `SequenceManagerService` provides following methods:

- **shutdownSequenceComponent** - This method shuts down sequence component with provided prefix.

Typescript
: @@snip [shutdownSequenceComponent](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#shutdownSequenceComponent}

- **shutdownAllSequenceComponents** - This method shuts down all the sequence components.

Typescript
: @@snip [shutdownAllSequenceComponents](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#shutdownAllSequenceComponents}

Type definitions of these methods are below:

- @extref:[shutdownSequenceComponent](ts-docs:interfaces/clients.sequencemanagerservice.html#shutdownsequencecomponent)
- @extref:[shutdownAllSequenceComponents](ts-docs:interfaces/clients.sequencemanagerservice.html#shutdownallsequencecomponents)

## Getting Resources Status

To get all Resources Status, `SequenceManagerService` provides `getResources` method.
This method returns all the resources with their status(Available | InUse), if resource is in use it will also send obsMode along with it.

Type definations of `getResources` method can be found @extref:[here](ts-docs:interfaces/clients.sequencemanagerservice.html#getResources)

The following example shows how to call `getResources` method:

Typescript
: @@snip [getResources](../../../../example/src/documentation/sequence-manager/SequenceManagerServiceExamples.ts){#getResources}
