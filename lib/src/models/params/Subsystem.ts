import * as t from 'io-ts'

export const Subsystem = t.keyof({
  AOESW: null,
  APS: null,
  CIS: null,
  CLN: null,
  CRYO: null,
  CSW: null,
  DMS: null,
  DPS: null,
  ESEN: null,
  ESW: null,
  FMCS: null,
  GMS: null,
  IRIS: null,
  LGSF: null,
  M1CS: null,
  MODHIS: null,
  NFIRAOS: null,
  NSCU: null,
  OSS: null,
  PFCS: null,
  PSFR: null,
  REFR: null,
  RTC: null,
  RPG: null,
  SCMS: null,
  SOSS: null,
  TCS: null,
  WFOS: null,
  Container: null
})

export type Subsystem = t.TypeOf<typeof Subsystem>
