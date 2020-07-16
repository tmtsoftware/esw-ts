import * as D from 'io-ts/lib/Decoder'

export const Done = D.literal('Done')
export type Done = D.TypeOf<typeof Done>
