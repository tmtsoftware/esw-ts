import Big from 'big.js';

// noinspection RegExpRedundantEscape,JSUnusedGlobalSymbols,RegExpSingleCharAlternation

/**
 * Based on the CSW Angle class.
 *
 * An wrapper for angle. Normally angle would be stored in double
 * as radians, but this introduces rounding errors.
 * This class stores value in microarcseconds to prevent rounding errors.
 */
export class Angle {
  /** the angle value in microarcsec */
  uas: number

  // -- constants --

  /** multiply to convert degrees to radians */
  static readonly D2R: number = Math.PI / 180.0

  /** multiply to convert radians to degrees */
  static readonly R2D: number = 1.0 / Angle.D2R

  /** multiply to convert degrees to archours */
  static readonly D2H: number = 1.0 / 15.0

  /** multiply to convert archour to degrees */
  static readonly H2D: number = 1.0 / Angle.D2H

  /** multiply to convert degrees to arcminute */
  static readonly D2M: number = 60

  /** multiply to convert arcminute  to toDegree */
  static readonly M2D: number = 1.0 / Angle.D2M

  /** multiply to convert degrees to arcsecond */
  static readonly D2S: number = 3600

  /** multiply to convert arcsecond to toDegree */
  static readonly S2D: number = 1.0 / Angle.D2S

  /** multiply to convert hours to radians */
  static readonly H2R: number = Angle.H2D * Angle.D2R

  /** multiply to convert radians to hours */
  static readonly R2H: number = 1.0 / Angle.H2R

  /** multiply to convert radians to minutes */
  static readonly R2M: number = Angle.R2D * Angle.D2M

  /** multiply to convert minutes to radians */
  static readonly M2R: number = 1.0 / Angle.R2M

  /** multiply to convert milliarcseconds to radians */
  static readonly Mas2R: number = Angle.D2R / 3600000.0

  /** multiply to convert microarcseconds to radians */
  static readonly Uas2R: number = Angle.D2R / 3600000000.0

  /** multiply to convert radians to milliarcseconds */
  static readonly R2Mas: number = 1.0 / Angle.Mas2R

  /** multiply to convert radians to microarcseconds */
  static readonly R2Uas: number = 1.0 / Angle.Uas2R

  /** multiply to convert hours to milliarcseconds */
  static readonly H2Mas: number = 15 * 60 * 60 * 1000

  /** multiply to convert time minutes to milliarcseconds */
  static readonly HMin2Mas: number = 15 * 60 * 1000

  /** multiply to convert time seconds to milliarcseconds */
  static readonly HSec2Mas: number = 15 * 1000

  /** multiply to convert hours to microarcseconds */
  static readonly H2Uas: number = 15 * 60 * 60 * 1000 * 1000

  /** multiply to convert time minutes to microarcseconds */
  static readonly HMin2Uas: number = 15 * 60 * 1000 * 1000

  /** multiply to convert time seconds to microarcseconds */
  static readonly HSec2Uas: number = 15 * 1000 * 1000

  /** multiply to convert degrees to milliarcseconds */
  static readonly D2Mas: number = 60 * 60 * 1000

  /** multiply to convert minutes to milliarcseconds */
  static readonly M2Mas: number = 60 * 1000

  /** multiply to convert Seconds to milliarcseconds */
  static readonly S2Mas: number = 1000

  /** multiply to convert degrees to microarcseconds */
  static readonly D2Uas: number = 60 * 60 * 1000 * 1000

  /** multiply to convert minutes to microarcseconds */
  static readonly M2Uas: number = 60 * 1000 * 1000

  /** multiply to convert Seconds to microarcseconds */
  static readonly S2Uas: number = 1000 * 1000

  /** multiply to convert UAS to degrees */
  static readonly Uas2D: number = 1.0 / Angle.D2Uas

  /** multiply to convert UAS to minutes */
  static readonly Uas2M: number = 1.0 / Angle.M2Uas

