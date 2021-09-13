# Keys and Parameters

The library offers a flexible and typesafe means to create Parameters to store values like primitive types, collection types or domain specific types.

A **Parameter** is a Key and Value where the Value must be from a set of defined primitive types including binary data. The Value of a `Parameter` is always considered to be an Array of the type (i.e. if a single value is stored it is at array location 0). A Parameter is **immutable**; a modification to an existing Parameter will return a new instance.

A Value can also have Units, which must be of the defined types. See **Units** for more information. At this time Units are informational only – no calculation or conversion support is provided. Some systems may provide a key value with different units, and receiver can inspect the Units to make a decision on how to handle the value.

A ParameterSet is a Set of Parameter. Various other message types include a **ParameterSet** (e.g. Setup, Event). A key is unique in a ParameterSet since it is a Set.

## How to create a Parameter using the helper functions

- Choose an appropriate **KeyType** from the tables below.
- Calling the `set` method on KeyType helper and supplying a *string* keyName will return a suitably typed parameter instance.

### Example snippets for creating parameter of simple, array and matrix type

Typescript
:   @@snip[paramater key](../../../../example/src/documentation/params/ParameterExample.ts) { #param-from-key }

### Primitive Data types

| Primitive | Typescript Key Type | Helper functions |
| --------- | ------------------- | ---------------- |
| Int       | IntKey              | intKey           |
| Long      | LongKey             | longKey          |
| Short     | ShortKey            | shortKey         |
| Float     | FloatKey            | floatKey         |
| Double    | DoubleKey           | doubleKey        |
| Byte      | ByteKey             | byteKey          |
| String    | StringKey           | stringKey        |
| Char      | CharKey             | charKey          |
| Boolean   | BooleanKey          | booleanKey       |

### TMT Time types

| Primitive | Typescript Key Type | Helper functions |
| --------- | ------------------- | ---------------- |
| UTCTime   | UTCTimeKey          | utcTimeKey       |
| TAITime   | TAITimeKey          | taiTimeKey       |

This data types are based on TMT Time models `UTCTime` & `TAITime`.

Example usage of Time models:

Typescript
:   @@snip[paramater key](../../../../example/src/documentation/params/StateVariableExample.ts) { #tmt-time }

@@@note
  The precision date at javascript is only in  milliseconds. However, at backend server date precision is in microseconds. ("2021-09-07T08:04:07.745274Z"). The following in browser javascript `new Date("2021-09-07T08:04:07.745274Z")` truncates the last 3 digits of milliseconds `2021-09-07T08:04:07.745Z`.
@@@

### Array Data types

| Primitive   | Typescript Key Type | Helper functions |
| ----------- | ------------------- | ---------------- |
| IntArray    | IntArrayKey         | intArrayKey      |
| LongArray   | LongArrayKey        | longArrayKey     |
| ShortArray  | ShortArrayKey       | shortArrayKey    |
| FloatArray  | FloatArrayKey       | floatArrayKey    |
| DoubleArray | DoubleArrayKey      | doubleArrayKey   |
| ByteArray   | ByteArrayKey        | byteArrayKey     |

### Matrix Data types

| Primitive    | Typescript Key Type | Helper functions |
| ------------ | ------------------- | ---------------- |
| IntMatrix    | IntMatrixKey        | intMatrixKey     |
| LongMatrix   | LongMatrixKey       | longMatrixKey    |
| ShortMatrix  | ShortMatrixKey      | shortMatrixKey   |
| FloatMatrix  | FloatMatrixKey      | floatMatrixKey   |
| DoubleMatrix | DoubleMatrixKey     | doubleMatrixKey  |
| ByteMatrix   | ByteMatrixKey       | byteMatrixKey    |

### Domain Specific Types

- choice : A key for a choice item similar to an enumeration

| Primitive | Typescript Key Type | Helper functions |
| --------- | ------------------- | ---------------- |
| Choice    | ChoiceKey           | choiceKey        |

#### Example snippets for creating choice parameters

Typescript
:   @@snip[domain specific keys](../../../../example/src/documentation/params/ParameterExample.ts) { #domain-key }

### Coordinate Types

| Primitive        | Typescript Key Type | Helper functions    |
| ---------------- | ------------------- | ------------------- |
| EqCoord          | EqCoordKey          | eqCoordKey          |
| SolarSystemCoord | SolarSystemCoordKey | solarSystemCoordKey |
| MinorPlanetCoord | MinorPlanetCoordKey | minorPlanetCoordKey |
| CometCoord       | CometCoordKey       | cometCoordKey       |
| AltAzCoord       | AltAzCoordKey       | altAzCoordKey       |
| Coord (*)        | CoordKey            | coordKey            |

#### Example snippet for creating coordinate parameters

Typescript
:   @@snip[domain specific keys](../../../../example/src/documentation/params/ParameterExample.ts) { #coordinate-key }

@@@ note
Note that since `Coord` is the base trait of the other coordinate types, you can use it as the key for any of the coordinate types.
@@@
