import * as D from 'io-ts/lib/Decoder'
import { ciLiteral } from '../../utils/Decoder'

const EqCoordL = 'EqCoord'
const MinorPlanetCoordL = 'MinorPlanetCoord'
const SolarSystemCoordL = 'SolarSystemCoord'
const AltAzCoordL = 'AltAzCoord'
const CometCoordL = 'CometCoord'
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
  _type: ciLiteral(EqCoordL),
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
  [EqCoordL]: EqCoordD,
  [MinorPlanetCoordL]: MinorPlanetCoordD,
  [SolarSystemCoordL]: SolarSystemCoordD,
  [CometCoordL]: CometCoordD,
  [AltAzCoordL]: AltAzCoordD
})

/**
 * All coordinates are a Coord.
 * i.e CometCoord, AltAzCoord, SolarSystemCoord, MinorPlanetCoord & EqCoord
 */
interface Coord {
  tag: Tag
}

/**
 *  Equatorial coordinates.
 */
export class EqCoord implements Coord {
  readonly _type: typeof EqCoordL = EqCoordL

  constructor(
    readonly tag: Tag,
    readonly ra: number,
    readonly dec: number,
    readonly frame: EqFrame,
    readonly catalogName: string,
    readonly pm: ProperMotion
  ) {}
}

export class MinorPlanetCoord implements Coord {
  readonly _type: typeof MinorPlanetCoordL = MinorPlanetCoordL

  constructor(
    readonly tag: Tag,
    readonly epoch: number, // TT as a Modified Julian Date
    readonly inclination: number, // degrees
    readonly longAscendingNode: number, // degrees
    readonly argOfPerihelion: number, // degrees
    readonly meanDistance: number, // AU
    readonly eccentricity: number,
    readonly meanAnomaly: number
  ) {}
}

export class SolarSystemCoord implements Coord {
  readonly _type: typeof SolarSystemCoordL = SolarSystemCoordL
  constructor(readonly tag: Tag, readonly body: SolarSystemObject) {}
}

export class CometCoord implements Coord {
  readonly _type: typeof CometCoordL = CometCoordL

  constructor(
    readonly tag: Tag,
    readonly epochOfPerihelion: number, // TT as a Modified Julian Date
    readonly inclination: number, // degrees
    readonly longAscendingNode: number, // degrees
    readonly argOfPerihelion: number, // degrees
    readonly perihelionDistance: number, // AU
    readonly eccentricity: number
  ) {}
}

/**
 *  Altitude Azimuth Coordinates
 */
export class AltAzCoord implements Coord {
  readonly _type: typeof AltAzCoordL = AltAzCoordL

  constructor(readonly tag: Tag, readonly alt: number, readonly az: number) {}
}

// ######################################################

/**
 * A Tag is a label to indicate the use of the coordinate
 */
export type Tag = D.TypeOf<typeof TagD>

/**
 * RaDec holds Ra(Right Ascension) and Dec(Declination) values
 */
export type RaDec = D.TypeOf<typeof RaDecD>
export type ProperMotion = D.TypeOf<typeof ProperMotionD>
export type SolarSystemObject = D.TypeOf<typeof SolarSystemObjectD>
export type EqFrame = D.TypeOf<typeof EqFrameD>
