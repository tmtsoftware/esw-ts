/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

export class Units {
  private static readonly valuesMap: Record<string, Units> = {}

  //**********************************Units****************************************\\
  // SI units
  static readonly angstrom: Units = new Units('angstrom', 'Angstrom')
  static readonly arcmin: Units = new Units('arcmin', 'arcmin')
  static readonly arcsec: Units = new Units('arcsec', 'arcsec')
  static readonly day: Units = new Units('day', 'd')
  static readonly degree: Units = new Units('degree', 'deg')
  static readonly elvolt: Units = new Units('elvolt', 'eV')
  static readonly gram: Units = new Units('gram', 'g')
  static readonly hour: Units = new Units('hour', 'h')
  static readonly hertz: Units = new Units('hertz', 'Hz')
  static readonly joule: Units = new Units('joule', 'J')
  static readonly kelvin: Units = new Units('kelvin', 'K')
  static readonly kilogram: Units = new Units('kilogram', 'kg')
  static readonly kilometer: Units = new Units('kilometer', 'km')
  static readonly liter: Units = new Units('liter', 'l')
  static readonly meter: Units = new Units('meter', 'm')
  static readonly marcsec: Units = new Units('marcsec', 'mas')
  static readonly millimeter: Units = new Units('millimeter', 'mm')
  static readonly millisecond: Units = new Units('millisecond', 'ms')
  static readonly micron: Units = new Units('micron', 'µm')
  static readonly micrometer: Units = new Units('micrometer', 'µm')
  static readonly minute: Units = new Units('minute', 'min')
  static readonly nanometer: Units = new Units('nanometer','nm')
  static readonly newton: Units = new Units('newton', 'N')
  static readonly pascal: Units = new Units('pascal', 'Pa')
  static readonly radian: Units = new Units('radian', 'rad')
  static readonly second: Units = new Units('second', 's')
  static readonly sday: Units = new Units('sday', 'sday')
  static readonly steradian: Units = new Units('steradian', 'sr')
  static readonly microarcsec: Units = new Units('microarcsec', 'µas')
  static readonly volt: Units = new Units('volt', 'V')
  static readonly watt: Units = new Units('watt', 'W')
  static readonly week: Units = new Units('week', 'wk')
  static readonly year: Units = new Units('year', 'yr')

  // CGS units
  static readonly coulomb: Units = new Units('coulomb', 'C')
  static readonly centimeter: Units = new Units('centimeter', 'cm')
  static readonly erg: Units = new Units('erg', 'erg')

  // Astropyhsics units
  static readonly au: Units = new Units('au', 'AU')
  static readonly jansky: Units = new Units('jansky', 'Jy')
  static readonly lightyear: Units = new Units('lightyear', 'lyr')
  static readonly mag: Units = new Units('mag', 'mag')

  // Imperial units
  static readonly cal: Units = new Units('cal', 'cal')
  static readonly foot: Units = new Units('foot', 'ft')
  static readonly inch: Units = new Units('inch', 'inch')
  static readonly pound: Units = new Units('pound', 'lb')
  static readonly mile: Units = new Units('mile', 'mi')
  static readonly ounce: Units = new Units('ounce', 'oz')
  static readonly yard: Units = new Units('yard', 'yd')

  //Datetime units
  static readonly tai: Units = new Units('tai', 'TAI')
  static readonly utc: Units = new Units('utc', 'UTC')

  // Others - engineering
  static readonly NoUnits: Units = new Units('NoUnits', 'none')
  static readonly encoder: Units = new Units('encoder', 'enc')
  static readonly count: Units = new Units('count', 'ct')
  static readonly pix: Units = new Units('pix', 'pix')

  private constructor(private readonly _type: string, readonly name: string) {
    this.setUnits(_type, this)
  }

  private setUnits(_type: string, value: Units) {
    Units.valuesMap[_type] = value
  }

  static values() {
    return Units.valuesMap
  }

  toJSON() {
    return this._type
  }
}