  /** multiply to convert UAS to Seconds */
  static readonly Uas2S: number = 1.0 / Angle.S2Uas

  /** multiply to convert  arcseconds to radians */
  static readonly S2R: number = Angle.D2R / 3600.0

  /** multiply to convert radians to  arcseconds */
  static readonly R2S: number = 1.0 / Angle.S2R

  /** round circle which marks degrees */
  static readonly DEGREE_SIGN = '\u00B0'

  static readonly CIRCLE: number = 360 * 60 * 60 * 1000 * 1000


  constructor(uas: number) {
    this.uas = uas
  }


  //operators
  add(a2: Angle): Angle {
    return new Angle(this.uas + a2.uas)
  }

  sub(a2: Angle): Angle {
    return new Angle(this.uas - a2.uas)
  }

  mul(a2: Angle): Angle {
    return new Angle(this.uas * a2.uas)
  }

  mul2(a2: number): Angle {
    return new Angle(this.uas * a2)
  }

  div(a2: Angle): Angle {
    return new Angle(this.uas / a2.uas)
  }

  div2(a2: number): Angle {
    return new Angle(this.uas / a2)
  }

  private static isNear(x: number, d: number): boolean {
    const tolerance = 1e-7
    return Math.abs(x % d) < tolerance || Math.abs(x % d - d) < tolerance
  }

  private static formatSecs(sec: number): string {
    if (Angle.isNear(sec, 1))
      return `${Math.round(sec)}`
    else if (Angle.isNear(sec, 0.1))
      return `${sec.toFixed(1)}`
    else if (Angle.isNear(sec, 0.01))
      return `${sec.toFixed(2)}`
    else
      return `${sec.toFixed(3)}`
  }

  /**
   * convert RA to string in format '1h 2m'
   * minutes and seconds are auto added as needed
   *
   * @param ra in radians
   * @return ra in string form
   */
  static raToString(ra: number): string {
    if (Angle.isNear(ra, Angle.H2R)) {
      const hour = Math.round(ra * Angle.R2H)
      return `${hour}h`
    } else if (Angle.isNear(ra, Angle.H2R / 60.0)) {
      const hour = Math.trunc(ra * Angle.R2H)
      const min = Math.round((ra - Angle.H2R * hour) * Angle.R2H * 60)
      return `${hour}h ${min}m`
    } else {
      const hour = Math.trunc(ra * Angle.R2H)
      const min = Math.trunc((ra - Angle.H2R * hour) * Angle.R2H * 60)
      const sec = (ra - Angle.H2R * hour - min * Angle.H2R / 60) * Angle.R2H * 3600
      const s = Angle.formatSecs(sec)
      return `${hour}h ${min}m ${s}s`
    }
  }

  /**
   * convert DE to string in format '1d 2m'
   * minutes and seconds are auto added as needed
   *
   * @param de2 in radians
   * @return de in string form
   */
  static deToString(de2: number): string {
    const [de, sign] = (de2 < 0) ? [-de2, "-"] : [de2, ""]

    if (Angle.isNear(de, Angle.D2R)) {
      const deg = Math.trunc(Math.round(de * Angle.R2D))
      return sign + deg + Angle.DEGREE_SIGN
    } else if (Angle.isNear(de, Angle.M2R)) {
      const deg = Math.trunc(de * Angle.R2D)
      const min = Math.trunc((de - Angle.D2R * deg) * Angle.R2M)
      return sign + deg + Angle.DEGREE_SIGN + min + "'"
    } else {
      const deg = Math.trunc(de * Angle.R2D)
      const min = Math.trunc((de - Angle.D2R * deg) * Angle.R2D * 60)
      const sec = (de - Angle.D2R * deg - min * Angle.D2R / 60) * Angle.R2D * 3600
      const s = Angle.formatSecs(sec)
      return sign + deg + Angle.DEGREE_SIGN + min + "'" + s + "\""
    }
  }

