/**
 * @category Config Service
 */
export class ConfigData {
  private constructor(private readonly content: Blob) {}

  static fromString(str: string): ConfigData {
    return new ConfigData(new Blob([str]))
  }

  static from(blob: Blob): ConfigData {
    return new ConfigData(blob)
  }

  static fromFile(file: File): ConfigData {
    return new ConfigData(new Blob([file]))
  }

  fileContentAsString(): Promise<string> {
    return new Response(this.content).text()
  }

  toBlob() {
    return this.content
  }
}
