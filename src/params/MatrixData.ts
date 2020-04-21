export class MatrixData<T> {
  constructor(readonly data: T[][]) {}

  toJSON() {
    return this.data
  }

  public static fromArrays = <T>(...args: T[][]): MatrixData<T> => {
    const values: T[][] = Array(args.length)
    args.map((x: T[], index: number) => (values[index] = x))
    return new MatrixData(values)
  }
}
