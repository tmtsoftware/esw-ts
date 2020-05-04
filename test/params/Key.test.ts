import * as TestData from 'jsons/keys.json'
import {
  AltAzCoord,
  CometCoord,
  EqCoord,
  MinorPlanetCoord,
  SolarSystemCoord,
  Key,
  Parameter
} from 'models'
import * as Keys from 'models/params/Key'

const stringify = (param: Parameter<Key>) => JSON.stringify(param.toJSON()[param.keyTag])

// ======== Simple Keys ========
const intParam = Keys.intKey('numbers').set([1, 2, 3])
const longParam = Keys.longKey('numbers').set([1, 2, 3])
const shortParam = Keys.shortKey('numbers').set([1, 2, 3])
const floatParam = Keys.floatKey('numbers').set([1, 2, 3])
const doubleParam = Keys.doubleKey('numbers').set([1, 2, 3])
const byteParam = Keys.byteKey('numbers').set([1, 2, 3])
const booleanParam = Keys.booleanKey('BooleanKey').set([true])
const stringParam = Keys.stringKey('days').set(['monday', 'tuesday'])
const charParam = Keys.charKey('days').set(['monday', 'tuesday'])
const utcTimeParam = Keys.utcTimeKey('utcTimeKey').set(['2017-09-04T16:28:00.123456789Z'])
const taiTimeParam = Keys.taiTimeKey('taiTime').set(['2017-09-04T16:28:00.123456789Z'])

// ======== Array Keys ========
const intArrayParam = Keys.intArrayKey('arrayOfNumbers').set([[1, 2], [3]])
const longArrayParam = Keys.longArrayKey('arrayOfNumbers').set([[1, 2], [3]])
const shortArrayParam = Keys.shortArrayKey('arrayOfNumbers').set([[1, 2], [3]])
const floatArrayParam = Keys.floatArrayKey('arrayOfNumbers').set([[1.2, 2.4243], [3.3]])
const doubleArrayParam = Keys.doubleArrayKey('arrayOfNumbers').set([[1.2, 2.4243], [3.3]])
const byteArrayParam = Keys.byteArrayKey('arrayOfNumbers').set([[1, 2], [3]])

// ======== Matrix Keys ========
const numberMatrixData = [
  [1, 2, 3],
  [4, 5, 6]
]
const intMatrixParam = Keys.intMatrixKey('test matrix').set([numberMatrixData])
const longMatrixParam = Keys.longMatrixKey('test matrix').set([numberMatrixData])
const shortMatrixParam = Keys.shortMatrixKey('test matrix').set([numberMatrixData])
const byteMatrixParam = Keys.byteMatrixKey('test matrix').set([numberMatrixData])

const fractionMatrixData = [
  [1.0, 2.2, 3.3],
  [4.444, 5.34, 6.77]
]
const floatMatrixParam = Keys.floatMatrixKey('test matrix').set([fractionMatrixData])
const doubleMatrixParam = Keys.doubleMatrixKey('test matrix').set([fractionMatrixData])

const structParam = Keys.structKey('structKey').set([{ paramSet: [intParam, stringParam] }])

const resetKey = Keys.choiceKey('mode-reset', 'NoUnits')
const choices = resetKey.makeChoices('c', 'x', 'v', 'y')
const choiceParam = resetKey.setChoice(choices, ['c'])

const raDecParam = Keys.raDecKey('RaDecKey').set([{ ra: 7.3, dec: 12.1 }])

// ======== Coord Keys ========
const eqCoord: EqCoord = {
  _type: 'EqCoord',
  tag: 'BASE',
  ra: 659912250000,
  dec: -109892300000,
  frame: 'ICRS',
  catalogName: 'none',
  pm: {
    pmx: 0.5,
    pmy: 2.33
  }
}

const solarSystemCoord: SolarSystemCoord = {
  _type: 'SolarSystemCoord',
  tag: 'BASE',
  body: 'Venus'
}

