# Params
In the distributed environment of TMT observatory, Components communicate with each other by sending asynchronous Messages. These messages have a Command payload, which flows down through the Sequencer components to the Assemblies, HCDs and finally to the hardware. At each hop Commands are validated, interpreted and further propagated making their journey to its destination. Commands provide flexible placeholders to store values to convey precise intent of the sender component.

**Params** module plays a significant role as it caters to the diverse communication requirements. Consumer of this module will be able to create Commands, Events, States to store ParameterSets.

Params has following models :

@@toc { .main depth=2 }

@@@ index
- @ref:[Commands](commands.md)
- @ref:[Events](events.md)
- @ref:[Keys and Parameters](keys-and-parameters.md)
- @ref:[Result](result.md)
- @ref:[Subsystem](subsystem.md)
- @ref:[State Variables](state-variables.md)
- @ref:[Units](units.md)

@@@

Type definition for all common models used by services can be found @extref:[here](ts-docs:modules/models.html)