  /**
   * calculate great circle distance of two points,
   * coordinates are given in radians
   *
   * @return distance of two points in radians
   */
  static distance(ra1: number, de1: number, ra2: number, de2: number): number {
    //check ranges
    Angle.assertRa(ra1)
    Angle.assertRa(ra2)
    Angle.assertDe(de1)
    Angle.assertDe(de2)

    //this code is from JH labs projection lib
    const dlat = Math.sin((de2 - de1) / 2)
    const dlon = Math.sin((ra2 - ra1) / 2)
    const r = Math.sqrt(dlat * dlat + Math.cos(de1) * Math.cos(de2) * dlon * dlon)
    return 2.0 * Math.asin(r)
  }

  /** returns angle value in radians */
  toRadian(): number {
    return Angle.Uas2R * this.uas
  }

  /** returns angle value in degrees */
  toDegree(): number {
    return Angle.Uas2D * this.uas
  }

  /** returns angle value in milliarcseconds */
  toMas(): number {
    return this.uas * 1e-3
  }

  /** returns angle value in arcseconds */
  toArcSec(): number {
    return 1e-6 * this.uas
  }

  /** creates a new Angle from the given value in degrees */
  static fromDegree(value: number): Angle {
    return new Angle((value * Angle.D2Uas))
  }

  /** creates a new Angle from the given value in arcminutes */
  static fromArcMinute(value: number): Angle {
    return new Angle((value * Angle.M2Uas))
  }

  /** creates a new Angle from the given value in arcsecs */
  static fromArcSec(value: number): Angle {
    return new Angle((value * Angle.S2Uas))
  }

  /** creates a new Angle from the given value in archours */
  static fromArcHour(value: number): Angle {
    return new Angle((value * Angle.H2Uas))
  }

  /** creates a new Angle from the given value in radians */
  static fromRadian(value: number): Angle {
    return new Angle((value * Angle.R2Uas))
  }

  /** creates a new Angle from the given value in milliarcseconds */
  static fromMas(value: number): Angle {
    return new Angle((value * 1000))
  }


  /** returns Angle with value normalized between 0 to 2*PI */
  normalizedRa(): Angle {
    var uas2 = this.uas
    while (uas2 < 0) uas2 += Angle.CIRCLE
    uas2 = uas2 % Angle.CIRCLE

    return new Angle(uas2)
  }

  /** returns random angle with value between 0 and 2*PI */
  static randomRa(): Angle {
    return new Angle(Angle.CIRCLE * Math.random())
  }

  /** returns random angle with value between -PI/2 and + PI/2 */
  static randomDe(): Angle {
    return new Angle(Angle.CIRCLE / 2 * Math.random() - Angle.CIRCLE / 4)
  }

  /** returns maximal angle from two options */
  static max(a1: Angle, a2: Angle): Angle {
    return (a1 > a2) ? a1 : a2
  }

  /** returns minimal angle from two options */
  static min(a1: Angle, a2: Angle): Angle {
    return (a1 < a2) ? a1 : a2
  }

  /**
   * Parse Declination from four values. It uses Big, so there are no rounding errors
   *
   * @param deSign   signum (ie + or -)
   * @param deDegree declination in degrees
   * @param deMin    remaining part in arcminutes
   * @param deSec    remaining part in arcseconds
   * @return declination in microarcseconds
   */
  static parseDe(deSign: string, deDegree: string, deMin: string, deSec: string | null): Angle {
    const sign: number = ("-" == deSign.trim()) ? -1 : 1
    const deg = Big(deDegree)
    if (deg.toNumber() < 0 || deg.toNumber() > 89) throw "Invalid deDegree: " + deg
    const min: Big = (deMin != null) ? Big(deMin) : Big(0)
    if (min.toNumber() < 0 || min.toNumber() >= 60) throw "Invalid deMin: " + min
    const sec: Big = (deSec != null) ? Big(deSec) : Big(0)
    if (sec.toNumber() < 0 || sec.toNumber() >= 60) throw "Invalid deSec: " + sec

    return new Angle(
      sign *
      (deg.mul(new Big(Angle.D2Uas)).toNumber() +
        min.mul(new Big(Angle.M2Uas)).toNumber() +
        sec.mul(new Big(Angle.S2Uas)).toNumber())
    )
  }

