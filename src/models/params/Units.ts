export class Units {
  constructor(private readonly _type: string, readonly name: string) {}

  toJSON() {
    return this._type
  }
}

// SI units
export const angstrom: Units = new Units('angstrom', 'Angstrom')
export const arcmin: Units = new Units('arcmin', 'arcmin')
export const arcsec: Units = new Units('arcsec', 'arcsec')
export const day: Units = new Units('day', 'd')
export const degree: Units = new Units('degree', 'deg')
export const elvolt: Units = new Units('elvolt', 'eV')
export const gram: Units = new Units('gram', 'g')
export const hour: Units = new Units('hour', 'h')
export const hertz: Units = new Units('hertz', 'Hz')
export const joule: Units = new Units('joule', 'J')
export const kelvin: Units = new Units('kelvin', 'K')
export const kilogram: Units = new Units('kilogram', 'kg')
export const kilometer: Units = new Units('kilometer', 'km')
export const liter: Units = new Units('liter', 'l')
export const meter: Units = new Units('meter', 'm')
export const marcsec: Units = new Units('marcsec', 'mas')
export const millimeter: Units = new Units('millimeter', 'mm')
export const millisecond: Units = new Units('millisecond', 'ms')
export const micron: Units = new Units('micron', 'µm')
export const micrometer: Units = new Units('micrometer', 'µm')
export const minute: Units = new Units('minute', 'min')
export const newton: Units = new Units('newton', 'N')
export const pascal: Units = new Units('pascal', 'Pa')
export const radian: Units = new Units('radian', 'rad')
export const second: Units = new Units('second', 's')
export const sday: Units = new Units('sday', 'sday')
export const steradian: Units = new Units('steradian', 'sr')
export const microarcsec: Units = new Units('microarcsec', 'µas')
export const volt: Units = new Units('volt', 'V')
export const watt: Units = new Units('watt', 'W')
export const week: Units = new Units('week', 'wk')
export const year: Units = new Units('year', 'yr')

// CGS units
export const coulomb: Units = new Units('coulomb', 'C')
export const centimeter: Units = new Units('centimeter', 'cm')
export const erg: Units = new Units('erg', 'erg')

// Astropyhsics units
export const au: Units = new Units('au', 'AU')
export const jansky: Units = new Units('jansky', 'Jy')
export const lightyear: Units = new Units('lightyear', 'lyr')
export const mag: Units = new Units('mag', 'mag')

// Imperial units
export const cal: Units = new Units('cal', 'cal')
export const foot: Units = new Units('foot', 'ft')
export const inch: Units = new Units('inch', 'inch')
export const pound: Units = new Units('pound', 'lb')
export const mile: Units = new Units('mile', 'mi')
export const ounce: Units = new Units('ounce', 'oz')
export const yard: Units = new Units('yard', 'yd')

//Datetime units
export const tai: Units = new Units('tai', 'TAI')
export const utc: Units = new Units('utc', 'UTC')

// Others - engineering
export const NoUnits: Units = new Units('NoUnits', 'none')
export const encoder: Units = new Units('encoder', 'enc')
export const count: Units = new Units('count', 'ct')
export const pix: Units = new Units('pix', 'pix')
