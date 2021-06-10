import {
  booleanKey,
  BooleanKey,
  ByteMatrixKey,
  IntArrayKey,
  intArrayKey,
  IntKey,
  intKey,
  byteMatrixKey,
  Parameter,
  choiceKey,
  structKey,
  doubleKey,
  stringKey,
  Struct,
  StringKey,
  cometCoordKey,
  CometCoordKey,
  CoordKey,
  coordKey,
  CometCoord
} from '@tmtsoftware/esw-ts'
import { Tag } from '@tmtsoftware/esw-ts'

//#param-from-key

// primitives
const booleanParam: Parameter<BooleanKey> = booleanKey('flag').set([false])

const intParam: Parameter<IntKey> = intKey('RandomKeyName').set([123, 12432])
// intParam.keyName === 'RandomKeyName'
// intParam.keyTag === 'IntKey'
// intParam.values === [123, 12432]
// intParam.units === 'NoUnits' // default unit is `NoUnits`
// -------------

// arrays
const filterkey = intArrayKey('filter')
const filterParam: Parameter<IntArrayKey> = filterkey.set([
  [1, 2, 3],
  [4, 5, 6]
])
// -------------

// matrices
const positionMatrixKey = byteMatrixKey('positions', 'meter')
const positions: Parameter<ByteMatrixKey> = positionMatrixKey.set([
  [
    [1, 2],
    [3, 4]
  ],
  [
    [5, 6],
    [7, 8]
  ]
])
//#param-from-key
//#domain-key

// choice key

const choices = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

const weekDaysKey = choiceKey('weekDaysKey', choices)
const weekDayParam = weekDaysKey.set('Mon', 'Wed')
// weekDayParam === Parameter('weekDaysKey', 'ChoiceKey', ['Mon', 'Wed'], 'NoUnits')

// -------------

// example for struct key
// leaf parameters
const ra: Parameter<StringKey> = stringKey('ra').set(['12:13:14.1'])
const dec = stringKey('dec').set(['32:33:34.4'])
const epoch = doubleKey('epoch').set([1970.0])

// initialise struct key
const struct = new Struct().add(ra)
struct.madd([dec, epoch])

// create struct Parameter using structKey
const structParameter = structKey('my struct').set([struct])

//#domain-key

//#coordinate-key

const cometCoord = new CometCoord(
  new Tag('BASE'),
  2000,
  324000000000,
  7200000000,
  360000000000,
  1.4,
  0.234
)
const cometParam: Parameter<CometCoordKey> = cometCoordKey(
  'comet key',
  'degree'
).set([cometCoord])

//coord key is base trait of all coordinate key types.
const coordParam: Parameter<CoordKey> = coordKey('base coordinate').set([
  cometCoord
])
//#coordinate-key