  /**
   * Tries to parse Angle from string.
   * It knows common formats used for Declination
   */
  static parseDeFromString(de: string): Angle {
    if (de == null) throw "de is null"
    const r1 = new RegExp("([+|-]?)([0-9]+)[" + Angle.DEGREE_SIGN + "d: ]{1,2}([0-9]+)[m': ]{1,2}([0-9\\.]+)[s\\\"]?")
    const ar1 = de.match(r1)
    if (ar1 && ar1.length == 5) {
      const [_, sign, d, m, s] = ar1
      return Angle.parseDe(sign, d, m, s)
    }
    const r2 = new RegExp("([+|-]?)([0-9]+)[" + Angle.DEGREE_SIGN + "d: ]{1,2}([0-9]+)[m']?")
    const ar2 = de.match(r2)
    if (ar2 && ar2.length == 4) {
      const [_, sign, d, m] = ar2
      return Angle.parseDe(sign, d, m, null)
    }
    throw "Could not parse DE: " + de
  }

  /**
   * parse Right ascencion  from triple values raHour raMin, raSec
   * This method uses big decimal, so there are no rounding errors
   *
   * @param raHour ra hours value as string
   * @param raMin ra minutes value as string
   * @param raSec ra seconds value as string
   * @return result in microarcseconds
   */
  static parseRa(raHour: string, raMin: string, raSec: string | null): Angle {
    const raHour2: Big = new Big(raHour)
    if (raHour2.toNumber() < 0 || raHour2.toNumber() > 23) throw "Invalid raHour: " + raHour2
    const raMin2: Big = (raMin != null) ? Big(raMin) : Big(0)
    if (raMin2.toNumber() < 0 || raMin2.toNumber() >= 60) throw "Invalid raMin: " + raMin2
    const raSec2: Big = (raSec != null) ? new Big(raSec) : Big(0)
    if (raSec2.toNumber() < 0 || raSec2.toNumber() >= 60) throw "Invalid raSec: " + raSec2

    return new Angle(
      raHour2.mul(new Big(Angle.H2Uas)).toNumber() +
      raMin2.mul(new Big(Angle.HMin2Uas)).toNumber() +
      raSec2.mul(new Big(Angle.HSec2Uas)).toNumber()
    )
  }

  /**
   * Tries to parse Angle from string.
   * It knows common formats used for Right ascencion (including hours)
   */
  static parseRaFromString(ra: string): Angle {
    if (ra == null) throw "ra is null"
    const r1 = new RegExp("([0-9]+)[h: ]{1,2}([0-9]+)[m: ]{1,2}([0-9\\.]+)[s]{0,1}")
    const ar1 = ra.match(r1)
    if (ar1 && ar1.length == 4) {
      const [_, h, m, s] = ar1
      return Angle.parseRa(h, m, s)
    }

    const r2 = new RegExp("([0-9]+)[h: ]{1,2}([0-9\\.]+)[m]?")
    const ar2 = ra.match(r2)
    if (ar2 && ar2.length == 3) {
      const [_, h, m] = ar2
      return Angle.parseRa(h, m, null)
    }

    const r3 = new RegExp("([0-9]+)d([0-9]+)m([0-9\\.]+)s")
    const ar3 = ra.match(r3)
    if (ar3 && ar3.length == 4) {
      const [_, d, m, s] = ar3
      // return Angle.toDouble(d).degree + m.toDouble.arcMinute + s.toDouble.arcSec
      return Angle.fromDegree(Number(d)).add(Angle.fromArcMinute(Number(m))).add(Angle.fromArcSec(Number(s)))
    }
    throw "Could not parse RA: " + ra
  }

