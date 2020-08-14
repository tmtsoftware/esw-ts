export class ConfigData {
  private constructor(readonly blob: Blob) {}

  static fromString(str: string): ConfigData {
    return new ConfigData(new Blob([str]))
  }

  static from(blob: Blob): ConfigData {
    return new ConfigData(blob)
  }

  static fromFile(file: File): ConfigData {
    return new ConfigData(new Blob([file]))
  }

  async fileContentAsString(): Promise<string> {
    return await new Response(this.blob).text()
  }
}
