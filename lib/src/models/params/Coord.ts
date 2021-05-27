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
 * @category Params
 */
export class Tag {
  constructor(readonly name: string) {}

  toJSON(): string {
    return this.name
  }
}

export type SolarSystemObject =
  | 'Mercury'
  | 'Venus'
  | 'Moon'
  | 'Mars'
  | 'Jupiter'
  | 'Saturn'
  | 'Neptune'
  | 'Uranus'
  | 'Pluto'

export type EqFrame = 'ICRS' | 'FK5'

/**
 * All coordinates are a Coord.
 * i.e CometCoord, AltAzCoord, SolarSystemCoord, MinorPlanetCoord & EqCoord
 * @category Params
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
