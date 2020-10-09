export class EventName {
  constructor(readonly name: string) {}

  toJSON() {
    return this.name
  }
}