const minorPlanetCoord: MinorPlanetCoord = {
  _type: 'MinorPlanetCoord',
  tag: 'GUIDER1',
  epoch: 2000.0,
  inclination: 324000000000,
  longAscendingNode: 7200000000,
  argOfPerihelion: 360000000000,
  meanDistance: 1.4,
  eccentricity: 0.234,
  meanAnomaly: 792000000000
}

const cometCoord: CometCoord = {
  _type: 'CometCoord',
  tag: 'BASE',
  epochOfPerihelion: 2000.0,
  inclination: 324000000000,
  longAscendingNode: 7200000000,
  argOfPerihelion: 360000000000,
  perihelionDistance: 1.4,
  eccentricity: 0.234
}

const altAzCoord: AltAzCoord = {
  _type: 'AltAzCoord',
  tag: 'BASE',
  alt: 1083600000000,
  az: 153000000000
}
const eqParam = Keys.eqCoordKey('EqCoordKey').set([eqCoord])
const solarSystemParam = Keys.solarSystemCoordKey('SolarSystemCoordKey').set([solarSystemCoord])
const minorPlanetParam = Keys.minorPlanetCoordKey('MinorPlanetCoordKey').set([minorPlanetCoord])
const cometParam = Keys.cometCoordKey('CometCoordKey').set([cometCoord])
const altAzParam = Keys.altAzCoordKey('AltAzCoordKey').set([altAzCoord])
const coordParam = Keys.coordKey('CoordKey').set([eqCoord, solarSystemCoord])

describe('Key-Parameter Contract', () => {
  test.each([
    ['IntKey', intParam, TestData.GeneralKey],
    ['LongKey', longParam, TestData.GeneralKey],
    ['ShortKey', shortParam, TestData.GeneralKey],
    ['FloatKey', floatParam, TestData.GeneralKey],
    ['DoubleKey', doubleParam, TestData.GeneralKey],
    ['ByteKey', byteParam, TestData.GeneralKey],
    ['BooleanKey', booleanParam, TestData.BooleanKey],

    ['StringKey', stringParam, TestData.StringKey],
    ['CharKey', charParam, TestData.StringKey],
    ['UTCTimeKey', utcTimeParam, TestData.UTCTimeKey],
    ['TAITimeKey', taiTimeParam, TestData.TAITimeKey],

    ['IntArrayKey', intArrayParam, TestData.ArrayKey],
    ['LongArrayKey', longArrayParam, TestData.ArrayKey],
    ['ShortArrayKey', shortArrayParam, TestData.ArrayKey],
    ['FloatArrayKey', floatArrayParam, TestData.GeneralArrayKey],
    ['DoubleArrayKey', doubleArrayParam, TestData.GeneralArrayKey],
    ['ByteArrayKey', byteArrayParam, TestData.ArrayKey],

    ['IntMatrixKey', intMatrixParam, TestData.GeneralMatrixKey],
    ['LongMatrixKey', longMatrixParam, TestData.GeneralMatrixKey],
    ['ShortMatrixKey', shortMatrixParam, TestData.GeneralMatrixKey],
    ['FloatMatrixKey', floatMatrixParam, TestData.FractionMatrixKey],
    ['DoubleMatrixKey', doubleMatrixParam, TestData.FractionMatrixKey],
    ['ByteMatrixKey', byteMatrixParam, TestData.GeneralMatrixKey],

    ['StructKey', structParam, TestData.StructKey],
    ['ChoiceKey', choiceParam, TestData.ChoiceKey],
    ['RaDecKey', raDecParam, TestData.RaDecKey],

    ['EqCoordKey', eqParam, TestData.EqCoordKey],
    ['SolarSystemCoordKey', solarSystemParam, TestData.SolarSystemCoordKey],
    ['MinorPlaneCoordKey', minorPlanetParam, TestData.MinorPlanetCoordKey],
    ['CometCoordKey', cometParam, TestData.CometCoordKey],
    ['AltAzCoordKey', altAzParam, TestData.AltAzCoordKey],
    ['CoordKey', coordParam, TestData.CoordKey]
  ])('%s', (_, actual, expected) => expect(stringify(actual)).toEqual(JSON.stringify(expected)))
})
