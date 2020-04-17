import { Units } from './Units'
import { BaseKey, ChoiceKeyFactory } from './BaseKey'
import { Parameter } from './Parameter'

export type Primitive = string | number | boolean
export interface Struct {
  paramSet: Parameter<Key>[]
}
export type KeyType<T extends Key> = T['KeyType']
export type KeyTag<T extends Key> = T['KeyTag']
export type Key = IntKey | StringKey | IntArrayKey | StructKey | ChoiceKey<any> | TimeKey
export type TimeTag ='UTCTimeKey' | 'TAITimeKey'
// Keys
export type IntKey = { KeyTag: 'IntKey'; KeyType: number }
export type StringKey = { KeyTag: 'StringKey'; KeyType: string }
export type IntArrayKey = { KeyTag: 'IntArrayKey'; KeyType: number[] }
export type StructKey = { KeyTag: 'StructKey'; KeyType: Struct }
export type ChoiceKey<T> = { KeyTag: 'ChoiceKey'; KeyType: T }
export type TimeKey = {KeyTag: TimeTag; KeyType: string} // TBD

// Key Api
export const intKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<IntKey>(name, 'IntKey', units)
export const stringKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<StringKey>(name, 'StringKey', units)
export const intArrayKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<IntArrayKey>(name, 'IntArrayKey', units)
export const structKey = (name: string, units: Units = 'NoUnits') =>
  new BaseKey<StructKey>(name, 'StructKey', units)
export const utcTimeKey = (name: string, units: Units = 'second') =>
  new BaseKey<TimeKey>(name, 'UTCTimeKey', units)
export const taiTimeKey = (name: string, units: Units = 'second') =>
  new BaseKey<TimeKey>(name, 'TAITimeKey', units)
export const choiceKey = (name: string, units: Units = 'NoUnits') =>
  new ChoiceKeyFactory<ChoiceKey<string>>(name, 'ChoiceKey', units)

