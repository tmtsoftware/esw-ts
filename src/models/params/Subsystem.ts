export const subsystems = [
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
] as const

/**
 * A union type representing TMT Subsystems
 * @category Params
 */
export type Subsystem = typeof subsystems[number]
