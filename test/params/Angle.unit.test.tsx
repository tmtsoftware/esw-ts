// noinspection PointlessArithmeticExpressionJS

import {Angle} from "../../src/models/params/Angle";
import {expect} from 'chai'

describe("Basic parsing of radec as strings", () => {

  it("should allow basic parsing using Angle ", () => {
    expect([Angle.parseRaFromString("20 54 05.689"), Angle.parseDeFromString("+37 01 17.38")])
      .to.deep.equal(Angle.parseRaDe("20 54 05.689 +37 01 17.38"))

    expect([Angle.parseRaFromString("10:12:45.3"), Angle.parseDeFromString("-45:17:50")])
      .to.deep.equal(Angle.parseRaDe("10:12:45.3-45:17:50"))

    expect([Angle.parseRaFromString("15h17m"), Angle.parseDeFromString("-11d10m")])
      .to.deep.equal(
      Angle.parseRaDe("15h17m-11d10m"))

    expect([Angle.parseRaFromString("275d11m15.6954s"), Angle.parseDeFromString("+17d59m59.876s")])
      .to.deep.equal(Angle.parseRaDe("275d11m15.6954s+17d59m59.876s"))
  })

  it("should allow using implicits", () => {
    expect([Angle.fromArcHour(12.34567), Angle.fromDegree(-17.87654)])
      .to.deep.equal(Angle.parseRaDe("12.34567h-17.87654d"))

    expect([Angle.fromDegree(350.123456), Angle.fromDegree(-17.33333)])
      .to.deep.equal(Angle.parseRaDe("350.123456d-17.33333d"))

    expect([Angle.fromDegree(350.123456), Angle.fromDegree(-17.33333)])
      .to.deep.equal(Angle.parseRaDe("350.123456 -17.33333"))
  })
})

describe("Test parsing", () => {

  it("should allow testing of parser to microarcsecs -1", () => {
    expect(Angle
      .parseRa("1", "2", "3").uas)
      .to.equal(1 * 15 * 60 * 60 * 1000 * 1000 + 2 * 15 * 60 * 1000 * 1000 + 3 * 15 * 1000 * 1000)
    expect(Angle
      .parseDe("+", "1", "2", "3").uas)
      .to.equal(1 * 60 * 60 * 1000 * 1000 + 2 * 60 * 1000 * 1000 + 3 * 1000 * 1000)
  })

  it("should allow parsing to microsarcsecs -2", () => {
    expect(Angle.parseRaFromString("1h2m3s").uas)
      .to.equal(1 * 15 * 60 * 60 * 1000 * 1000 + 2 * 15 * 60 * 1000 * 1000 + 3 * 15 * 1000 * 1000)
    expect(Angle.parseRaFromString("02 51.2").uas)
      .to.equal(2 * 15 * 60 * 60 * 1000 * 1000 + 512 * 15 * 60 * 1000 * 100)
    expect(Angle.parseDeFromString("+1d2'3\"").uas)
      .to.equal(1 * 60 * 60 * 1000 * 1000 + 2 * 60 * 1000 * 1000 + 3 * 1000 * 1000)
    expect(Angle.parseDeFromString("-1d2'3\"").uas)
      .to.equal(-(1 * 60 * 60 * 1000 * 1000 + 2 * 60 * 1000 * 1000 + 3 * 1000 * 1000))
    expect(Angle.parseDeFromString("+13 12").uas)
      .to.equal(13 * 60 * 60 * 1000 * 1000 + 12 * 60 * 1000 * 1000)
  })
})

describe("conversion tests", () => {
  it("should allow conversions", () => {
    expect(Angle.H2D * 1).to.equal(15.0)
    expect(Angle.D2H * 1).to.equal(1.0 / 15.0)
    expect(Angle.D2M).to.equal(60)
    expect(Angle.M2D).to.equal(1.0 / 60.0)
    expect(Angle.D2S).to.equal(3600)
    expect(Angle.S2D).to.equal(1.0 / 3600.0)
    expect(Angle.Mas2R).to.equal(Angle.D2R / 3600000.0)
    expect(Angle.R2Mas).to.equal(1.0 / Angle.Mas2R)
  })
})

describe("Should allow distance calculation", () => {

  it("Should do distance", () => {
    expect(Angle.distance(Angle.D2R * 1, 0, Angle.D2R * 2, 0))
      .to.equal(Angle.D2R * 1)
    expect(Angle.distance(0, Angle.D2R * 90, Angle.D2R * 180, -(Angle.D2R * 90)))
      .to.equal(Angle.D2R * 180)
  })
})

describe("Positions to String", () => {

  it("should convert RA to string", () => {
    expect("11h").to.equal(Angle.raToString(Angle.H2R * 11))
    expect("11h 12m").to.equal(Angle.raToString(Angle.H2R * 11 + Angle.H2R * 12 / 60.0))
    expect("11h 12m 13s").to.equal(Angle.raToString(Angle.H2R * 11 + Angle.H2R * 12 / 60.0 + Angle.H2R * 13 / 3600.0))
    expect("11h 12m 13.3s").to.equal(Angle.raToString(Angle.H2R * 11 + Angle.H2R * 12 / 60.0 + Angle.H2R * 13.3 / 3600.0))
  })

  it("should convert Dec to string", () => {
    expect("11" + Angle.DEGREE_SIGN).to.equal(Angle.deToString(Angle.D2R * 11))
    expect("11" + Angle.DEGREE_SIGN + "12'").to.equal(Angle.deToString(Angle.D2R * 11 + Angle.M2R * 12))
    expect("11" + Angle.DEGREE_SIGN + "12'13\"").to.equal(Angle.deToString(Angle.D2R * 11 + Angle.M2R * 12 + Angle.S2R * 13))
    expect("11" + Angle.DEGREE_SIGN + "12'13.3\"").to.equal(Angle.deToString(Angle.D2R * 11 + Angle.M2R * 12 + Angle.S2R * 13.3))
    expect("-11" + Angle.DEGREE_SIGN + "12'").to.equal(Angle.deToString(-(Angle.D2R * 11 + Angle.M2R * 12)))
  })
})
