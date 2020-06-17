# csw-js

This project provides javascript and scalajs libraries for Authentication and Authorization Service (AAS) provided by CSW.
This will help build an browser based applications that enforce authentication & authorization policies for TMT.

The backbone of AAS is the [Keycloak](https://www.keycloak.org/documentation.html). It is where all client and server applications need to be registered and configured.
We are using javascript adapter called [keycloak-js](https://www.npmjs.com/package/keycloak-js) provided by Keycloak as a underlying mechanism to talk to keycloak.
As a consumer of this project, you need not to be worried about this. You will always be interacting with libraries provided by `csw` which are just wrapper over keycloak.


## Version compatibility
-----------------------------------------------

| csw-js | csw |
|--------|------|
| v2.0.0 | v2.0.0 |
| v2.0.0-RC3 | v2.0.0-RC3 |
| v2.0.0-RC2 | v2.0.0-RC2 |
| v2.0.0-RC1 | v2.0.0-RC1 |
| v1.1.0-RC1 | v1.0.0-RC1 |
| v1.0.0 | v1.0.0 |

This project includes following sub modules:
## lib
This module is published at npm registry as a javascript library which provides re-usable react components for authentication and authorization.
See [lib](https://tmtsoftware.github.io/csw-js/1.0.0/aas/csw-aas-js) docs for details.

## examples
This module has examples which shows usage `lib` react components for authentication and authorization.

### Prerequisite for running config-app
Make sure that you have following csw services up and running:

    1.1. Location Service

    1.2. AAS service

    1.3. Config Service

    Note: Simple way to start all these services is to run `csw-services.sh` script from `csw` github repository. Version of
    csw should be compatible with csw-js. Refer version compatibility section above.

### run config-app

1. Start csw-aas
    1.1 : cd `lib`
    1.2 : npm install
    1.3 : npm start
2. Start example config-app
    2.1 : cd `examples/config-app`
    2.2 : npm install
    2.3 : npm start

## Integration
This module includes E2E test which demonstrate following flow which is all automated:
1. Start Location, Config and AAS csw services
2. Build and Install `lib`
3. Build and Start `config` example (examples/config)
4. Create configuration file

To run this test, execute `sbt test` or `sbt integration/test` command

## Troubleshooting

If `sbt test` fails with an error stating that `http://localhost:3000` is not accessible, it may be this [issue](https://github.com/facebook/create-react-app/issues/2844).
The solution is to unset the `HOST` environment variable before running the test.

