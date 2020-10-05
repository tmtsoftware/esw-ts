# Keys and Parameters

The library offers a flexible and typesafe means to create Parameters to store values like primitive types, collection types or domain specific types.

A Parameter is a Key and Value where the Value must be from a set of defined primitive types including binary data. The Value of a Parameter is always considered to be an Array of the type (i.e. if a single value is stored it is at array location 0). A Parameter is immutable; a modification to an existing Parameter will return a new instance.

A Value can also have Units, which must be of the defined types. See Units for more information. At this time Units are informational only–no calculation or conversion support is provided. Some systems may provide a key value with different units, and receiver can inspect the Units to make a decision on how to handle the value.

A ParameterSet is a Set of Parameter. Various other message types include a ParameterSet (e.g. Setup, Event). A key is unique in a ParameterSet since it is a Set.

### How to create a Parameter using the helper functions

- Choose an appropriate KeyType from the tables below.
- Calling the `set` method on KeyType helper and supplying a String keyName will return a suitably typed parameter instance.
- Exploit the overloaded methods (e.g ), which will allow you to store values of the chosen KeyType. e.g. `BooleanKey` will allow storing only `boolean` values.

#### Example snippets for creating parameter of simple, array and matrices type.

Typescript
:   @@snip[paramater key](../../../../example/src/documentation/params/ParameterExample.ts) { #param-from-key }


### Primitive Datatypes

| Primitive | Typescript Key Type | Helper functions | 
| --------- | ------------------- | ---------------- |
| Int       | IntKey              | intKey           |  
| Long      | LongKey             | longKey          |  
| Short     | ShortKey            | shortKey         |  
| Float     | FloatKey            | floatKey          |  
| Double    | DoubleKey           | doubleKey        |  
| Byte      | ByteKey             | byteKey          |  
| String    | StringKey           | stringKey        |  
| Char      | CharKey             | charKey          |  
| Boolean   | BooleanKey          | booleanKey       |  
| UTCTime   | UTCTimeKey          | utcTimeKey       |  
| TAITime   | TAITimeKey          | taiTimeKey       |  

### Array Datatypes

| Primitive      | Typescript Key Type      | Helper functions      | 
| -------------- | ------------------------ | --------------------- |
| IntArray       | IntArrayKey              | intArrayKey           |  
| LongArray      | LongArrayKey             | longArrayKey          |  
| ShortArray     | ShortArrayKey            | shortArrayKey         |  
| FloatArray     | FloatArrayKey            | floatArrayKey          |  
| DoubleArray    | DoubleArrayKey           | doubleArrayKey        |  
| ByteArray      | ByteArrayKey             | byteArrayKey          |  

### Matrix Datatypes

| Primitive      | Typescript Key Type      | Helper functions      | 
| -------------- | ------------------------ | --------------------- |
| IntMatrix      | IntMatrixKey             | intMatrixKey          |  
| LongMatrix     | LongMatrixKey            | longMatrixKey         |  
| ShortMatrix    | ShortMatrixKey           | shortMatrixKey        |  
| FloatMatrix    | FloatMatrixKey           | floatMatrixKey         |  
| DoubleMatrix   | DoubleMatrixKey          | doubleMatrixKey       |  
| ByteMatrix     | ByteMatrixKey            | byteMatrixKey         |  

### Domain Specific Types

- choice : A key for a choice item similar to an enumeration
- struct : Structs can be used to create a hierarchy of parameters

| Primitive    | Typescript Key Type  | Helper functions    | 
| ------------ | -------------------- | ------------------- |
| Choice       | ChoiceKey            | choiceKey           |  
| Struct       | StructKey            | Struct              |  

#### Example snippets for creating choice and struct parameters

Typescript
:   @@snip[domain specific keys](../../../../example/src/documentation/params/ParameterExample.ts) { #domain-key }


### Coordinate Types

| Primitive          | Typescript Key Type  | Helper functions    |
| ------------------ | -------------------- | ------------------- |
| RaDec              |  RaDecKey            | raDecKey            |
| EqCoord            |  EqCoordKey          | eqCoordKey          |
| SolarSystemCoord   |  SolarSystemCoordKey | solarSystemCoordKey |
| MinorPlanetCoord   |  MinorPlanetCoordKey | minorPlanetCoordKey |
| CometCoord         |  CometCoordKey       | cometCoordKey       |
| AltAzCoord         |  AltAzCoordKey       | altAzCoordKey       |
| Coord (*)          |  CoordKey            | coordKey            |

#### Example snippet for creating coordinate parameters

Typescript
:   @@snip[domain specific keys](../../../../example/src/documentation/params/ParameterExample.ts) { #coordinate-key }

@@@
Note that since Coord is the base trait of the other coordinate types, you can use it as the key for any of the coordinate types.
@@@