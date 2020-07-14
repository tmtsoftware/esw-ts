import * as D from 'io-ts/lib/Decoder'

export type Subsystem = D.TypeOf<typeof Subsystem>

export const Subsystem = D.literal(
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
