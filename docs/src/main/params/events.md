#Events
Events are the most basic type of asynchronous notification in TMT when an activity occurs somewhere in the TMT system and other components need to be notified. Each type of event has a unique purpose and unique information, but they all share the same structural features. All events have `EventInfo` and a `ParameterSet`.

Type definition for Event can be found @extref[here](ts-docs:modules/models.html#event)

## EventTime
Each event includes its time of creation in UTC format. You can access that `eventTime` as follows:

Typescript
:   @@snip[event](../../../../example/src/documentation/params/EventExample.ts) { #event }

## System Event
`SystemEvent` is the type used to describe the majority of events in the system. An example is a demand that is the output of an algorithm in one component that is used as an input to another. SystemEvent is also used to publish internal state or status values of a component that may be of interest to other components in the system.

#### Example snippets for creation of System Event :

Typescript
:   @@snip[System Event](../../../../example/src/documentation/params/EventExample.ts) { #system-event }

## Observe Event
`ObserveEvent` are standardized events used to describe the activities within the data acquisition process. These events are typically published by Science Detector Assemblies, which emit ObserveEvents during their exposures to signal the occurrence of specific activities/actions during the acquisition of data.


#### Example snippets for creation of Observe Event:

Typescript
:   @@snip[Observe Event](../../../../example/src/documentation/params/EventExample.ts) { #observe-event }


#Unique Key Constraint

By choice, a `ParameterSet` in either `ObserveEvent` or `SystemEvent` event will be optimized to store only unique keys. When using `add` or `madd` methods on events to add new parameters, if the parameter being added has a key which is already present in the paramSet, the already stored parameter will be replaced by the given parameter.

@@@ note
If the Set is created by component developers and given directly while creating an event, then it will be the responsibility of component developers to maintain uniqueness with parameters based on key.
@@@

####Here are some examples that illustrate this point:

Typescript
 :   @@snip[unique-key](../../../../example/src/documentation/params/EventExample.ts) { #unique-key }
