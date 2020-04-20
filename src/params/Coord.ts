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

export type TimeTag = 'UTCTimeKey' | 'TAITimeKey'
export type EqFrame = 'ICRS' | 'FK5'

export interface RaDec {
  ra: number
  dec: number
}

export interface ProperMotion {
  pmx: number
  pmy: number
}

export interface Angle {
  uas: number
}

export interface EqCoord {
  tag: Tag
  ra: Angle
  dec: Angle
  frame: EqFrame
  catalogName: string
  pm: ProperMotion
}

export interface MinorPlanetCoord {
  tag: Tag
  epoch: number
  inclination: Angle
  longAscendingNode: Angle
  argOfPerihelion: Angle
  meanDistance: number
  eccentricity: number
  meanAnomaly: Angle
}

export interface SolarSystemCoord {
  tag: Tag
  body: SolarSystemObject
}

export interface CometCoord {
  tag: Tag
  epochOfPerihelion: number
  inclination: Angle
  longAscendingNode: Angle
  argOfPerihelion: Angle
  perihelionDistance: number
  eccentricity: number
}

export interface AltAzCoord {
  tag: Tag
  alt: Angle
  az: Angle
}

export interface Coord {
  tag: Tag
}
