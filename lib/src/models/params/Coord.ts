import type * as D from 'io-ts/lib/Decoder'
import type { EqFrameD, SolarSystemObjectD, TagD } from '../../decoders/CoordDecoders'
/**
 * RaDec holds Ra(Right Ascension) and Dec(Declination) values
 */
export type RaDec = {
  ra: number
  dec: number
}

export type ProperMotion = {
  pmx: number
  pmy: number
}

/**
 * A Tag is a label to indicate the use of the coordinate
 */
export type Tag = D.TypeOf<typeof TagD>

export type SolarSystemObject = D.TypeOf<typeof SolarSystemObjectD>
export type EqFrame = D.TypeOf<typeof EqFrameD>

/**
 * All coordinates are a Coord.
 * i.e CometCoord, AltAzCoord, SolarSystemCoord, MinorPlanetCoord & EqCoord
 */
export type Coord = EqCoord | MinorPlanetCoord | SolarSystemCoord | CometCoord | AltAzCoord

/**
 *  Equatorial coordinates.
 */
export class EqCoord {
  readonly _type: 'EqCoord' = 'EqCoord'

  constructor(
    readonly tag: Tag,
    readonly ra: number,
    readonly dec: number,
    readonly frame: EqFrame,
    readonly catalogName: string,
    readonly pm: ProperMotion
  ) {}
}

export class MinorPlanetCoord {
  readonly _type: 'MinorPlanetCoord' = 'MinorPlanetCoord'

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

export class SolarSystemCoord {
  readonly _type: 'SolarSystemCoord' = 'SolarSystemCoord'
  constructor(readonly tag: Tag, readonly body: SolarSystemObject) {}
}

export class CometCoord {
  readonly _type: 'CometCoord' = 'CometCoord'

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
export class AltAzCoord {
  readonly _type: 'AltAzCoord' = 'AltAzCoord'

  constructor(readonly tag: Tag, readonly alt: number, readonly az: number) {}
}
