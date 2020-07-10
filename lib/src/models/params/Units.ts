import * as t from 'io-ts'
import * as D from 'io-ts/lib/Decoder'

export type Units = t.TypeOf<typeof UnitsV>

export const UnitsDec = D.literal(
  // SI units
  'angstrom',
  'arcmin',
  'arcsec',
  'day',
  'degree',
  'elvolt',
  'gram',
  'hour',
  'hertz',
  'joule',
  'kelvin',
  'kilogram',
  'kilometer',
  'liter',
  'meter',
  'marcsec',
  'millimeter',
  'millisecond',
  'micron',
  'micrometer',
  'minute',
  'newton',
  'pascal',
  'radian',
  'second',
  'sday',
  'steradian',
  'microarcsec',
  'volt',
  'watt',
  'week',
  'year',

  // CGS unit
  'coulomb',
  'centimeter',
  'erg',

  // Astropyhsics units
  'au',
  'jansky',
  'lightyear',
  'mag',

  // Imperial units
  'cal',
  'foot',
  'inch',
  'pound',
  'mile',
  'ounce',
  'yard',

  // Others - engineering
  'NoUnits',
  'encoder',
  'count',
  'pix'
)

export const UnitsV = t.keyof({
  // SI units
  angstrom: null,
  arcmin: null,
  arcsec: null,
  day: null,
  degree: null,
  elvolt: null,
  gram: null,
  hour: null,
  hertz: null,
  joule: null,
  kelvin: null,
  kilogram: null,
  kilometer: null,
  liter: null,
  meter: null,
  marcsec: null,
  millimeter: null,
  millisecond: null,
  micron: null,
  micrometer: null,
  minute: null,
  newton: null,
  pascal: null,
  radian: null,
  second: null,
  sday: null,
  steradian: null,
  microarcsec: null,
  volt: null,
  watt: null,
  week: null,
  year: null,

  // CGS unit
  coulomb: null,
  centimeter: null,
  erg: null,

  // Astropyhsics units
  au: null,
  jansky: null,
  lightyear: null,
  mag: null,

  // Imperial units
  cal: null,
  foot: null,
  inch: null,
  pound: null,
  mile: null,
  ounce: null,
  yard: null,

  // Others - engineering
  NoUnits: null,
  encoder: null,
  count: null,
  pix: null
})
