/**
 * @category Sequence Manager Service
 */
export class ObsMode {
  constructor(readonly name: string) {}

  toJSON(): string {
    return this.name
  }
}
