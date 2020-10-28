# Response Handling
This sections helps to understand how responses have been modeled in TMT architecture and, also how they can be handled at UI application side.

If you have not gone the Services Section, We Recommend you to check @ref[Services](../services/index.md) out first.
Assuming you have read through the Services section and what all types of response can be returned by the Service of your current interest.

The Response types are Union types/ADT's. All of them are tagged by `_type` field, which provides information at compile time to developers of all possible response variation at runtime for the current response.

For example :
Command Service's `submit` method's response type is @extref:[SubmitResponse](ts-docs:modules/models.html#submitresponse) which can be one of 6 different responses.

Depending on how you would want to use `SubmitResponse`, you can handle all variations or few of the responses.

2 ways of response handling have been showcase here:

Typescript
:   @@snip [Response](../../../../example/src/documentation/common/ErrorHandlingExample.ts) { #response-handling }


@@@note
All non-ADT or Normal response types (for ex: `Done`, `LogMetadata`, etc.) does not require extra effort of handling it with switch cases. Those models do not have any discriminatory field like `_type` and there will always be one variation, and the information about all fields inside model will be statically known.
@@@