  /**
   * Parses pair of RA and De coordinates.
   * This method should handle formats used in vizier.
   * An example:
   * The following writings are allowed:
   * <pre>
   * 20 54 05.689 +37 01 17.38
   * 10:12:45.3-45:17:50
   * 15h17m-11d10m
   * 15h17+89d15
   * 275d11m15.6954s+17d59m59.876s
   * 12.34567h-17.87654d
   * 350.123456d-17.33333d <=> 350.123456 -17.33333
   * </pre>
   */
  static parseRaDe(str: string): [Angle, Angle] {
    //20 54 05.689 +37 01 17.38
    //10:12:45.3-45:17:50
    const r1 = new RegExp("([0-9]{2})[ :]([0-9]{2})[ :]([0-9]{2}\\.[0-9]+)[ ]?(\\+|-)([0-9]{2})[ :]([0-9]{2})[ :]([0-9]{2}\\.?[0-9]*)")
    const ar1 = str.match(r1)
    if (ar1 && ar1.length == 8) {
      const [_, ah, am, as, ss, d, m, s] = ar1
      return [Angle.parseRa(ah, am, as), Angle.parseDe(ss, d, m, s)]
    }

    //15h17m-11d10m
    //15h17+89d15
    const r2 = new RegExp("([0-9]{2})h([0-9]{2})[m]?(\\+|-)([0-9]{2})d([0-9]{2})[m]?")
    const ar2 = str.match(r2)
    if (ar2 && ar2.length == 6) {
      const [_, ah, am, ss, d, m] = ar2
      return [Angle.parseRa(ah, am, null), Angle.parseDe(ss, d, m, null)]
    }

    //275d11m15.6954s+17d59m59.876s
    const r3 = new RegExp("([0-9]{2,3}d[0-9]{2}m[0-9]{2}\\.[0-9]+s)([\\+-][0-9]{2}d[0-9]{2}m[0-9]{2}\\.[0-9]+s)")
    const ar3 = str.match(r3)
    if (ar3 && ar3.length == 3) {
      const [_, ra, de] = ar3
      return [Angle.parseRaFromString(ra), Angle.parseDeFromString(de)]
    }

    //12.34567h-17.87654d
    const r4 = new RegExp("([0-9]{1,2}\\.[0-9]+)h([\\+-][0-9]{2}\\.[0-9]+)d")
    const ar4 = str.match(r4)
    if (ar4 && ar4.length == 3) {
      const [, ra, de] = ar4
      return [Angle.fromArcHour(Number(ra)), Angle.fromDegree(Number(de))]
    }

    //350.123456d-17.33333d <=> 350.123456 -17.33333
    const r5 = new RegExp("([0-9]{1,3}\\.?[0-9]*)[d]?[ ]?([\\+-]?[0-9]{1,2}\\.?[0-9]*)[d]?")
    const ar5 = str.match(r5)
    if (ar5 && ar5.length == 3) {
      const [_, ra, de] = ar5
      return [Angle.fromDegree(Number(ra)), Angle.fromDegree(Number(de))]
    }

    throw 'Unsupported Ra, Dec format: ' + str
  }

  /**
   * normalize RA into 0 - 2 * PI range
   */
  static normalizeRa(ra2: number): number {
    var ra = ra2
    while (ra < 0) ra += Math.PI * 2
    while (ra >= Math.PI * 2) ra -= Math.PI * 2
    return ra
  }

  static assertRa(ra: number) {
    if (ra < 0 || ra >= Math.PI * 2)
      throw "Invalid RA: " + ra
  }

  static assertDe(de: number) {
    if (de < -Angle.D2R * 90 || de > Angle.D2R * 90)
      throw "Invalid DE: " + de
  }
}
