# ESW-TS

## Project overview

* Typescript library clients - ./src/clients
* Aas Components - ./src/components
* Example App - /example/src
* UI Integration tests - /selenium-tests/src/test/scala/csw/aas/js/config

### Typescript library clients

This project provide following typescript clients for various TMT services, which can be found at location - ./src/clients.

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

See [here](http://tmtsoftware.github.io/esw-ts/0.3.0) for a detailed description of the ESW-TS.

### Example App

This app shows how to use typescript clients and Aas Components to create your web app. Refer following files for respective use cases.

* Typescript usage - e.g. example/src/components/config/context/ConfigServiceProvider.tsx
* Aas login/logout usage - e.g. example/src/components/NavComponent.tsx
* Auth Context usage - e.g. example/src/components/ExampleApp.tsx

### How to run example app

Step1: Run required CSW services

Step2: Build Library

Step3: Run Example App

#### Step1: Run required CSW services

Make sure you have following CSW services up and running:

* Location Service
* AAS Service
* Config Service

Note: Simple way to start all these services is to run `csw-services` using `coursier (aka cs)` from `csw` github repository.

Refer [here](http://tmtsoftware.github.io/csw/6.0.0-RC1/apps/cswservices.html) to learn how to start csw-services.

```bash
cs install csw-services
csw-services start -c -k -v $SHA_OF_CSW
```

#### Step2: Build ESW-TS Library

```bash
cd {ESW-TS-Repo}
```

##### Fetch dependencies

```bash
npm clean-install
```

##### Build library

```bash
npm run build
```

#### Step3: Run Example App

Start App -

```bash
cd example
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

### Running Tests

Note : If you have started CSW services to run the Example App, stop them before running the integration and End-to-End tests.

#### Run unit tests of library

```bash
cd {ESW-TS-Repo}
npm run test:unit
```

#### Run integration tests of library

```bash
cd {ESW-TS-Repo}
npm run test:integration
```

#### Running End-to-End tests

This module includes E2E test which demonstrate following flow which is all automated:

1. Start Location, Config and AAS CSW services
2. Build and Install `esw-ts`
3. Build and Start `config` example
4. Create configuration file

To run this test, execute

```bash
cd {ESW-TS-Repo}
sbt test OR sbt selenium-tests/test
```

### Generate typescript documentation

  `npm run build && npm run doc`

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

| esw-ts | esw    | csw    |
|--------|--------|--------|
| v1.0.0 | v1.0.0 | v6.0.0 |
| v1.0.0-RC1 | v1.0.0-RC1 | v6.0.0-RC1 |
| v0.4.1 | v0.5.1 | v5.0.1 |
| v0.4.1-RC1 | v0.5.1-RC1 | v5.0.1-RC1 |
| v0.4.0 | v0.5.0 | v5.0.0 |
| v0.4.0-RC2 | v0.5.0-RC2 | v5.0.0-RC2 |
| v0.4.0-RC1 | v0.5.0-RC1 | v5.0.0-RC1 |
| v0.3.0 | v0.4.0 | v4.0.1 |
| v0.3.0-RC1 | v0.4.0-RC1 | v4.0.1-RC1 |
| v0.2.0 | v0.3.0 | v4.0.0 |
| v0.2.0-RC2 | v0.3.0-RC2 | v4.0.0-RC2 |
| v0.2.0-RC1 | v0.3.0-RC1 | v4.0.0-RC1 |
| v0.2.0-M1 | v0.3.0-M1 | v4.0.0-M1 |
| v0.1.0 | v0.2.1 | v0.3.1 |
| v0.1.0-RC1 | v0.2.0-RC1 | v0.3.0-RC1 |
| v0.1.0-M1 | v0.2.0-M1 | v0.3.0-M1 |

## Public Release History

| Date       | Tag    | Source                                                            | Docs                                                             | Assets                                                                           |
|------------|--------|-------------------------------------------------------------------|------------------------------------------------------------------|----------------------------------------------------------------------------------|
| 2025-05-07 | v1.0.0 | [esw-ts-1.0.0](https://github.com/tmtsoftware/esw-ts/tree/v1.0.0) | [esw-ts-1.0.0 docs](https://tmtsoftware.github.io/esw-ts/1.0.0/) | [esw-ts-1.0.0 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v1.0.0) |
| 2023-04-12 | v0.4.1 | [esw-ts-0.4.1](https://github.com/tmtsoftware/esw-ts/tree/v0.4.1) | [esw-ts-0.4.1 docs](https://tmtsoftware.github.io/esw-ts/0.4.1/) | [esw-ts-0.4.1 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.4.1) |
| 2022-11-15 | v0.4.0 | [esw-ts-0.4.0](https://github.com/tmtsoftware/esw-ts/tree/v0.4.0) | [esw-ts-0.4.0 docs](https://tmtsoftware.github.io/esw-ts/0.4.0/) | [esw-ts-0.4.0 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.4.0) |
| 2022-02-09 | v0.3.0 | [esw-ts-0.3.0](https://github.com/tmtsoftware/esw-ts/tree/v0.3.0) | [esw-ts-0.3.0 docs](https://tmtsoftware.github.io/esw-ts/0.3.0/) | [esw-ts-0.3.0 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.3.0) |
| 2021-09-23 | v0.2.0 | [esw-ts-0.2.0](https://github.com/tmtsoftware/esw-ts/tree/v0.2.0) | [esw-ts-0.2.0 docs](https://tmtsoftware.github.io/esw-ts/0.2.0/) | [esw-ts-0.2.0 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.2.0) |
| 2021-02-01 | v0.1.0 | [esw-ts-0.1.0](https://github.com/tmtsoftware/esw-ts/tree/v0.1.0) | [esw-ts-0.1.0 docs](https://tmtsoftware.github.io/esw-ts/0.1.0/) | [esw-ts-0.1.0 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.1.0) |

## Pre-Release History

| Date       | Tag        | Source                                                                    | Docs                                                                     | Assets                                                                                   |
|------------|------------|---------------------------------------------------------------------------|--------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| 2025-04-14 | v1.0.0-RC1 | [esw-ts-1.0.0-RC1](https://github.com/tmtsoftware/esw-ts/tree/v1.0.0-RC1) | [esw-ts-1.0.0-RC1 docs](https://tmtsoftware.github.io/esw-ts/1.0.0-RC1/) | [esw-ts-1.0.0-RC1 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v1.0.0-RC1) |
| 2023-03-28 | v0.4.1-RC1 | [esw-ts-0.4.1-RC1](https://github.com/tmtsoftware/esw-ts/tree/v0.4.1-RC1) | [esw-ts-0.4.1-RC1 docs](https://tmtsoftware.github.io/esw-ts/0.4.1-RC1/) | [esw-ts-0.4.1-RC1 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.4.1-RC1) |
| 2022-10-10 | v0.4.0-RC2 | [esw-ts-0.4.0-RC2](https://github.com/tmtsoftware/esw-ts/tree/v0.4.0-RC2) | [esw-ts-0.4.0-RC2 docs](https://tmtsoftware.github.io/esw-ts/0.4.0-RC2/) | [esw-ts-0.4.0-RC2 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.4.0-RC2) |
| 2022-09-15 | v0.4.0-RC1 | [esw-ts-0.4.0-RC1](https://github.com/tmtsoftware/esw-ts/tree/v0.4.0-RC1) | [esw-ts-0.4.0-RC1 docs](https://tmtsoftware.github.io/esw-ts/0.4.0-RC1/) | [esw-ts-0.4.0-RC1 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.4.0-RC1) |
| 2022-02-01 | v0.3.0-RC1 | [esw-ts-0.3.0-RC1](https://github.com/tmtsoftware/esw-ts/tree/v0.3.0-RC1) | [esw-ts-0.3.0-RC1 docs](https://tmtsoftware.github.io/esw-ts/0.3.0-RC1/) | [esw-ts-0.3.0-RC1 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.3.0-RC1) |
| 2021-09-17 | v0.2.0-RC2 | [esw-ts-0.2.0-RC2](https://github.com/tmtsoftware/esw-ts/tree/v0.2.0-RC2) | [esw-ts-0.2.0-RC2 docs](https://tmtsoftware.github.io/esw-ts/0.2.0-RC2/) | [esw-ts-0.2.0-RC2 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.2.0-RC2) |
| 2021-08-23 | v0.2.0-RC1 | [esw-ts-0.2.0-RC1](https://github.com/tmtsoftware/esw-ts/tree/v0.2.0-RC1) | [esw-ts-0.2.0-RC1 docs](https://tmtsoftware.github.io/esw-ts/0.2.0-RC1/) | [esw-ts-0.2.0-RC1 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.2.0-RC1) |
| 2021-07-08 | v0.2.0-M1  | [esw-ts-0.2.0-M1](https://github.com/tmtsoftware/esw-ts/tree/v0.2.0-M1)   | [esw-ts-0.2.0-M1 docs](https://tmtsoftware.github.io/esw-ts/0.2.0-M1/)   | [esw-ts-0.2.0-M1 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.2.0-M1)   |
| 2020-11-11 | v0.1.0-RC1 | [esw-ts-0.1.0-RC1](https://github.com/tmtsoftware/esw-ts/tree/v0.1.0-RC1) | [esw-ts-0.1.0-RC1 docs](https://tmtsoftware.github.io/esw-ts/0.1.0-RC1/) | [esw-ts-0.1.0-RC1 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.1.0-RC1) |
| 2020-09-28 | v0.1.0-M1  | [esw-ts-0.1.0-M1](https://github.com/tmtsoftware/esw-ts/tree/v0.1.0-M1)   | [esw-ts-0.1.0-M1 docs](https://tmtsoftware.github.io/esw-ts/0.1.0-M1/)   | [esw-ts-0.1.0-M1 assets](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.1.0-M1)   |
