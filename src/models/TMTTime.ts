import { GlobalConfig } from '../config/GlobalConfig'

/**
 * Interface representing TMT Time model
 * @class
 * @Category Params
 */
export interface TMTTime {
  value: Date
}

/**
 * Class representing UTC Time model
 * @class
 * @Category Params
 */
export class UTCTime implements TMTTime {
  constructor(readonly value: Date) {}

  static now() {
    return new UTCTime(new Date())
  }

  toTAI() {
    return new TAITime(this.addOffset(this.value))
  }

  private addOffset(date: Date) {
    const taiDate = new Date(date)
    taiDate.setSeconds(taiDate.getSeconds() + GlobalConfig.taiOffset)
    return taiDate
  }

  toJSON() {
    return this.value.toISOString()
  }
}

/**
 * Class representing TAI Time model
 * @class
 * @Category Params
 */
export class TAITime implements TMTTime {
  constructor(readonly value: Date) {}
  static now() {
    return new TAITime(this.addOffset(new Date()))
  }

  toUTC() {
    return new UTCTime(this.minusOffset(this.value))
  }

  toJSON() {
    return this.value.toISOString()
  }

  private static addOffset(date: Date) {
    const taiDate = new Date(date)
    taiDate.setSeconds(taiDate.getSeconds() + GlobalConfig.taiOffset)
    return taiDate
  }

  private minusOffset(date: Date) {
    const taiDate = new Date(date)
    taiDate.setSeconds(taiDate.getSeconds() - GlobalConfig.taiOffset)
    return taiDate
  }
}
