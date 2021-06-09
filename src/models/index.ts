/**
 * == Params ==
 *
 * This module is intended to hold reusable models and params used throughout the ESW-TS source code.
 *
 * This also provides out of the box support to cater to the diverse communication requirements.
 * Consumer of this library will be able to create Commands, Events, States to store ParameterSets.
 *
 * == Imp Packages ==
 *
 * === Commands and Events ===
 *
 * This packages contains classes, types and models used to create *commands* and *events*.
 * These are all based on type-safe keys and items (a set of values with optional units).
 * Each key has a specific type and the key's values must be of that type.
 *
 * Two types of Command are supported:
 *   - SequenceCommand
 *     - This commands are targeted to Sequencer. Subtypes of this are: Setup, Observe and Wait.
 *
 *   - ControlCommand
 *     - This commands are targeted to Assemblies and HCD's. Subtypes of this are: Setup and Observe.
 *
 * Following are the concrete commands supported by csw:
 *  - Setup
 *  - Observe
 *  - Wait
 *
 * Two types of Event are supported:
 *  - SystemEvent
 *  - ObserveEvent
 *
 * === ParamSet APIs ===
 *
 * All the param and event classes are immutable. The `set` methods return a new instance of the object with a
 * new item added and the `get` methods return an Option, in case the Key is not found. There are also `value` methods
 * that return a value directly, throwing an exception if the key or value is not found.
 *
 * === Key Types ===
 *
 * A set of standard key types and matching items are defined. Each key accepts one or more values
 * of the given type.
 *
 * Following [[csw.params.core.generics.KeyType]] are supported by csw:
 *
 * {{{
 *
 *       +--------------+-----------------+---------------------+
 *       |  Primitive   |   KeyType       | Helper functions    |
 *       +--------------+-----------------+---------------------+
 *       | Boolean      | BooleanKey      | booleanKey          |
 *       | Character    | CharKey         | charKey             |
 *       | Byte         | ByteKey         | byteKey             |
 *       | Short        | ShortKey        | shortKey            |
 *       | Long         | LongKey         | longKey             |
 *       | Int          | IntKey          | intKey              |
 *       | Float        | FloatKey        | floatKey            |
 *       | Double       | DoubleKey       | doubleKey           |
 *       | String       | StringKey       | stringKey           |
 *       | UtcTime      | UTCTimeKey      | uTCTimeKey          |
 *       | TaiTime      | TAITimeKey      | tAITimeKey          |
 *       | ----------   | ----------      | ------------------- |
 *       | ByteArray    | ByteArrayKey    | byteArrayKey        |
 *       | ShortArray   | ShortArrayKey   | shortArrayKey       |
 *       | LongArray    | LongArrayKey    | longArrayKey        |
 *       | IntArray     | IntArrayKey     | intArrayKey         |
 *       | FloatArray   | FloatArrayKey   | floatArrayKey       |
 *       | DoubleArray  | DoubleArrayKey  | doubleArrayKey      |
 *       | ----------   | ----------      | ------------------- |
 *       | ByteMatrix   | ByteMatrixKey   | byteMatrixKey       |
 *       | ShortMatrix  | ShortMatrixKey  | shortMatrixKey      |
 *       | LongMatrix   | LongMatrixKey   | longMatrixKey       |
 *       | IntMatrix    | IntMatrixKey    | intMatrixKey        |
 *       | FloatMatrix  | FloatMatrixKey  | floatMatrixKey      |
 *       | DoubleMatrix | DoubleMatrixKey | doubleMatrixKey     |
 *       | ----------   | ----------      | ------------------- |
 *       | Choice       | ChoiceKey       | choiceKey           |
 *       | RaDec        | RaDecKey        | raDecKey            |
 *       | Struct       | StructKey       | structKey           |
 *       +--------------+-----------------+---------------------+
 *
 * }}}
 *
 * Detailed information about creating Keys and Parameters can be found here:
 *  https://tmtsoftware.github.io/esw-ts/params/keys-and-parameters.html
 *
 * Detailed information about creating commands can be found here:
 *  https://tmtsoftware.github.io/esw-ts/params/commands.html
 *
 * Detailed information about creating events can be found here:
 *  https://tmtsoftware.github.io/esw-ts/params/events.html
 */

export * from './ComponentId'
export * from './ComponentType'
export * from './params/BaseKey'
export * from './params/ChoiceKeyFactory'
export * from './params/Command'
export * from './params/CommandResponse'
export * from './params/Coord'
export * from './params/CurrentState'
export * from './types'
// helpers functions
export * from './params/Key'
export * from './params/BaseKeyType'
export * from './params/Parameter'
export * from './params/Prefix'
export * from './params/Result'
export * from './params/Struct'
export * from './params/Subsystem'
export * from './params/Units'
export * from './ServiceError'
export * from './Download'
export * from './LifecycleState'
