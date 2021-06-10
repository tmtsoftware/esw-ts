import type { BaseKey } from './BaseKey'
import type { ChoiceKeyFactory } from './ChoiceKeyFactory'
import type { Key } from './Key'

// Inheritance (BaseKey extends KeyType and ChoiceKeyFactory extends KeyType) caused type inference issues
// for ex. SystemEvent.get(IntKey) returned Parameter<Key> instead of concrete IntKey type parameter
// Hence using union types
export type BaseKeyType<K extends Key> = BaseKey<K> | ChoiceKeyFactory<K, any>
