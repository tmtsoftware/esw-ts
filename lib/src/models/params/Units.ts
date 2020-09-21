import type * as D from 'io-ts/lib/Decoder'
import { ciLiteral } from '../../utils/Decoder'

export type Units = D.TypeOf<typeof UnitsD>

export const UnitsD = ciLiteral(
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
