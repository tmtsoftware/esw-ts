export type Tag =
  | 'BASE'
  | 'OIWFS1'
  | 'OIWFS2'
  | 'OIWFS3'
  | 'OIWFS4'
  | 'ODGW1'
  | 'ODGW2'
  | 'ODGW3'
  | 'ODGW4'
  | 'GUIDER1'
  | 'GUIDER2'

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

export interface RaDec {
  readonly ra: number
  readonly dec: number
}

export interface ProperMotion {
  readonly pmx: number
  readonly pmy: number
}

export interface EqCoord extends Coord {
  readonly _type: 'EqCoord'
  readonly tag: Tag
  readonly ra: number
  readonly dec: number
  readonly frame: EqFrame
  readonly catalogName: string
  readonly pm: ProperMotion
}

export interface MinorPlanetCoord extends Coord {
  readonly _type: 'MinorPlanetCoord'
  readonly tag: Tag
  readonly epoch: number
  readonly inclination: number
  readonly longAscendingNode: number
  readonly argOfPerihelion: number
  readonly meanDistance: number
  readonly eccentricity: number
  readonly meanAnomaly: number
}

export interface SolarSystemCoord extends Coord {
  readonly _type: 'SolarSystemCoord'
  readonly tag: Tag
  readonly body: SolarSystemObject
}

export interface CometCoord extends Coord {
  readonly _type: 'CometCoord'
  readonly tag: Tag
  readonly epochOfPerihelion: number
  readonly inclination: number
  readonly longAscendingNode: number
  readonly argOfPerihelion: number
  readonly perihelionDistance: number
  readonly eccentricity: number
}

export interface AltAzCoord extends Coord {
  readonly _type: 'AltAzCoord'
  readonly tag: Tag
  readonly alt: number
  readonly az: number
}

export interface Coord {
  readonly _type: string
  readonly tag: Tag
}
