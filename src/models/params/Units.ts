export const Units = {
  // SI units
  angstrom: 'Angstrom',
  arcmin: 'arcmin',
  arcsec: 'arcsec',
  day: 'd',
  degree: 'deg',
  elvolt: 'eV',
  gram: 'g',
  hour: 'h',
  hertz: 'Hz',
  joule: 'J',
  kelvin: 'K',
  kilogram: 'kg',
  kilometer: 'km',
  liter: 'l',
  meter: 'm',
  marcsec: 'mas',
  millimeter: 'mm',
  millisecond: 'ms',
  micron: 'µm',
  micrometer: 'µm',
  minute: 'min',
  newton: 'N',
  pascal: 'Pa',
  radian: 'rad',
  second: 's',
  sday: 'sday',
  steradian: 'sr',
  microarcsec: 'µas',
  volt: 'V',
  watt: 'W',
  week: 'wk',
  year: 'yr',

  // CGS unit
  coulomb: 'C',
  centimeter: 'cm',
  erg: 'erg',

  // Astropyhsics units
  au: 'AU',
  jansky: 'Jy',
  lightyear: 'lyr',
  mag: 'mag',

  // Imperial units
  cal: 'cal',
  foot: 'ft',
  inch: 'inch',
  pound: 'lb',
  mile: 'mi',
  ounce: 'oz',
  yard: 'yd',

  // Others - engineering
  NoUnits: 'none',
  encoder: 'enc',
  count: 'ct',
  pix: 'pix',

  // Time units
  tai: 'TAI',
  utc: 'UTC'
}

/**
 * A union type representing units for TMT
 * @category Params
 */
export type Units = keyof typeof Units
