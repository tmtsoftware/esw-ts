import { ciLiteral, Decoder } from '../../../utils/Decoder'

export const Done: Decoder<Done> = ciLiteral('Done')
export type Done = 'Done'
