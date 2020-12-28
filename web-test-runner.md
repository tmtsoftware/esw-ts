#Spike for web test runner

We have evaluated one unit test and one integration test with web test runner.
Refer folder lib/test/clients/web-test-runner.

##Unit Test
1. Needs sinon for mocking
1. import maps to mock es-modules
1. chai test runner

Run unit test using following command:
```bash
cd lib
npm run test:web:unit
```


## Inetgartion test
1. Run backend services using a separate script. Current approach will not work as it involves import from child_process
which is not available in web-test-runner. 
1. Idea is to run all backend services using shell script. Add command in package.json `startServices` to run that shell script.
`npm run startServices` will run as pre-requisite for `npm run test:web:unit`
Run integration test using following command:

```bash
./startServices.sh (This will start Gateway which is needed for the integration test)
cd lib
npm run test:web:unit
```

## websocket test

We need to evaluate whether mock-socket (third party lib for web-socket testing) works with web-test-runner.
This is low risk as applications won't need to deal with websockets. Websocket will be abstracted in esw-ts layer.


## Conclusion

Migrating esw-ts from jest to web-test-runner is big effort. This spike is to evaluate feasibility of using web test runner
for UI application. We have evaluated that writing unit test and integration test using web test runner is feasible.
Dealing with web socket in application won't be needed as it is abstracted in esw-ts layer. If websocket is required, 
it should be evaluated at that time.

