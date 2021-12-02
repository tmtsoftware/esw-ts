/**
 * @category Sequence Manager Service
 */
export class Variation {
  constructor(readonly name: string) {}

  toJSON(): string {
    return this.name
  }
}
