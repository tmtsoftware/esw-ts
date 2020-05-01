import * as TestData from 'jsons/keys.json'
import {
  AltAzCoord,
  CometCoord,
  EqCoord,
  MinorPlanetCoord,
  SolarSystemCoord
} from 'models/params/Coord'
import * as Keys from 'models/params/Key'

test('utc time key', () => {
  const timeParam = Keys.utcTimeKey('utcTimeKey').set(['2017-09-04T16:28:00.123456789Z'])

  expect(timeParam.toJSON().UTCTimeKey).toEqual(TestData.UTCTimeKey)
})

test('tai time key', () => {
  const timeParam = Keys.taiTimeKey('taiTime').set(['2017-09-04T16:28:00.123456789Z'])

  expect(timeParam.toJSON().TAITimeKey).toEqual(TestData.TAITimeKey)
})

test('string and char key', () => {
  const stringParam = Keys.stringKey('days').set(['monday', 'tuesday'])
  const charParam = Keys.charKey('days').set(['monday', 'tuesday'])

  expect(stringParam.toJSON().StringKey).toEqual(TestData.StringKey)
  expect(charParam.toJSON().CharKey).toEqual(TestData.StringKey)
})

test('int key', () => {
  const intParam = Keys.intKey('numbers').set([1, 2, 3])

  expect(intParam.toJSON().IntKey).toEqual(TestData.GeneralKey)
})

test('struct key', () => {
  const intParam = Keys.intKey('numbers').set([1, 2, 3])
  const stringParam = Keys.stringKey('days').set(['monday', 'tuesday'])
  const structParam = Keys.structKey('structKey').set([{ paramSet: [intParam, stringParam] }])

  expect(JSON.parse(JSON.stringify(structParam)).StructKey).toEqual(TestData.StructKey)
})

test('choice key', () => {
  const resetKey = Keys.choiceKey('mode-reset', 'NoUnits')
  const choices = resetKey.makeChoices('c', 'x', 'v', 'y')
  const choiceParam = resetKey.setChoice(choices, ['c'])

  expect(choiceParam.toJSON().ChoiceKey).toEqual(TestData.ChoiceKey)
})

test('int matrix key', () => {
  const intMatrixKey1 = Keys.intMatrixKey('test matrix')
  const data = [
    [1, 2, 3],
    [4, 5, 6]
  ]

  const matrixParam = intMatrixKey1.set([data])

  const { IntMatrixKey } = matrixParam.toJSON()
  expect(JSON.parse(JSON.stringify(IntMatrixKey))).toEqual(TestData.GeneralMatrixKey)
})

test('byte matrix key', () => {
  const byteMatrixKey1 = Keys.byteMatrixKey('test matrix')
  const data = [
    [1, 2, 3],
    [4, 5, 6]
  ]

  const matrixParam = byteMatrixKey1.set([data])

  const { ByteMatrixKey } = matrixParam.toJSON()
  expect(JSON.parse(JSON.stringify(ByteMatrixKey))).toEqual(TestData.GeneralMatrixKey)
})

test('long matrix key', () => {
  const longMatrixKey1 = Keys.longMatrixKey('test matrix')
  const data = [
    [1, 2, 3],
    [4, 5, 6]
  ]

  const matrixParam = longMatrixKey1.set([data])

  const { LongMatrixKey } = matrixParam.toJSON()
  expect(JSON.parse(JSON.stringify(LongMatrixKey))).toEqual(TestData.GeneralMatrixKey)
})

test('short matrix key', () => {
  const shortMatrixKey1 = Keys.shortMatrixKey('test matrix')
  const data = [
    [1, 2, 3],
    [4, 5, 6]
  ]

  const matrixParam = shortMatrixKey1.set([data])

  const { ShortMatrixKey } = matrixParam.toJSON()
  expect(JSON.parse(JSON.stringify(ShortMatrixKey))).toEqual(TestData.GeneralMatrixKey)
})

test('float matrix key', () => {
  const floatMatrixKey1 = Keys.floatMatrixKey('test matrix')
  const data = [
    [1.0, 2.2, 3.3],
    [4.444, 5.34, 6.77]
  ]

  const matrixParam = floatMatrixKey1.set([data])

  const { FloatMatrixKey } = matrixParam.toJSON()
  expect(JSON.parse(JSON.stringify(FloatMatrixKey))).toEqual(TestData.FractionMatrixKey)
})

test('double matrix key', () => {
  const doubleMatrixKey1 = Keys.doubleMatrixKey('test matrix')
  const data = [
    [1.0, 2.2, 3.3],
    [4.444, 5.34, 6.77]
  ]

  const matrixParam = doubleMatrixKey1.set([data])

  const { DoubleMatrixKey } = matrixParam.toJSON()
  expect(JSON.parse(JSON.stringify(DoubleMatrixKey))).toEqual(TestData.FractionMatrixKey)
})

test('int array key', () => {
  const intArrayParam = Keys.intArrayKey('arrayOfNumbers').set([[1, 2], [3]])

  expect(intArrayParam.toJSON().IntArrayKey).toEqual(TestData.ArrayKey)
})

