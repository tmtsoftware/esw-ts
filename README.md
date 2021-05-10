# ESW-TS

## Project overview

* Typescript library clients - /lib/src/clients
* Aas Components - /lib/src/components
* Example App - /example/src
* UI Integration tests - /integration-ui/src/test/scala/csw/aas/js/config

### Typescript library clients

This project provide following typescript clients for various TMT services, which can be found at location - /lib/src/clients.

* Admin
* Agent
* Alarm
* Command
* Config
* Event
* Gateway
* Location
* Sequencer
* Sequence Manager

### Aas Components in React

* CheckLogin
* RealmRole
* AuthContextProvider
* Login
* Logout

See [here](http://tmtsoftware.github.io/esw-ts/0.1.0) for a detailed description of the ESW-TS.

### Example App

This app shows how to use typescript clients and Aas Components to create your web app. Refer following files for respective use cases.

* Typescript usage - e.g. example/src/components/config/context/ConfigServiceProvider.tsx
* Aas login/logout usage - e.g. example/src/components/NavComponent.tsx
* Auth Context usage - e.g. example/src/components/ExampleApp.tsx

### How to run example app

Step1: Run required backend services

Step2: Build Library

Step3: Run Example App

#### Step1: Run required backend services

Make sure you have following CSW services up and running:

* Location Service
* AAS Service
* Config Service

Note: Simple way to start all these services is to run `csw-services` using `coursier (aka cs)` from `csw` github repository.

Refer [here](http://tmtsoftware.github.io/csw/3.0.1/apps/cswservices.html) to learn how to start csw-services.

```bash
cs install csw-services:<version | SHA>
csw-services start -c -k -v $SHA_OF_CSW
```

#### Step2: Build ESW-TS Library

```bash
cd {ESW-TS-Repo}/lib
```

##### Fetch dependencies

```bash
npm clean-install
```

##### Build library

```bash
npm run build
```

##### Run unit tests of library

```bash
npm run test:unit
```

##### Run integration tests of library

```bash
npm run test:integration
```

#### Step3: Run Example App

Start App -

```bash
cd ../example
npm clean-install
npm start
```

Open App in the browser -

Go to [localhost:3000](http://localhost:3000) in Browser

Login with appropriate user as listed below to access functionality of each tab.

| Example app tab  | requirement                               | Login username  |  Password        |
| ---------------  | ---------------------------------------   | ------          |  ------          |
| Public           | -does not requires login                  |                 |                  |
| Secured          | -requires login                           | any user below  |  any user below  |
| Config App(List) | -does not requires login                  |                 |                  |
| Config App(Get)  | -does not requires login                  |                 |                  |
| Config App(Create)| -requires login with role `config-admin` | config-admin1   | config-admin1    |
| Admin App        | -requires login with `example-admin-role` | dummy-user      | dummy-user       |
| User App         | -requires login with `person-role`        | dummy-user      | dummy-user       |

### Running Integration-UI test

This module includes E2E test which demonstrate following flow which is all automated:

1. Start Location, Config and AAS CSW services
2. Build and Install `lib`
3. Build and Start `config` example
4. Create configuration file

To run this test, execute `sbt test` or `sbt integration-ui/test` command

### Generate typescript documentation

  `cd lib && npm run build && npm run doc`

### Generate paradox documentation

To generate paradox documentation for the ESW-TS, run the following command

  `sbt clean makeSite openSite`

Above command will generate and open the paradox site in browser.

### Push paradox documentation

To push documentation on github pages, follow the steps:

1. Open sbt shell.

2. Clean and generate the site locally.

    `sbt:esw-ts> clean;`

3. Push the changes to github pages.

    `sbt:esw-ts> ghpagesPushSite`

It will ask for github credential. It takes few minutes to reflect on the github pages. This will push documentation with version tag `0.1.0-SNAPSHOT`.

### Release paradox documentation
Document automatically gets released using release pipeline.

## Version compatibility

| esw-ts | esw | csw |
|--------|-----|-----|
| v0.1.0 | v0.2.1 | v0.3.1 |
| v0.1.0-RC1 | v0.2.0-RC1 | v0.3.0-RC1 |
| v0.1.0-M1 | v0.2.0-M1 | v0.3.0-M1 |

## Public Release History

| Date | Tag | Source | Docs | Assets |
|-----|-----|-----|-----|-----|
| 2021-02-01 | v0.1.0 | [esw-0.1.0](https://github.com/tmtsoftware/esw-ts/tree/v0.1.0) | [esw-0.1.0 docs](https://tmtsoftware.github.io/esw-ts/0.1.0/) | [esw-0.1.0 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.1.0) |

## Pre-Release History

| Date | Tag | Source | Docs | Assets |
|-----|-----|-----|-----|-----|
| 2020-11-11 | v0.1.0-RC1 | [esw-0.1.0-RC1](https://github.com/tmtsoftware/esw-ts/tree/v0.1.0-RC1) | [esw-0.1.0-RC1 docs](https://tmtsoftware.github.io/esw-ts/0.1.0-RC1/) | [esw-0.1.0-RC1 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.1.0-RC1) |
| 2020-09-28 | v0.1.0-M1 | [esw-0.1.0-M1](https://github.com/tmtsoftware/esw-ts/tree/v0.1.0-M1) | [esw-0.1.0-M1 docs](https://tmtsoftware.github.io/esw-ts/0.1.0-M1/) | [esw-0.1.0-M1 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.1.0-M1) |
