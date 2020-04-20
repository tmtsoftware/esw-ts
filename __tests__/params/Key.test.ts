import * as Keys from '../jsons/keys.json'
import {
  byteMatrixKey,
  choiceKey,
  doubleMatrixKey,
  floatMatrixKey,
  intArrayKey,
  intKey,
  intMatrixKey,
  longMatrixKey,
  shortMatrixKey,
  stringKey,
  structKey,
  taiTimeKey,
  utcTimeKey,
} from '../../src/params/Key'
import { MatrixData } from '../../src/params/MatrixData'

test('utc time key', () => {
  const timeParam = utcTimeKey('utcTimeKey').set(['2017-09-04T16:28:00.123456789Z'])

  expect(Keys.UTCTimeKey).toEqual(timeParam.toJSON().UTCTimeKey)
})

test('tai time key', () => {
  const timeParam = taiTimeKey('taiTime').set(['2017-09-04T16:28:00.123456789Z'])

  expect(Keys.TAITimeKey).toEqual(timeParam.toJSON().TAITimeKey)
})

test('string key', () => {
  const stringParam = stringKey('days').set(['monday', 'tuesday'])

  expect(Keys.StringKey).toEqual(stringParam.toJSON().StringKey)
})

test('int key', () => {
  const intParam = intKey('numbers').set([1, 2, 3])

  expect(Keys.IntKey).toEqual(intParam.toJSON().IntKey)
})

test('int array key', () => {
  const intArrayParam = intArrayKey('arrayOfNumbers').set([[1, 2], [3]])

  expect(Keys.IntArrayKey).toEqual(intArrayParam.toJSON().IntArrayKey)
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
