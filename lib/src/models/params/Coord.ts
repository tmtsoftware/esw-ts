import * as D from 'io-ts/lib/Decoder'

export const Tag = D.literal(
  'BASE',
  'OIWFS1',
  'OIWFS2',
  'OIWFS3',
  'OIWFS4',
  'ODGW1',
  'ODGW2',
  'ODGW3',
  'ODGW4',
  'GUIDER1',
  'GUIDER2'
)

export const SolarSystemObject = D.literal(
  'Mercury',
  'Venus',
  'Moon',
  'Mars',
  'Jupiter',
  'Saturn',
  'Neptune',
  'Uranus',
  'Pluto'
)

export const EqFrame = D.literal('ICRS', 'FK5')

export const RaDec = D.type({
  ra: D.number,
  dec: D.number
})

export const ProperMotion = D.type({
  pmx: D.number,
  pmy: D.number
})

export const EqCoord = D.type({
  _type: D.literal('EqCoord'),
  tag: Tag,
  ra: D.number,
  dec: D.number,
  frame: EqFrame,
  catalogName: D.string,
  pm: ProperMotion
})

export const MinorPlanetCoord = D.type({
  _type: D.literal('MinorPlanetCoord'),
  tag: Tag,
  epoch: D.number,
  inclination: D.number,
  longAscendingNode: D.number,
  argOfPerihelion: D.number,
  meanDistance: D.number,
  eccentricity: D.number,
  meanAnomaly: D.number
})

export const SolarSystemCoord = D.type({
  _type: D.literal('SolarSystemCoord'),
  tag: Tag,
  body: SolarSystemObject
})

export const CometCoord = D.type({
  _type: D.literal('CometCoord'),
  tag: Tag,
  epochOfPerihelion: D.number,
  inclination: D.number,
  longAscendingNode: D.number,
  argOfPerihelion: D.number,
  perihelionDistance: D.number,
  eccentricity: D.number
})

export const AltAzCoord = D.type({
  _type: D.literal('AltAzCoord'),
  tag: Tag,
  alt: D.number,
  az: D.number
})

export const Coord = D.sum('_type')({
  EqCoord: EqCoord,
  MinorPlanetCoord: MinorPlanetCoord,
  SolarSystemCoord: SolarSystemCoord,
  CometCoord: CometCoord,
  AltAzCoord: AltAzCoord
})

export type Tag = D.TypeOf<typeof Tag>
export type SolarSystemObject = D.TypeOf<typeof SolarSystemObject>
export type EqFrame = D.TypeOf<typeof EqFrame>
export type RaDec = D.TypeOf<typeof RaDec>
export type ProperMotion = D.TypeOf<typeof ProperMotion>
export type EqCoord = D.TypeOf<typeof EqCoord>
export type MinorPlanetCoord = D.TypeOf<typeof MinorPlanetCoord>
export type SolarSystemCoord = D.TypeOf<typeof SolarSystemCoord>
export type CometCoord = D.TypeOf<typeof CometCoord>
export type AltAzCoord = D.TypeOf<typeof AltAzCoord>
export type Coord = D.TypeOf<typeof Coord>
