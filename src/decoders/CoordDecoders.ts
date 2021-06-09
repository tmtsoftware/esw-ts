import { pipe } from 'fp-ts/function'
import * as D from 'io-ts/es6/Decoder'
import type {
  AltAzCoord,
  CometCoord,
  Coord,
  EqCoord,
  EqFrame,
  MinorPlanetCoord,
  ProperMotion,
  RaDec,
  SolarSystemCoord,
  SolarSystemObject
} from '../models'
import { Tag } from '../models'
import { ciLiteral, Decoder } from './Decoder'

export const TagD: Decoder<Tag> = pipe(
  D.string,
  D.parse((name) => D.success(new Tag(name)))
)

export const SolarSystemObjectD: Decoder<SolarSystemObject> = ciLiteral(
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

export const EqFrameD: Decoder<EqFrame> = ciLiteral('ICRS', 'FK5')

export const RaDecD: Decoder<RaDec> = D.struct({
  ra: D.number,
  dec: D.number
})

export const ProperMotionD: Decoder<ProperMotion> = D.struct({
  pmx: D.number,
  pmy: D.number
})

export const EqCoordD: Decoder<EqCoord> = D.struct({
  _type: ciLiteral('EqCoord'),
  tag: TagD,
  ra: D.number,
  dec: D.number,
  frame: EqFrameD,
  catalogName: D.string,
  pm: ProperMotionD
})

export const MinorPlanetCoordD: Decoder<MinorPlanetCoord> = D.struct({
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

export const SolarSystemCoordD: Decoder<SolarSystemCoord> = D.struct({
  _type: ciLiteral('SolarSystemCoord'),
  tag: TagD,
  body: SolarSystemObjectD
})

export const CometCoordD: Decoder<CometCoord> = D.struct({
  _type: ciLiteral('CometCoord'),
  tag: TagD,
  epochOfPerihelion: D.number,
  inclination: D.number,
  longAscendingNode: D.number,
  argOfPerihelion: D.number,
  perihelionDistance: D.number,
  eccentricity: D.number
})

export const AltAzCoordD: Decoder<AltAzCoord> = D.struct({
  _type: ciLiteral('AltAzCoord'),
  tag: TagD,
  alt: D.number,
  az: D.number
})

export const CoordD: Decoder<Coord> = D.sum('_type')({
  EqCoord: EqCoordD,
  MinorPlanetCoord: MinorPlanetCoordD,
  SolarSystemCoord: SolarSystemCoordD,
  CometCoord: CometCoordD,
  AltAzCoord: AltAzCoordD
})
