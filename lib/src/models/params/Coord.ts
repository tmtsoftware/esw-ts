import * as t from 'io-ts'

export const Tag = t.keyof({
  BASE: null,
  OIWFS1: null,
  OIWFS2: null,
  OIWFS3: null,
  OIWFS4: null,
  ODGW1: null,
  ODGW2: null,
  ODGW3: null,
  ODGW4: null,
  GUIDER1: null,
  GUIDER2: null
})

export const SolarSystemObject = t.keyof({
  Mercury: null,
  Venus: null,
  Moon: null,
  Mars: null,
  Jupiter: null,
  Saturn: null,
  Neptune: null,
  Uranus: null,
  Pluto: null
})

export const EqFrame = t.keyof({ ICRS: null, FK5: null })

export const RaDec = t.type({
  ra: t.number,
  dec: t.number
})

export const ProperMotion = t.type({
  pmx: t.number,
  pmy: t.number
})

export const EqCoord = t.type({
  _type: t.literal('EqCoord'),
  tag: Tag,
  ra: t.number,
  dec: t.number,
  frame: EqFrame,
  catalogName: t.string,
  pm: ProperMotion
})

export const MinorPlanetCoord = t.type({
  _type: t.literal('MinorPlanetCoord'),
  tag: Tag,
  epoch: t.number,
  inclination: t.number,
  longAscendingNode: t.number,
  argOfPerihelion: t.number,
  meanDistance: t.number,
  eccentricity: t.number,
  meanAnomaly: t.number
})

export const SolarSystemCoord = t.type({
  _type: t.literal('SolarSystemCoord'),
  tag: Tag,
  body: SolarSystemObject
})

export const CometCoord = t.type({
  _type: t.literal('CometCoord'),
  tag: Tag,
  epochOfPerihelion: t.number,
  inclination: t.number,
  longAscendingNode: t.number,
  argOfPerihelion: t.number,
  perihelionDistance: t.number,
  eccentricity: t.number
})

export const AltAzCoord = t.type({
  _type: t.literal('AltAzCoord'),
  tag: Tag,
  alt: t.number,
  az: t.number
})

export const Coord = t.union([EqCoord, MinorPlanetCoord, SolarSystemCoord, CometCoord, AltAzCoord])

export type Tag = t.TypeOf<typeof Tag>
export type SolarSystemObject = t.TypeOf<typeof SolarSystemObject>
export type EqFrame = t.TypeOf<typeof EqFrame>
export type RaDec = t.TypeOf<typeof RaDec>
export type ProperMotion = t.TypeOf<typeof ProperMotion>
export type EqCoord = t.TypeOf<typeof EqCoord>
export type MinorPlanetCoord = t.TypeOf<typeof MinorPlanetCoord>
export type SolarSystemCoord = t.TypeOf<typeof SolarSystemCoord>
export type CometCoord = t.TypeOf<typeof CometCoord>
export type AltAzCoord = t.TypeOf<typeof AltAzCoord>
export type Coord = t.TypeOf<typeof Coord>
