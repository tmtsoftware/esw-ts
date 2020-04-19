import * as Keys from '../jsons/keys.json'
import {
  choiceKey,
  intArrayKey,
  intKey,
  stringKey,
  structKey,
  taiTimeKey,
  utcTimeKey,
} from '../../src/params/Key'

test('utc time key', () => {
  const timeParam = utcTimeKey('utcTimeKey').set([
    '2017-09-04T16:28:00.123456789Z',
  ])

  expect(Keys.UTCTimeKey).toEqual(timeParam.toJSON().UTCTimeKey)
})

test('tai time key', () => {
  const timeParam = taiTimeKey('taiTime').set([
    '2017-09-04T16:28:00.123456789Z',
  ])

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
  const structParam = structKey('structKey').set([
    { paramSet: [intParam, stringParam] },
  ])

  expect(Keys.StructKey).toEqual(
    JSON.parse(JSON.stringify(structParam)).StructKey,
  )
})

test('choice key', () => {
  const resetKey = choiceKey('mode-reset', 'NoUnits')
  const choices = resetKey.makeChoices('c', 'x')
  const choiceParam = resetKey.setChoice(choices, ['c'])

  expect(Keys.ChoiceKey).toEqual(choiceParam.toJSON().ChoiceKey)
})
