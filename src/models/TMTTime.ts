import { GlobalConfig } from '../config/GlobalConfig'

export interface TMTTime {
  value: Date
}

export class UTCTime implements TMTTime {
  constructor(readonly value: Date) {}

  static now() {
    return new UTCTime(new Date())
  }

  toTAI() {
    return new TAITime(this.value)
  }

  toJSON() {
    return this.value.toISOString()
  }
}

export class TAITime implements TMTTime {
  constructor(readonly value: Date) {}
  static now() {
    return new TAITime(this.addOffset(new Date()))
  }

  async toUTC() {
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
