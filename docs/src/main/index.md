# TMT JavaScript/Typescript Library

`esw-ts` provides following JavaScript adapters and typescript definitions for esw and csw services.

##Getting Started
`node` is mandatory to be installed on machine for using esw-ts.

`esw-ts` library is available on npm registry.

 It is recommended to use giter8 template [`esw-ui-template.g8`](https://github.com/tmtsoftware/esw-ui-template.g8)  to get started with building web application.

 `esw-ts` is comes pre-packaged as a dependency in the template. You can skip the installation step and make use of the services directly in the application. [Jump to library features](#features)


### Installation

  To install the latest version node. visit this node's official [website](https://nodejs.org/).

  To install the latest version of esw-ts from npm

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
- @ref:[Config Service](clients/config/config-service.md)
- @ref:[Event Service](clients/event/event-service.md)
- @ref:[Location Service](clients/location/location-service.md)
- @ref:[Sequencer Service](clients/sequencer/sequencer-service.md)

#### Params
- @ref:[Keys and Parameters](params/keys-and-parameters.md)
