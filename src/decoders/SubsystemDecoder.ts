import type { Subsystem } from '..'
import { ciLiteral, Decoder } from './Decoder'

export const SubsystemD: Decoder<Subsystem> = ciLiteral(
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
