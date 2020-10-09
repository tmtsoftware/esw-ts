import type * as D from 'io-ts/lib/Decoder'
import type { LevelD } from './../../../decoders/LoggerDecoders'

export type Level = D.TypeOf<typeof LevelD>
