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
  static readonly degC: Units = new Units('degC','degree celsius')
  static readonly degF: Units = new Units( 'degF','Fahrenheit')
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
  static readonly lm: Units = new Units('lm', 'lumen')
  static readonly lsun: Units = new Units('lsun','solar luminosity')
  static readonly lx: Units = new Units('lx','lux')
  static readonly mas: Units = new Units('mas','milli arc second')
  static readonly me: Units = new Units('me','electron mass')
  static readonly meter: Units = new Units('meter', 'm')
  static readonly microarcsec: Units = new Units('microarcsec', 'µas')
  static readonly millimeter: Units = new Units('millimeter', 'mm')
  static readonly millisecond: Units = new Units('millisecond', 'ms')
  static readonly micron: Units = new Units('micron', 'µm')
  static readonly micrometer: Units = new Units('micrometer', 'µm')
  static readonly minute: Units = new Units('minute', 'min')
  static readonly MJD: Units = new Units('Mod. Julian Date', 'MJD')
  static readonly mol: Units = new Units('mol', 'mole')
  static readonly month: Units = new Units('month', 'month')
  static readonly mmyy: Units = new Units('mmyy', 'mmyy')
  static readonly mu0: Units = new Units('mu0', 'magnetic constant')
  static readonly muB: Units = new Units('muB','Bohr magneton',)
  static readonly nanometer: Units = new Units('nanometer', 'nm')
  static readonly newton: Units = new Units('newton', 'N')
  static readonly ohm: Units = new Units('ohm', 'ohm')
  static readonly pascal: Units = new Units('pascal', 'Pa')
  static readonly pi: Units = new Units('pi', 'pi')
  static readonly pc: Units = new Units('pc', 'parsec')
  static readonly ppm: Units = new Units('ppm', 'part per million')
  static readonly radian: Units = new Units('radian', 'rad')
  static readonly second: Units = new Units('second', 's')
  static readonly sday: Units = new Units('sday', 'sday')
  static readonly steradian: Units = new Units('steradian', 'sr')
  static readonly volt: Units = new Units('volt', 'V')
  static readonly watt: Units = new Units('watt', 'W')
  static readonly Wb: Units = new Units('Wb', 'weber')
  static readonly week: Units = new Units('week', 'wk')
  static readonly year: Units = new Units('year', 'yr')

  // CGS units
  static readonly coulomb: Units = new Units('coulomb', 'C')
  static readonly centimeter: Units = new Units('centimeter', 'cm')
  static readonly D: Units = new Units('D', 'debye(dipole)')
  static readonly dyn: Units = new Units('dyn', 'dyne')
  static readonly erg: Units = new Units('erg', 'erg')

  // Astropyhsics units
  static readonly au: Units = new Units('au', 'AU')
  static readonly a0: Units = new Units('a0','bohr radius')
  static readonly c: Units = new Units('c','speed of light')
  static readonly cKayser: Units = new Units('cKayser', 'cKayser')
  static readonly crab: Units = new Units('crab', 'crab')
  static readonly damas: Units = new Units('damas', 'd:m:s')
  static readonly e: Units = new Units('e','electron charge')
  static readonly earth: Units = new Units('earth','earth unit')
  static readonly F: Units = new Units('F', 'Farad')
  static readonly G: Units = new Units('G', 'gravitation constant')
  static readonly geoMass: Units = new Units('geoMass', 'earth mass')
  static readonly hm: Units = new Units('hm','hour minutes')
  static readonly hms: Units = new Units('hms','hour minutes seconds')
  static readonly hhmmss: Units = new Units('hhmmss', 'HH:MM:SS')
  static readonly jansky: Units = new Units('jansky', 'Jy')
  static readonly jd: Units = new Units('jd', 'Julian Day')
  static readonly jovMass: Units = new Units('jovMass', 'Jupiter Mass')
  static readonly lightyear: Units = new Units('lightyear', 'lyr')
  static readonly mag: Units = new Units('mag', 'mag')
  static readonly mjup: Units = new Units('mjup', 'Jupiter mass')
  static readonly mp: Units = new Units('mp', 'proton mass')
  static readonly minsec: Units = new Units('minsec', 'm:s')
  static readonly msun: Units = new Units('msun', 'solar mass')
  static readonly photon: Units = new Units('photon', 'photon')
  static readonly rgeo: Units = new Units('rgeo', 'earth radius')
  static readonly rjup: Units = new Units('rjup','Jupiter Radius')
  static readonly rsun: Units = new Units('rsun','solar radius')
  static readonly rydberg: Units = new Units('rydberg', 'Rydberg')
  static readonly seimens: Units = new Units('seimens', 'seimens')
  static readonly tesla: Units = new Units('tesla', 'tesla')
  static readonly u: Units = new Units('u', 'atomic mass unit')

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
  static readonly datetime: Units = new Units('datetime', 'datetime')

  // Others - engineering
  static readonly NoUnits: Units = new Units('NoUnits', 'none')
  static readonly bit: Units = new Units('bit', 'bit')
  static readonly encoder: Units = new Units('encoder', 'enc')
  static readonly count: Units = new Units('count', 'ct')
  static readonly mmhg: Units = new Units('mmhg', 'millimetre of  mercury')
  static readonly percent: Units = new Units('percent', 'percent')
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
