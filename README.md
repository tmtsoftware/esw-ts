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
 * ClientRole
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
npm install
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
npm install
npm start
```

Open App in browser -

Go to http://localhost:3000 in Browser

To use config Admin functionality

 * Login - Enter username : `config-admin1` and password : `config-admin1`.
 * Go To Config App.
 * This user can create new Config from UI as well get or list config.

To use regular User functionality

 * Login - Enter username : `config-user1` and password : `config-user1`.
 * Go To Config App
 * This user can't create new Config from UI, but can get or list existing config


### Running Integration-UI test

This module includes E2E test which demonstrate following flow which is all automated:

1. Start Location, Config and AAS csw services
2. Build and Install `lib`
3. Build and Start `config` example
4. Create configuration file

To run this test, execute `sbt test` or `sbt integration-ui/test` command
