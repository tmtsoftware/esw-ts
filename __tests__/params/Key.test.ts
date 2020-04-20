import * as Keys from '../jsons/keys.json'
import {
  altAzCoordKey,
  booleanKey,
  byteArrayKey,
  byteKey,
  byteMatrixKey,
  charKey,
  choiceKey,
  cometCoordKey,
  coordKey,
  doubleArrayKey,
  doubleKey,
  doubleMatrixKey,
  eqCoordKey,
  floatArrayKey,
  floatKey,
  floatMatrixKey,
  intArrayKey,
  intKey,
  intMatrixKey,
  longArrayKey,
  longKey,
  longMatrixKey,
  minorPlanetCoordKey,
  raDecKey,
  shortArrayKey,
  shortKey,
  shortMatrixKey,
  solarSystemCoordKey,
  stringKey,
  structKey,
  taiTimeKey,
  utcTimeKey,
} from '../../src/params/Key'
import { MatrixData } from '../../src/params/MatrixData'
import {
  AltAzCoord,
  CometCoord,
  EqCoord,
  MinorPlanetCoord,
  SolarSystemCoord,
} from '../../src/params/Coord'

test('utc time key', () => {
  const timeParam = utcTimeKey('utcTimeKey').set(['2017-09-04T16:28:00.123456789Z'])

  expect(Keys.UTCTimeKey).toEqual(timeParam.toJSON().UTCTimeKey)
})

test('tai time key', () => {
  const timeParam = taiTimeKey('taiTime').set(['2017-09-04T16:28:00.123456789Z'])

  expect(Keys.TAITimeKey).toEqual(timeParam.toJSON().TAITimeKey)
})

test('string and char key', () => {
  const stringParam = stringKey('days').set(['monday', 'tuesday'])
  const charParam = charKey('days').set(['monday', 'tuesday'])

  expect(Keys.StringKey).toEqual(stringParam.toJSON().StringKey)
  expect(Keys.StringKey).toEqual(charParam.toJSON().CharKey)
})

test('int key', () => {
  const intParam = intKey('numbers').set([1, 2, 3])

  expect(Keys.GeneralKey).toEqual(intParam.toJSON().IntKey)
})

test('struct key', () => {
  const intParam = intKey('numbers').set([1, 2, 3])
  const stringParam = stringKey('days').set(['monday', 'tuesday'])
  const structParam = structKey('structKey').set([{ paramSet: [intParam, stringParam] }])

  expect(Keys.StructKey).toEqual(JSON.parse(JSON.stringify(structParam)).StructKey)
})

test('choice key', () => {
  const resetKey = choiceKey('mode-reset', 'NoUnits')
  const choices = resetKey.makeChoices('c', 'x')
  const choiceParam = resetKey.setChoice(choices, ['c'])

  expect(Keys.ChoiceKey).toEqual(choiceParam.toJSON().ChoiceKey)
})

test('int matrix key', () => {
  const intMatrixKey1 = intMatrixKey('test matrix')
  const data = MatrixData.fromArrays<number>([1, 2, 3], [4, 5, 6])

  const matrixParam = intMatrixKey1.set([data])

  const { IntMatrixKey } = matrixParam.toJSON()
  expect(Keys.GeneralMatrixKey).toEqual(JSON.parse(JSON.stringify(IntMatrixKey)))
})

test('byte matrix key', () => {
  const byteMatrixKey1 = byteMatrixKey('test matrix')
  const data = MatrixData.fromArrays<number>([1, 2, 3], [4, 5, 6])

  const matrixParam = byteMatrixKey1.set([data])

  const { ByteMatrixKey } = matrixParam.toJSON()
  expect(Keys.GeneralMatrixKey).toEqual(JSON.parse(JSON.stringify(ByteMatrixKey)))
})

test('long matrix key', () => {
  const longMatrixKey1 = longMatrixKey('test matrix')
  const data = MatrixData.fromArrays<number>([1, 2, 3], [4, 5, 6])

  const matrixParam = longMatrixKey1.set([data])

  const { LongMatrixKey } = matrixParam.toJSON()
  expect(Keys.GeneralMatrixKey).toEqual(JSON.parse(JSON.stringify(LongMatrixKey)))
})

test('short matrix key', () => {
  const shortMatrixKey1 = shortMatrixKey('test matrix')
  const data = MatrixData.fromArrays<number>([1, 2, 3], [4, 5, 6])

  const matrixParam = shortMatrixKey1.set([data])

  const { ShortMatrixKey } = matrixParam.toJSON()
  expect(Keys.GeneralMatrixKey).toEqual(JSON.parse(JSON.stringify(ShortMatrixKey)))
})

test('float matrix key', () => {
  const floatMatrixKey1 = floatMatrixKey('test matrix')
  const data = MatrixData.fromArrays<number>([1.0, 2.2, 3.3], [4.444, 5.34, 6.77])

  const matrixParam = floatMatrixKey1.set([data])

  const { FloatMatrixKey } = matrixParam.toJSON()
  expect(Keys.FractionMatrixKey).toEqual(JSON.parse(JSON.stringify(FloatMatrixKey)))
})

test('double matrix key', () => {
  const doubleMatrixKey1 = doubleMatrixKey('test matrix')
  const data = MatrixData.fromArrays<number>([1.0, 2.2, 3.3], [4.444, 5.34, 6.77])

  const matrixParam = doubleMatrixKey1.set([data])

  const { DoubleMatrixKey } = matrixParam.toJSON()
  expect(Keys.FractionMatrixKey).toEqual(JSON.parse(JSON.stringify(DoubleMatrixKey)))
})

test('int array key', () => {
  const intArrayParam = intArrayKey('arrayOfNumbers').set([[1, 2], [3]])

  expect(Keys.ArrayKey).toEqual(intArrayParam.toJSON().IntArrayKey)
})

