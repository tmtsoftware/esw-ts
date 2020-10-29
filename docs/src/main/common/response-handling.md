# Response Handling

This sections helps to understand how responses have been modeled in TMT architecture and, also how they can be handled at UI application side.

If you have not gone the Services Section, We recommend you to check @ref[Services](../services/index.md) out first.
Assuming you have read through the Services section and what all types of response can be returned by the Service of your current interest.

The Response types are Union types/ADT's. All of them are tagged by `_type` field, this field provides information at compile time to developers of all possible response variation at runtime for the current response.

Typescript
:   @@snip [Response](../../../../example/src/documentation/common/ErrorHandlingExample.ts) { #response-handling }

@@@note { title="Normal response" }
All non-ADT or Normal response types (for ex: `Done`, `LogMetadata`, etc.) does not require extra effort of handling it with switch cases. Those models do not have any discriminatory field like `_type` and there will always be one variation, and the information about all fields inside model will be statically known.
@@@

## Asynchronous programming

You may have notice that we have used `async-await` syntax in all examples provided in the different pages of this documentation.
However, one may still want to write using combinators provided by Promise, since most of the ESW-TS service methods are Promise based.

[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is provided by Javascript language,Using which we can write asynchronous programs in a more manageable way.
Using Async/Await syntax, a promise-based asynchronous code can be written in a synchronous format which saves a lot of time and code becomes scalable.
We recommend using async-await syntax for writing asynchronous code as it increases readability of the code.
When using `callbacks` or `combinators` on top of Promise, issues like `callback hell` emerges over time.

For instance, following example showcases two scenarios without **async-await** syntax and how it would look like

1. Sending submit commands using CommandService in **sequence**
1. Sending submit commands using CommandService in **parallel**

Typescript
:   @@snip [Response](../../../../example/src/documentation/common/Promises.ts) { #promises }


The following example showcases the same above scenarios with **async-await** syntax.

1. Sending multiple submit commands with async-await syntax

Typescript
:   @@snip [Response](../../../../example/src/documentation/common/Promises.ts) { #async-await }

@@@note{title="async-await"}
We strongly recommend to use async-await while writing asynchronous code in Javascript.
@@@
