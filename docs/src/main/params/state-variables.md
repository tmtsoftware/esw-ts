# State variables

State variables are used when a UI for Assembly wants to track the status of a command sent to an HCD using a matcher.

A state represents some aspect of a Component’s internal state which is captured in `CurrentState`.
All state variables have `Prefix` and `ParameterSet`.

The PubSub feature of the HCD provides `CurrentState` values to the PubSub subscriber.

## CurrentState

A state variable that is published by a component that describes its internal state. Used by Assemblies to determine command completion in Command Service.

Type definition for `CurrentState` can be found @extref[here](ts-docs:classes/models.CurrentState.html)

Typescript
:   @@snip[state variable](../../../../example/src/documentation/params/StateVariableExample.ts) { #state-variable }