test('byte array key', () => {
  const byteArrayParam = byteArrayKey('arrayOfNumbers').set([[1, 2], [3]])

  expect(Keys.ArrayKey).toEqual(byteArrayParam.toJSON().ByteArrayKey)
})

test('short array key', () => {
  const shortArrayParam = shortArrayKey('arrayOfNumbers').set([[1, 2], [3]])

  expect(Keys.ArrayKey).toEqual(shortArrayParam.toJSON().ShortArrayKey)
})

test('long array key', () => {
  const longArrayParam = longArrayKey('arrayOfNumbers').set([[1, 2], [3]])

  expect(Keys.ArrayKey).toEqual(longArrayParam.toJSON().LongArrayKey)
})

test('float array key', () => {
  const floatArrayParam = floatArrayKey('arrayOfNumbers').set([[1.2, 2.4243], [3.3]])

  expect(Keys.GeneralArrayKey).toEqual(floatArrayParam.toJSON().FloatArrayKey)
})

test('double array key', () => {
  const doubleArrayParam = doubleArrayKey('arrayOfNumbers').set([[1.2, 2.4243], [3.3]])

  expect(Keys.GeneralArrayKey).toEqual(doubleArrayParam.toJSON().DoubleArrayKey)
})

test('byte key', () => {
  const byteParam = byteKey('numbers').set([1, 2, 3])

  expect(Keys.GeneralKey).toEqual(byteParam.toJSON().ByteKey)
})

test('short key', () => {
  const shortParam = shortKey('numbers').set([1, 2, 3])

  expect(Keys.GeneralKey).toEqual(shortParam.toJSON().ShortKey)
})

test('long key', () => {
  const longParam = longKey('numbers').set([1, 2, 3])

  expect(Keys.GeneralKey).toEqual(longParam.toJSON().LongKey)
})

test('float key', () => {
  const floatParam = floatKey('numbers').set([1, 2, 3])

  expect(Keys.GeneralKey).toEqual(floatParam.toJSON().FloatKey)
})

test('double key', () => {
  const doubleParam = doubleKey('numbers').set([1, 2, 3])

  expect(Keys.GeneralKey).toEqual(doubleParam.toJSON().DoubleKey)
})

test('RaDec key', () => {
  const raDecParam = raDecKey('RaDecKey').set([{ ra: 7.3, dec: 12.1 }])

  expect(Keys.RaDecKey).toEqual(raDecParam.toJSON().RaDecKey)
})

test('EqCoord key', () => {
  const value: EqCoord = {
    tag: 'BASE',
    ra: 659912250000,
    dec: -109892300000,
    frame: 'ICRS',
    catalogName: 'none',
    pm: {
      pmx: 0.5,
      pmy: 2.33,
    },
  }
  const eqCoordParam = eqCoordKey('EqCoordKey').set([value])

  expect(Keys.EqCoordKey).toEqual(eqCoordParam.toJSON().EqCoordKey)
})

test('SolarSystemCoord key', () => {
  const value: SolarSystemCoord = {
    tag: 'BASE',
    body: 'Venus',
  }
  const solarSystemCoordParam = solarSystemCoordKey('SolarSystemCoordKey').set([value])

  expect(Keys.SolarSystemCoordKey).toEqual(solarSystemCoordParam.toJSON().SolarSystemCoordKey)
})

test('MinorPlanetCoord key', () => {
  const value: MinorPlanetCoord = {
    tag: 'GUIDER1',
    epoch: 2000.0,
    inclination: 324000000000,
    longAscendingNode: 7200000000,
    argOfPerihelion: 360000000000,
    meanDistance: 1.4,
    eccentricity: 0.234,
    meanAnomaly: 792000000000,
  }
  const minorPlanetCoordParam = minorPlanetCoordKey('MinorPlanetCoordKey').set([value])

  expect(Keys.MinorPlanetCoordKey).toEqual(minorPlanetCoordParam.toJSON().MinorPlanetCoordKey)
})

test('CometCoord key', () => {
  const value: CometCoord = {
    tag: 'BASE',
    epochOfPerihelion: 2000.0,
    inclination: 324000000000,
    longAscendingNode: 7200000000,
    argOfPerihelion: 360000000000,
    perihelionDistance: 1.4,
    eccentricity: 0.234,
  }
  const cometCoordParam = cometCoordKey('CometCoordKey').set([value])

  expect(Keys.CometCoordKey).toEqual(cometCoordParam.toJSON().CometCoordKey)
})

test('AltAzCoord key', () => {
  const value: AltAzCoord = {
    tag: 'BASE',
    alt: 1083600000000,
    az: 153000000000,
  }
  const altAzCoordParam = altAzCoordKey('AltAzCoordKey').set([value])

  expect(Keys.AltAzCoordKey).toEqual(altAzCoordParam.toJSON().AltAzCoordKey)
})

test('Coord key', () => {
  const eqCoord: EqCoord = {
    tag: 'BASE',
    ra: 659912250000,
    dec: -109892300000,
    frame: 'ICRS',
    catalogName: 'none',
    pm: {
      pmx: 0.5,
      pmy: 2.33,
    },
  }
  const solarSystemCoord: SolarSystemCoord = {
    tag: 'BASE',
    body: 'Venus',
  }
  const coordParam = coordKey('CoordKey').set([eqCoord, solarSystemCoord])

  expect(Keys.CoordKey).toEqual(coordParam.toJSON().CoordKey)
})

test('Boolean key', () => {
  const booleanParam = booleanKey('BooleanKey').set([true])

  expect(Keys.BooleanKey).toEqual(booleanParam.toJSON().BooleanKey)
})
