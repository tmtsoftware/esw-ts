import { GlobalConfig } from '../config/GlobalConfig'

export interface TMTTime {
  value: Date
}

export class UTCTime implements TMTTime {
  constructor(readonly value: Date) {}

  static now() {
    return new UTCTime(new Date())
  }

  make(value: Date) {
    return new UTCTime(value)
  }

  toTAI() {
    return TAITime.make(this.value)
  }

  toJSON() {
    return this.value.toISOString()
  }
}

export class TAITime implements TMTTime {
  constructor(readonly value: Date) {}
  static now() {
    return new TAITime(addOffset(new Date()))
  }

  static async make(value: Date) {
    return new TAITime(addOffset(value))
  }

  async toUTC() {
    return new UTCTime(minusOffset(this.value))
  }

  toJSON() {
    return this.value.toISOString()
  }
}

// TAI Time Helpers
const addOffset = (date: Date) => {
  const taiDate = new Date(date)
  taiDate.setSeconds(taiDate.getSeconds() + GlobalConfig.taiOffset)
  return taiDate
}

const minusOffset = (date: Date) => {
  const taiDate = new Date(date)
  taiDate.setSeconds(taiDate.getSeconds() - GlobalConfig.taiOffset)
  return taiDate
}
