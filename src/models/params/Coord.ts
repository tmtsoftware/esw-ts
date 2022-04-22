/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Angle } from './Angle'

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
    readonly ra: Angle,
    readonly dec: Angle,
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
    readonly inclination: Angle, // degrees
    readonly longAscendingNode: Angle, // degrees
    readonly argOfPerihelion: Angle, // degrees
    readonly meanDistance: number, // AU
    readonly eccentricity: number,
    readonly meanAnomaly: Angle
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
    readonly inclination: Angle, // degrees
    readonly longAscendingNode: Angle, // degrees
    readonly argOfPerihelion: Angle, // degrees
    readonly perihelionDistance: number, // AU
    readonly eccentricity: number
  ) {}
}

/**
 *  Altitude Azimuth Coordinates
 */
export class AltAzCoord {
  readonly _type: 'AltAzCoord' = 'AltAzCoord'

  constructor(readonly tag: Tag, readonly alt: Angle, readonly az: Angle) {}
}
