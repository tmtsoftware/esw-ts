
#Error Handling

Most of the errors received from backend will be contained a defined shape ( @extref:[Service error](ts-docs:classes/models.serviceerror.html)) that helps developer to build application based on the defined fields rather than depending on base browser's Error type.
Service's api calls will be returning promise based results and network calls may go wrong for many reasons like server not found, some invalid configuration while setting up application, etc. all these cases are supposed to be handled at some places.
For ex: some errors can be silently logged and redirect user to error page.
At application level, error/exceptions must be handled in application code because that will help user to make further decisions.
In TMT Arhcitecture, @extref:[Service error](ts-docs:classes/models.serviceerror.html) captures all/most of the application level errors/exceptions.

To read more on exception handling, refer this [document](https://www.sitepoint.com/exceptional-exception-handling-in-javascript/) which gives detailed explanation.

## Error handling pattern

The following examples shows how to call AgentService api's and handle the response `SpawnResponse` and `KillResponse`.

This example also illustrates error handling of service specific exception `AgentNotFoundException` along with the generic errors like `TransportError` and `ArithmeticException` will look like.

@@@ warning {title="Exploiting try-catch is an anti-pattern"}
The example uses `try-catch` to handle errors and exceptions. Generally those errors/exceptions are handled at UI framework level on boundaries of service calls.
This example will be updated once we have frontend framework setup in place.
@@@

A function whose responsibility is to handle errors & exceptions

Typescript
:   @@snip [Response](../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #handle-error }

Example for spawnSequenceManager api with error handling looks like following:

Typescript
:   @@snip [Response](../../../../example/src/documentation/agent/AgentServiceExamples.ts) { #response-handling-spawn }

