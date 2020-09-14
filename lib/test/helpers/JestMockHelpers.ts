type AnyFunc = (...args: any[]) => any
type FunctionType<T> = T extends infer R ? R : T

type MethodType<T, M extends keyof T> = T[M] extends AnyFunc ? T[M] : never
export type MockOf<T> = { [K in keyof Required<T>]: jest.MockedFunction<MethodType<T, K>> }

export const verify = <T extends AnyFunc>(func: jest.MockedFunction<T>) => {
  return {
    toBeCalledWith: (...args: jest.ArgsType<T>) => expect(func).toBeCalledWith(...args)
  }
}

export function mockFunc<T extends AnyFunc>(
  fn?: FunctionType<T>
): jest.MockedFunction<FunctionType<T>>

export function mockFunc<T extends AnyFunc>(): jest.MockedFunction<FunctionType<T>> {
  return jest.fn() as jest.MockedFunction<FunctionType<T>>
}

export const mockClass = <T>(clazz: (new (...args: any[]) => T) & { prototype: T }): MockOf<T> => {
  const ownPropertyNames = Object.getOwnPropertyNames(clazz.prototype).filter(
    (k) => k !== 'constructor'
  ) as Array<keyof T>

  return ownPropertyNames.reduce((obj: any, pName) => {
    obj[pName] = mockFunc<MethodType<T, typeof pName>>()
    return obj
  }, {})
}
