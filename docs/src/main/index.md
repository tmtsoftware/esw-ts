# TMT JavaScript/Typescript Library

`esw-ts` provides following JavaScript adapters and typescript definitions for esw and csw services.

##Getting Started
`node` is mandatory to be installed on machine for using esw-ts.

`esw-ts` library is available on npm registry.

 It is recommended to use giter8 template [`esw-ui-template.g8`](https://github.com/tmtsoftware/esw-ui-template.g8)  to get started with building web application.

 `esw-ts` comes pre-packaged as a dependency in the template. You can skip the next step and make use of the services directly in the application. [Jump to library features](#features)


### Dependencies

  To install the latest version node. visit this node's official [website](https://nodejs.org/).

  To use the `esw-ts` adapter, run this command from root folder of your application where `package.json` exists:

    npm install esw-ts

  To install a specific version

    npm install esw-ts@{version}

## Features

#### AAS (Authentication and Authorization Support for web application)

- @ref:[AAS Javascript Adapter (aas)](aas/csw-aas-js.md)

#### Clients:

- @ref:[Admin Client](clients/admin/admin-service.md)
- @ref:[Agent Client](clients/agent/agent-service.md)
- @ref:[Command Service](clients/command/command-service.md)
- @ref:[Sequencer Service](clients/sequencer/sequencer-service.md)

## Example Usage

### 1. How to create a client react component in an empty application
In this example, we will be showing how to make use of command service client in a custom react component which we will be writing now.

Assuming, you will be creating a react application from the recommended giter8 [template](https://github.com/tmtsoftware/esw-ui-template.g8).

First, we create a empty web application using template's current tag : v0.1.0-M1

  `g8 tmtsoftware/esw-ui-template.g8 --tag v0.1.0-M1 --project_name=demo`

Install dependencies

  `cd demo && npm install`

let's create a react component `CommandClient.tsx` inside Command folder.

Components folder structure would look like this.

Folder structure
:   @@snip [folder](../../../example/src/documentation/command/CommandExamples.ts) { #folder-structure }


Now let's plug this newly created component into our app as a children component of Landing.tsx.

Update `Landing.tsx` in the following way

Typescript(.tsx)
:   @@snip [git-diff](../../../example/src/documentation/command/CommandExamples.tsx) { #landing-update }

We added `AuthContextProvider` which provides the auth context. this is coming from `esw-ts` package as well.
All the components which are wrapped by `AuthContextProvider` will be injected with Auth Context(`TMT_AUTH`).

As CommandService api's in backend are auth protected. we will be using token provided by this Auth Context to make api calls.

Documentation on how to fetch access token could be found @ref:[here](aas/csw-aas-js.md)


