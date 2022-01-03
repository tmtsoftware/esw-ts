# Error Handling in ESW-TS

Errors/Exceptions must be handled in application code because that will help user to make further decisions for controlled user interactions with the UI.

To read more on exception handling, refer this [document](https://www.sitepoint.com/exceptional-exception-handling-in-javascript/) which gives detailed explanation.

## Error Types

### Service Error

In TMT Architecture, @extref:[Service error](ts-docs:classes/models.ServiceError.html) captures all/most of the Service/Network level errors and exceptions.
A runtime error which gets thrown **after** making Service's API and gets caught in the Service call's scaffolding snippet falls into this category.

For example:

Using `CommandService` to submit a command for a non-existing component will result into `LocationNotFound`.

`LocationNotFoundException` is a Service Error, and it would contain following fields:

- **errorType**: LocationNotFound
- **message**: 'Could not resolve location matching connection: $non_existent_component_connection'
- **status**: 500
- **statusText**: Internal Server error

Type definition for Service Error can be found @extref:[here](ts-docs:classes/models.ServiceError.html)

### Client Side Error

Any runtime error which gets thrown **before** making Service's API call falls into this category. The Errors and Exception caught at validation or at data creation time will be thrown before making API calls.

For Example:
@extref:[Prefix](ts-docs:classes/models.Prefix.html) has a validation that it cannot have `-` or space in the componentName field.

Following snippet will result into runtime error :
it is a native browser's Error object with the message field and stacktrace. `message` field will contain the reason for which the validation failed.

Typescript
:   @@snip [Response](../../../../example/src/documentation/common/ErrorHandlingExample.ts) { #client-side-error }

For the given case it will have the following information.

message: `Requirement failed - component name filter-wheel has '-'`

## Error Handling pattern

The following examples shows how to call Agent Service methods and handle the response `SpawnResponse` and `KillResponse`.

This example also illustrates error handling of service specific exception `AgentNotFoundException` along with the generic errors like `TransportError` and `ArithmeticException`.

@@@ warning {title="Exploiting try-catch is an anti-pattern"}
The example uses `try-catch` to handle errors and exceptions. Generally those errors/exceptions are handled at UI framework level on boundaries of service calls.
This example will be updated once we have frontend framework setup in place.
@@@

A function whose responsibility is to handle errors and exceptions:

Typescript
:   @@snip [Response](../../../../example/src/documentation/common/ErrorHandlingExample.ts) { #handle-error }

Example for `spawnSequenceManager` method call with error handling looks like following:

Typescript
:   @@snip [Response](../../../../example/src/documentation/common/ErrorHandlingExample.ts) { #response-handling-spawn }
