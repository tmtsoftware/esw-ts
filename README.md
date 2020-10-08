# ESW-TS

### Project overview :

 * Typescript library clients - /lib/src/clients
 * Aas Components - /lib/src/components
 * Example App - /example/src
 * UI Integration tests - /integration-ui/src/test/scala/csw/aas/js/config

### Typescript library clients
This project provide following typescript clients for various TMT services, which can be found at location - /lib/src/clients.

 * Command
 * Sequencer
 * Event
 * Alarm
 * Config
 * Location

### Aas Components in React
 * CheckLogin
 * RealmRole
 * AuthContextProvider
 * Login
 * Logout

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

Make sure you have following csw services up and running:

  * Location Service
  * AAS service
  * Config Service

    Note: Simple way to start all these services is to run `csw-services.sh` script from `csw` github repository.

```
cd {csw_repo}/scripts
sh csw-services.sh start -k -c -v $SHA_OF_CSW
```

#### Step2: Build ESW-TS Library

#####
```
cd {ESW-TS-Repo}/lib
```
##### Fetch dependencies

```
npm clean-install
```

##### Build library

```
npm run build
```

##### Run unit tests of library

```
npm run test:unit
```

##### Run integration tests of library

```
npm run test:integration
```

### Step3: Run Example App

Start App -

```
cd ../example
npm clean-install
npm start
```

Open App in browser -

Go to http://localhost:3000 in Browser

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

1. Start Location, Config and AAS csw services
2. Build and Install `lib`
3. Build and Start `config` example
4. Create configuration file

To run this test, execute `sbt test` or `sbt integration-ui/test` command

### Generate paradox documentation

To generate paradox documentation for the esw-ts, run the following command

  `sbt makeSite`

Above command will generate the paradox site at `target/site/esw-ts/0.1.0-SNAPSHOT` location.
open `index.html` file in browser to view paradox documentation.
