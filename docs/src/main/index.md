# TMT JavaScript/Typescript Library

## ESW-TS

Javascript/Typescript library for building web applications inside TMT observatory.

## Motivation behind ESW-TS

TMT observatory will be using many web applications to observe and manage the observatory instruments.
Web applications will require backend interface information for communication.
These services provided by the ESW-TS library will help in encapsulating that internal information therefore, making it easier for UI developers to develop web app without having to worry about programming around the TMT backend.

## How to use ESW-TS

For using ESW-TS library, you will need to have some kind of model which determines the flow of creating the web application in the first place and which TMT backend services that application will be using in its lifetime.

1. Define Application features / components.
2. Depending on those features, decide which services will be required to build them from the available @ref:[services](services/index.md).
3. Develop & Build application components on top of the service.

While using any of the service, you will be required to use some internal models for making API request and those domain models like (Prefix, ComponentId, etc) are provided in the ESW-TS to ease the development of web application.

## Library Contents
@@toc { depth=3 }
@@@ index

 - @ref:[Getting Started](common/getting-started.md)
 - @ref:[Params](params/index.md)
 - @ref:[AAS](aas/csw-aas-js.md)
 - @ref:[Response handling](common/response-handling.md)
 - @ref:[Error handling](common/error-handling.md)
 - @ref:[Services](services/index.md)
 - @ref:[Technical design documentation](technical/index.md)
 - @ref:[Type Definitions](common/ts-docs.md)

@@@
