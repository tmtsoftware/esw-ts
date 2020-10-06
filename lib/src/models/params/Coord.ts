import * as D from 'io-ts/lib/Decoder'
import { ciLiteral } from '../../utils/Decoder'

// ##################### Decoders #####################
export const TagD = ciLiteral(
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

export const SolarSystemObjectD = ciLiteral(
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

export const EqFrameD = ciLiteral('ICRS', 'FK5')

export const RaDecD = D.type({
  ra: D.number,
  dec: D.number
})

export const ProperMotionD = D.type({
  pmx: D.number,
  pmy: D.number
})

export const EqCoordD = D.type({
  _type: ciLiteral('EqCoord'),
  tag: TagD,
  ra: D.number,
  dec: D.number,
  frame: EqFrameD,
  catalogName: D.string,
  pm: ProperMotionD
})

export const MinorPlanetCoordD = D.type({
  _type: ciLiteral('MinorPlanetCoord'),
  tag: TagD,
  epoch: D.number,
  inclination: D.number,
  longAscendingNode: D.number,
  argOfPerihelion: D.number,
  meanDistance: D.number,
  eccentricity: D.number,
  meanAnomaly: D.number
})

export const SolarSystemCoordD = D.type({
  _type: ciLiteral('SolarSystemCoord'),
  tag: TagD,
  body: SolarSystemObjectD
})

export const CometCoordD = D.type({
  _type: ciLiteral('CometCoord'),
  tag: TagD,
  epochOfPerihelion: D.number,
  inclination: D.number,
  longAscendingNode: D.number,
  argOfPerihelion: D.number,
  perihelionDistance: D.number,
  eccentricity: D.number
})

export const AltAzCoordD = D.type({
  _type: ciLiteral('AltAzCoord'),
  tag: TagD,
  alt: D.number,
  az: D.number
})

export const CoordD = D.sum('_type')({
  EqCoord: EqCoordD,
  MinorPlanetCoord: MinorPlanetCoordD,
  SolarSystemCoord: SolarSystemCoordD,
  CometCoord: CometCoordD,
  AltAzCoord: AltAzCoordD
})

// ######################################################

/**
 * All coordinates are a Coord.
 * i.e CometCoord, AltAzCoord, SolarSystemCoord, MinorPlanetCoord & EqCoord
 */
export type Coord = D.TypeOf<typeof CoordD>

/**
 * A Tag is a label to indicate the use of the coordinate
 */
export type Tag = D.TypeOf<typeof TagD>

/**
 * RaDec holds Ra(Right Ascension) and Dec(Declination) values
 */
export type RaDec = D.TypeOf<typeof RaDecD>
export type ProperMotion = D.TypeOf<typeof ProperMotionD>
export type EqCoord = D.TypeOf<typeof EqCoordD>
export type MinorPlanetCoord = D.TypeOf<typeof MinorPlanetCoordD>
export type SolarSystemCoord = D.TypeOf<typeof SolarSystemCoordD>
export type CometCoord = D.TypeOf<typeof CometCoordD>
export type AltAzCoord = D.TypeOf<typeof AltAzCoordD>
export type SolarSystemObject = D.TypeOf<typeof SolarSystemObjectD>
export type EqFrame = D.TypeOf<typeof EqFrameD>