test('byte array key', () => {
  const byteArrayParam = Keys.byteArrayKey('arrayOfNumbers').set([[1, 2], [3]])

  expect(byteArrayParam.toJSON().ByteArrayKey).toEqual(TestData.ArrayKey)
})

test('short array key', () => {
  const shortArrayParam = Keys.shortArrayKey('arrayOfNumbers').set([[1, 2], [3]])

  expect(shortArrayParam.toJSON().ShortArrayKey).toEqual(TestData.ArrayKey)
})

test('long array key', () => {
  const longArrayParam = Keys.longArrayKey('arrayOfNumbers').set([[1, 2], [3]])

  expect(longArrayParam.toJSON().LongArrayKey).toEqual(TestData.ArrayKey)
})

test('float array key', () => {
  const floatArrayParam = Keys.floatArrayKey('arrayOfNumbers').set([[1.2, 2.4243], [3.3]])

  expect(floatArrayParam.toJSON().FloatArrayKey).toEqual(TestData.GeneralArrayKey)
})

test('double array key', () => {
  const doubleArrayParam = Keys.doubleArrayKey('arrayOfNumbers').set([[1.2, 2.4243], [3.3]])

  expect(doubleArrayParam.toJSON().DoubleArrayKey).toEqual(TestData.GeneralArrayKey)
})

test('byte key', () => {
  const byteParam = Keys.byteKey('numbers').set([1, 2, 3])

  expect(byteParam.toJSON().ByteKey).toEqual(TestData.GeneralKey)
})

test('short key', () => {
  const shortParam = Keys.shortKey('numbers').set([1, 2, 3])

  expect(shortParam.toJSON().ShortKey).toEqual(TestData.GeneralKey)
})

test('long key', () => {
  const longParam = Keys.longKey('numbers').set([1, 2, 3])

  expect(longParam.toJSON().LongKey).toEqual(TestData.GeneralKey)
})

test('float key', () => {
  const floatParam = Keys.floatKey('numbers').set([1, 2, 3])

  expect(floatParam.toJSON().FloatKey).toEqual(TestData.GeneralKey)
})

test('double key', () => {
  const doubleParam = Keys.doubleKey('numbers').set([1, 2, 3])

  expect(doubleParam.toJSON().DoubleKey).toEqual(TestData.GeneralKey)
})

test('RaDec key', () => {
  const raDecParam = Keys.raDecKey('RaDecKey').set([{ ra: 7.3, dec: 12.1 }])

  expect(raDecParam.toJSON().RaDecKey).toEqual(TestData.RaDecKey)
})

test('EqCoord key', () => {
  const value: EqCoord = {
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
  const eqCoordParam = Keys.eqCoordKey('EqCoordKey').set([value])

  expect(eqCoordParam.toJSON().EqCoordKey).toEqual(TestData.EqCoordKey)
})

test('SolarSystemCoord key', () => {
  const value: SolarSystemCoord = {
    _type: 'SolarSystemCoord',
    tag: 'BASE',
    body: 'Venus'
  }
  const solarSystemCoordParam = Keys.solarSystemCoordKey('SolarSystemCoordKey').set([value])

  expect(solarSystemCoordParam.toJSON().SolarSystemCoordKey).toEqual(TestData.SolarSystemCoordKey)
})

test('MinorPlanetCoord key', () => {
  const value: MinorPlanetCoord = {
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
  const minorPlanetCoordParam = Keys.minorPlanetCoordKey('MinorPlanetCoordKey').set([value])

  expect(minorPlanetCoordParam.toJSON().MinorPlanetCoordKey).toEqual(TestData.MinorPlanetCoordKey)
})

test('CometCoord key', () => {
  const value: CometCoord = {
    _type: 'CometCoord',
    tag: 'BASE',
    epochOfPerihelion: 2000.0,
    inclination: 324000000000,
    longAscendingNode: 7200000000,
    argOfPerihelion: 360000000000,
    perihelionDistance: 1.4,
    eccentricity: 0.234
  }
  const cometCoordParam = Keys.cometCoordKey('CometCoordKey').set([value])

  expect(cometCoordParam.toJSON().CometCoordKey).toEqual(TestData.CometCoordKey)
})

test('AltAzCoord key', () => {
  const value: AltAzCoord = {
    _type: 'AltAzCoord',
    tag: 'BASE',
    alt: 1083600000000,
    az: 153000000000
  }
  const altAzCoordParam = Keys.altAzCoordKey('AltAzCoordKey').set([value])

  expect(altAzCoordParam.toJSON().AltAzCoordKey).toEqual(TestData.AltAzCoordKey)
})

test('Coord key', () => {
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
  const coordParam = Keys.coordKey('CoordKey').set([eqCoord, solarSystemCoord])

  expect(coordParam.toJSON().CoordKey).toEqual(TestData.CoordKey)
})

test('Boolean key', () => {
  const booleanParam = Keys.booleanKey('BooleanKey').set([true])

  expect(booleanParam.toJSON().BooleanKey).toEqual(TestData.BooleanKey)
})
