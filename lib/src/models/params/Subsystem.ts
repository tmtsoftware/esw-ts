import type * as D from 'io-ts/lib/Decoder'
import { ciLiteral } from '../../utils/Decoder'
/**
 * A union type representing TMT Subsystems
 */
export type Subsystem = D.TypeOf<typeof SubsystemD>

export const SubsystemD = ciLiteral(
  'AOESW',
  'APS',
  'CIS',
  'CLN',
  'CRYO',
  'CSW',
  'DMS',
  'DPS',
  'ESEN',
  'ESW',
  'FMCS',
  'GMS',
  'IRIS',
  'LGSF',
  'M1CS',
  'MODHIS',
  'NFIRAOS',
  'NSCU',
  'OSS',
  'PFCS',
  'PSFR',
  'REFR',
  'RTC',
  'RPG',
  'SCMS',
  'SOSS',
  'TCS',
  'WFOS',
  'Container'
)
