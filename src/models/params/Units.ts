/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

export class Units {
  private static readonly valuesMap: Record<string, Units> = {}

  //**********************************Units****************************************\\
  // SI units
  static readonly angstrom: Units = new Units('angstrom', 'Angstrom')
  static readonly alpha: Units = new Units('alpha', 'alpha')
  static readonly ampere: Units = new Units('ampere', 'A')
  static readonly arcmin: Units = new Units('arcmin', 'arcmin')
  static readonly arcsec: Units = new Units('arcsec', 'arcsec')
  static readonly bar: Units = new Units('bar', 'bar')
  static readonly candela: Units = new Units('candela', 'candela')
  static readonly day: Units = new Units('day', 'd')
  static readonly degree: Units = new Units('degree', 'deg')
  static readonly degC: Units = new Units('degree Celsius', 'degC')
  static readonly degF: Units = new Units('Fahrenheit', 'degF')
  static readonly elvolt: Units = new Units('elvolt', 'eV')
  static readonly gauss: Units = new Units('gauss', 'gauss')
  static readonly gram: Units = new Units('gram', 'g')
  static readonly hertz: Units = new Units('hertz', 'Hz')
  static readonly henry: Units = new Units('henry', 'henry')
  static readonly hour: Units = new Units('hour', 'h')
  static readonly joule: Units = new Units('joule', 'J')
  static readonly kelvin: Units = new Units('kelvin', 'K')
  static readonly kilogram: Units = new Units('kilogram', 'kg')
  static readonly kilometer: Units = new Units('kilometer', 'km')
  static readonly liter: Units = new Units('liter', 'l')
  static readonly lm: Units = new Units('lumen', 'lm')
  static readonly lsun: Units = new Units('solar luminosity', 'lsun')
  static readonly lx: Units = new Units('lux', 'lx')
  static readonly mas: Units = new Units('milli arc second', 'mas')
  static readonly me: Units = new Units('electron mass', 'me')
  static readonly meter: Units = new Units('meter', 'm')
  static readonly microarcsec: Units = new Units('micro arcsec', 'µas')
  static readonly millimeter: Units = new Units('millimeter', 'mm')
  static readonly millisecond: Units = new Units('millisecond', 'ms')
  static readonly micron: Units = new Units('micron', 'µm')
  static readonly micrometer: Units = new Units('micrometer', 'µm')
  static readonly minute: Units = new Units('minute', 'min')
  static readonly MJD: Units = new Units('Mod. Julian Date', 'MJD')
  static readonly mol: Units = new Units('mole', 'mol')
  static readonly month: Units = new Units('month', 'month')
  static readonly mmyy: Units = new Units('Month/Year', 'mmyy')
  static readonly mu0: Units = new Units('magnetic constant', 'mu0')
  static readonly muB: Units = new Units('Bohr magneton', 'muB')
  static readonly nanometer: Units = new Units('nanometer', 'nm')
  static readonly newton: Units = new Units('newton', 'N')
  static readonly ohm: Units = new Units('ohm', 'ohm')
  static readonly pascal: Units = new Units('pascal', 'Pa')
  static readonly pi: Units = new Units('pi', 'pi')
  static readonly pc: Units = new Units('parsec', 'pc')
  static readonly ppm: Units = new Units('part per million', 'ppm')
  static readonly radian: Units = new Units('radian', 'rad')
  static readonly second: Units = new Units('second', 's')
  static readonly sday: Units = new Units('sday', 'sday')
  static readonly steradian: Units = new Units('steradian', 'sr')
  static readonly volt: Units = new Units('volt', 'V')
  static readonly watt: Units = new Units('watt', 'W')
  static readonly Wb: Units = new Units('weber', 'Wb')
  static readonly week: Units = new Units('week', 'wk')
  static readonly year: Units = new Units('year', 'yr')

  // CGS units
  static readonly coulomb: Units = new Units('coulomb', 'C')
  static readonly centimeter: Units = new Units('centimeter', 'cm')
  static readonly D: Units = new Units('debye(dipole)', 'D')
  static readonly dyn: Units = new Units('dyne', 'dyn')
  static readonly erg: Units = new Units('erg', 'erg')

  // Astropyhsics units
  static readonly au: Units = new Units('au', 'AU')
  static readonly a0: Units = new Units('bohr radius', 'a0')
  static readonly c: Units = new Units('speed of light', 'c')
  static readonly cKayser: Units = new Units('cKayser', 'cKayser')
  static readonly crab: Units = new Units('crab', 'crab')
  static readonly damas: Units = new Units('degree minute arcsecond', 'd:m:s')
  static readonly e: Units = new Units('electron charge', 'e')
  static readonly earth: Units = new Units('earth unit', 'earth')
  static readonly F: Units = new Units('Farad', 'F')
  static readonly G: Units = new Units('gravitation constant', 'G')
  static readonly geoMass: Units = new Units('Earth Mass', 'geoMass')
  static readonly hm: Units = new Units('hour minutes', 'hm')
  static readonly hms: Units = new Units('hour minutes seconds', 'hms')
  static readonly hhmmss: Units = new Units('hour minutes seconds(sexagesimal time)', 'HH:MM:SS')
  static readonly jansky: Units = new Units('jansky', 'Jy')
  static readonly jd: Units = new Units('Julian Day', 'jd')
  static readonly jovMass: Units = new Units('Jupiter mass', 'jovMass')
  static readonly lightyear: Units = new Units('lightyear', 'lyr')
  static readonly mag: Units = new Units('mag', 'mag')
  static readonly mjup: Units = new Units('Jupiter mass', 'mjup')
  static readonly mp: Units = new Units('proton mass', 'mp')
  static readonly minsec: Units = new Units('minute second', 'm:s')
  static readonly msun: Units = new Units('solar mass', 'msun')
  static readonly photon: Units = new Units('photon', 'photon')
  static readonly rgeo: Units = new Units('Earth radius', 'Rgeo')
  static readonly rjup: Units = new Units('Jupiter Radius', 'Rjup')
  static readonly rsun: Units = new Units('solar radius', 'Rsun')
  static readonly rydberg: Units = new Units('Rydberg', 'Rydberg')
  static readonly seimens: Units = new Units('seimens', 'seimens')
  static readonly tesla: Units = new Units('tesla', 'tesla')
  static readonly u: Units = new Units('atomic mass unit', 'u')

  // Imperial units
  static readonly barn: Units = new Units('barn', 'barn')
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
  static readonly date: Units = new Units('date', 'date')
  static readonly datetime: Units = new Units('date/time', 'datetime')

  // Others - engineering
  static readonly NoUnits: Units = new Units('NoUnits', 'none')
  static readonly bit: Units = new Units('bit', 'bit')
  static readonly encoder: Units = new Units('encoder', 'enc')
  static readonly count: Units = new Units('count', 'ct')
  static readonly mmhg: Units = new Units('millimetre of  mercury', 'mmHg')
  static readonly percent: Units = new Units('percentage', 'percent')
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
