import * as t from 'io-ts'

export const Subsystem = t.union([t.literal('ESW'), t.literal('CSW')])
export type Subsystem = t.TypeOf<typeof Subsystem>
