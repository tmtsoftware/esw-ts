# Steps to Add a public Api to a Service

1. Add the required Api in the particular service interface. (LocationService.ts)
1. Add the specific implementation for the respective Api. (LocationServiceImpl.ts)
1. Add contract test for request and response models. (response.models.int.test.ts)
1. Add integration test. (Location.int.test.ts)
1. Add public facing models like Location in respective index.ts. (location/index.ts)
1. Add unit test for post/websocket respectively . (LocationPostService.unit.test.ts/LocationWsService.unit.test.ts)
1. Add example in the documentation (LocationExample.ts)
1. Add api doc around the added Api.
1. Add typedoc category to the added models (if possible).
1. Add CHANGELOG entry (imp).
