import {
  Angle,
  booleanKey,
  BooleanKey,
  ByteMatrixKey,
  byteMatrixKey,
  choiceKey,
  CometCoord,
  cometCoordKey,
  CometCoordKey,
  CoordKey,
  coordKey,
  IntArrayKey,
  intArrayKey,
  IntKey,
  intKey,
  Parameter,
  Tag
} from '@tmtsoftware/esw-ts'
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

//#domain-key

//#coordinate-key

const cometCoord = new CometCoord(
  new Tag('BASE'),
  2000,
  new Angle(324000000000),
  new Angle(7200000000),
  new Angle(360000000000),
  1.4,
  0.234
)
const cometParam: Parameter<CometCoordKey> = cometCoordKey('comet key', 'degree').set([cometCoord])

//coord key is base trait of all coordinate key types.
const coordParam: Parameter<CoordKey> = coordKey('base coordinate').set([cometCoord])
//#coordinate-key
