# Commands

Commands are parameter sets called Setup, Observe, and Wait. A command is created with the source of the command,
given by a prefix, the name of the command, and an optional ObsId. Parameters are added to the command as needed.

## ObsId

An `ObsID`, or observation ID, indicates the observation the command is associated with.
It is a simple string.

Typescript
:   @@snip [CommandsTest.scala](../../../../example/src/documentation/params/CommandExample.ts) { #obsid }

## Prefix

The source of the command is given by the prefix, which should be the full name of the component sending the command.
A prefix can be constructed with a string, but must start with a valid subsystem as in [Subsystem](subsystem.html).
A component developer should supply a valid prefix string and the subsystem will be automatically parsed from it.
An example of a valid string prefix is "nfiraos.ncc.trombone".

See below examples:

Typescript
:   @@snip [CommandsTest.scala](../../../../example/src/documentation/params/CommandExample.ts) { #prefix }

## CommandName

Each command has a name given as a string. The string should be continuous with no spaces.

## Setup Command

This command is used to describe a goal that a system should match. The component developer is required to supply
following arguments to create a `Setup` command.


 * **[Prefix:](commands.html#prefix)** the source of the command as described above
 * **CommandName:** a simple string name for the command (no spaces)
 * **[ObsId:](commands.html#obsId)** an optional observation Id.
 * **paramSet:** Optional Set of Parameters. Default is empty.

Typescript
:   @@snip [CommandsTest.scala](../../../../example/src/documentation/params/CommandExample.ts) { #setup }

## Observe Command

This command describes a science observation. It is intended to only be sent to Science Detector Assemblies and Sequencers.

Typescript
:   @@snip [CommandsTest.scala](../../../../example/src/documentation/params/CommandExample.ts) { #observe }


## Wait Command

This command causes a Sequencer to wait until notified.  It can only be sent to Sequencers.

Typescript
:   @@snip [CommandsTest.scala](../../../../example/src/documentation/params/CommandExample.ts) { #wait }


## Unique Key constraint

By design, a ParameterSet in a **Setup, Observe,** or **Wait** command is optimized to store only unique keys.
When using `add` or `madd` methods on commands to add new parameters, if the parameter being added has a key which is already present in the `paramSet`,
the already stored parameter will be replaced by the given parameter.

@@@ note

If the `Set` is created by component developers and given directly while creating a command, then it will be the responsibility of component developers to maintain uniqueness with
parameters based on key.

@@@

Here are some examples that illustrate this point:

Typescript
:   @@snip [CommandsTest.scala](../../../../example/src/documentation/params/CommandExample.ts) { #unique-key }
