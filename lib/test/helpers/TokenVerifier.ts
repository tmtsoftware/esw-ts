export const getMockedToken = (postMockFn: jest.Mock, mockedCallToLook = 1) =>
  postMockFn.mock.calls[mockedCallToLook][0].headers
    ? postMockFn.mock.calls[mockedCallToLook][0].headers.get('Authorization')
    : ''
