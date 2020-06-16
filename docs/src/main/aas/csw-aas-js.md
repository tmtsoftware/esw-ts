# Javascript Adapter (csw-aas-js)

`csw-aas-js` is an npm package which provides React components that integrate with the CSW
Authentication and Authorization Service.  UI applications can use these React components to
enable the application to show or hide components based on the authentication and authorization policy.
`csw-aas-js` is written in typescript and it bundles transpiled es6 module along with type declarations.

<!-- introduction to the javascript adapter -->

## Dependencies

To use the `csw-aas-js` adapter, run this command from root folder of your application where `package.json` exists:

npm
:   @@@vars
    ```javascript
        npm i --save csw-aas-js@$version$
    ```
    @@@

yarn
:   @@@vars
    ```javascript
        yarn add csw-aas-js@$version$
    ```
    @@@

## Application Configuration

Web application needs following configurations in order to get access token from keycloak server. This application specific
config object should be passed in AuthContextProvider component. There are two configurations needed for a web application
i.e. `realm`, `clientId`

`realm` is a mandatory configuration which specified in keycloak server under which client for your application is registered.

`clientId` is a mandatory configuration which specifies the client id of the app as per registration
in keycloak server.

Javascript
:   @@snip [App-config](../../../../aas-examples/example-app/src/config/AppConfig.js) { #app-config }


## Components

`csw-aas-js` exposes the following React components.

 - [AuthContextProvider](#AuthContextProvider)
 - [Consumer](#consumer)
 - [Login](#login)
 - [Logout](#logout)
 - [CheckLogin](#checklogin)
 - [RealmRole](#realmrole)
 - [ClientRole](#clientrole)

Components can be imported as shown in code snippet below

Javascript
:   @@snip [Import Components](../../../../aas-examples/example-app/src/components/NavComponent.jsx) { #import-components }


### AuthContextProvider

`AuthContextProvider` is wrapper over a React [Context.Provider](https://reactjs.org/docs/context.html#contextprovider).
A JSON configuration file must be passed in that contains the application specific AAS server configuration
(e.g. clientId, realm). When a user logs in, an AAS Server is instantiated, with the UI application specific
configuration overriding the predefined configuration.
Once the AAS sever is instantiated, an `auth` object is created with the needed attributes and APIs. This `auth` object
is available to other React components; since `AuthContextProvider` is a `Provider`, its data can be shared with any of
the children React components in its tree in a `Consumer` component (see below). All `Consumer`s that are
descendants of a `Provider` will re-render whenever the AuthContextProvider’s state changes, e.g. a user authorizes.
It is recommended to use `AuthContextProvider` to wrap the entire application so that data can be shared anywhere in
application via a `Consumer`.

Javascript
:   @@snip [AuthContextProvider.tsx](../../../../aas-examples/example-app/src/components/ExampleApp.jsx) { #AuthContextProvider-component-usage }

#### Source code for RealmRole component

* @github[AuthContextProvider Component](../../../../csw-aas-js/src/components/context/AuthContextProvider.tsx)

### Consumer

`Consumer` is similar to a React [Context.Consumer](https://reactjs.org/docs/context.html#contextconsumer).
The shared `auth` object from the `AuthContextProvider` can be accessed using a `Consumer` component

Javascript
:   @@snip [Consumer.jsx](../../../../aas-examples/example-app/src/components/Read.jsx) { #Consumer-component-usage }

#### Source code for RealmRole component

* @github[Consumer Component](/csw-aas-js/src/components/context/AuthContext.ts)

### Login

The `Login` component instantiates an AAS server with the configurations provided. It redirects to an AAS server login page
for the user to login. After login, the `auth` object in the context is updated with the appropriate values,
e.g. token, realm & client roles etc.

Javascript
:   @@snip [Login.tsx](../../../../aas-examples/example-app/src/components/NavComponent.jsx) { #login-component-usage }

#### Source code for Login component

* @github[Login Component](/csw-aas-js/src/components/Login.tsx)

### Logout

The `Logout` component logs out the user from the AAS server. It clears the `auth` object stored in the context.

Javascript
:   @@snip [Logout.tsx](../../../../aas-examples/example-app/src/components/NavComponent.jsx) { #logout-component-usage }

#### Source code for Logout component

* @github[Logout Component](/csw-aas-js/src/components/Logout.tsx)

### CheckLogin

`CheckLogin` components provide ability to show something only if the user is logged in.
In the following code snippet, `Write` is a react component that is shown only if the user is logged in.
The behavior if the user is not logged in can be defined by an HTML element or React component that is
passed into the component as an `error` property, shown as an `ExampleError` Component in following snippet.

Javascript
:   @@snip [CheckLogin.tsx](../../../../aas-examples/example-app/src/components/ExampleApp.jsx) { #checkLogin-component-usage }

#### Source code for CheckLogin component

* @github[CheckLogin Component](/csw-aas-js/src/components/authentication/CheckLogin.tsx)

### RealmRole

`RealmRole` components provide the ability to show something only if the user is logged in and has the specified realm role.
In the following code snippet, the contents of the `div` block are shown only if the user is logged in and
has the realm role specified in the `realmRole` prop.  Similar to `CheckLogin`,
the behaviour if the user is not logged in can be optionally defined by an HTML element or React component
that is passed into the component as an `error` property, shown as an `ExampleError` Component in following snippet.

Javascript
:   @@snip [RealmRole.tsx](../../../../aas-examples/example-app/src/components/ExampleApp.jsx) { #realmRole-component-usage }

#### Source code for RealmRole component

* @github[RealmRole Component](/csw-aas-js/src/components/authorization/RealmRole.tsx)

### ClientRole

`ClientRole` components provide the ability to show something only if the user is logged in and has the specified client
role for the specified client. In the following code snippet, the contents of the `div` block are shown only if
the user is logged in and has the client role for specified client in the `clientRole` prop.  Similar to `RealmRole`,
the behaviour if the user is not logged in can be optionally defined by an HTML element or React component
that is passed into the component as an `error` property, shown as an `ExampleError` Component in following snippet.

Javascript
:   @@snip [ClientRole.tsx](../../../../aas-examples/example-app/src/components/ExampleApp.jsx) { #clientRole-component-usage }

#### Source code for ClientRole component

* @github[ClientRole Component](/csw-aas-js/src/components/authorization/ClientRole.tsx)

## Technical Description
See @ref:[csw-aas-js Technical Description](../technical/csw-aas-js.md).
