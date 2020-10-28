# csw-aas-js - JavaScript adapter

csw-aas-js is a npm package which exposes react components to enable authentication and authorization.
csw-aas-js is built with TypeScript on top of [keycloak-js](https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter)
which is JavaScript adapter provided by keycloak.

## csw-aas-js Implementation

Core implementation of csw-aas-js uses

- [keycloak-js](https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter) - keycloak JavaScript adapter
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Typescript](https://www.typescriptlang.org/) - Types superset of JavaScript which compiles to JavaScript
- @extref[csw-location-service](csw:services/location) - resolve keycloak using Location Service HTTP endpoint

## Project setup

`csw-aas-js` is a library written in [Typescript](https://www.typescriptlang.org/).

`tsc` is a command line compiler of Typescript which compiles TypeScript files to JavaScript. `tsc` picks up configurations from `tsconfig.json` file which
is at root level of project. `tsconfig.json` allows to configure multiple compiler options. Please refer
[this](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for details of compiler options.

The `npm run build` command will run `tsc` which will produce outputs (.js and .d.ts).

The `.d.ts` files are the type declaration files which provide typings for react components exported by library. `package.json` points to `index.ts` as an entry point for library
and `index.d.ts` as types. This will help `csw-aas-js` library users to know type signatures of components. e.g. type
signature for react component props, API signatures.

`csw-aas-js` can be seamlessly consumed by applications written in ES6 or TypeScript.

## Keycloak

In order for web application utilize keycloak following steps are needed:

- Registered web application as a public keycloak client
Please refer to [keycloak documentation](https://www.keycloak.org/docs/latest/getting_started/index.html)
for details.

- Create new Keycloak client instance
This instantiation expects config which includes keycloak server URL and some application
specific config like `realm` and `clientId`. csw-aas-js uses CSW Location Service to resolve keycloak server.

Javascript
:   @@snip [App-config](../../../../example/src/config/AppConfig.ts) { #app-config }

- Initialize JavaScript adapter
To call secure end point, web application first needs to be authenticated using keycloak server. There are two options to make this adapter automatically authenticate - `login-required` and `check-sso`.
`login-required` will automatically authenticate if the user is already logged-in, otherwise it will display keycloak login page.
`check-sso` will only authenticate if the user is already logged-in. If the user is not logged-in the browser will be redirected back to
the application and remain unauthenticated.

csw-aas-js use `check-sso` to instantiate keycloak. It shows secure components if user is already logged in.
If user is not authenticated then Login component gets rendered. If user clicks on login button it instantiates keyclock use `login-required`. This redirects
user to keycloak login page. As access token has very short life span, at time of keycloak instantiation csw-aas-js also adds hooks to refresh
token. This gives seamless user experience as user will not have to login again.

Keycloak adapter supports three authorization flows e.g. authorization code flow, implicit flow and hybrid flow.
csw-aas-js has chosen hybrid flow as it has better performance than authorization code flow and unlike implicit flow,
hybrid flow makes refresh token available to application. For more information please refer [keyclok documentaion for authorization flows](https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_implicit_flow)

## Working of csw-aas-js

When user opens Web application in the browser:

- `AuthContextProvider` component gets mounted. Which does instantiation of keycloak
client and initialize keycloak JavaScript adapter with `check-sso` and `hybrid` authorization flow.

- It also creates hooks for refreshing token, and when token expires it silently refreshes token resulting seamless user experience once logged in.

- After authentication is done via keycloak JavaScript adapter, `AuthContext` is extracted in domain model and this data is passed down the component tree using
React Context API.

- `AuthContext` gives handle to token, realm and resource roles, `userInfo`. Any component which want to use
this information can become consumer of `AuthContext`.

For example:

Javascript
:   @@snip [use auth context](../../../../example/src/components/config/context/ConfigServiceProvider.tsx) { #use-auth-context }

Access token can be extracted from `auth` and it can be sent in `Authorization` header for calling secure API.

For example:

```javascript
const SampleComponent = () => {

    const url = 'http://localhost:8080/secure-restful-service';
    const auth = useContext(AuthContext) //AuthContext from csw-aas-js

    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.setRequestHeader('Accept', 'application/json');

    //extract token from auth context and set Authorization header
    req.setRequestHeader('Authorization', 'Bearer ' + auth.token);

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                alert('Success');
            } else if (req.status == 403) {
                alert('Forbidden');
            }
        }
    }

    req.send();
};
```

The following diagram explains JavaScript application flow for making request to secure HTTP API:

![javascript-app-flow](../assets/javascript-app-workflow.png)

- When user opens Web application in the browser, csw-aas-js checks if user is already logged in using `check-sso` mode.

- If user is not logged in then `Login` button is shown.

- When user clicks on "login", user will be redirected to keyclok login page.

- This completes authentication process. Once authentication is done, `AuthContextProvider` extracts `AuthContext` domain model and
make it available to consumers of `AuthContext`.

- Protected react components can be shown based on information in `AuthContext`.

- For example, `CreateConfig` component can be shown only to users having `config admin` role. After the user is authenticated
the application can make requests to RESTful services secured by Keycloak by including the bearer token in the `Authorization` header.

- This completes workflow for web application calling secure HTTP endpoint.
