
# Javascript Adapter (csw-aas-js)

`csw-aas-js` is an npm package which provides React components that integrate with the CSW
Authentication and Authorization Service.  UI applications can use these React components to
enable the application to show or hide components based on the authentication and authorization policy.
`csw-aas-js` is written in typescript and it bundles transpiled es6 module along with type declarations.

<!-- introduction to the javascript adapter -->

## Dependencies

To use the `esw-ts` adapter, run this command from root folder of your application where `package.json` exists:

npm
:   @@@vars
    ```javascript
        npm i --save esw-ts@$version$
    ```
    @@@

yarn
:   @@@vars
    ```javascript
        yarn add esw-ts@$version$
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
:   @@snip [App-config](../../../../example/src/config/AppConfig.ts) { #app-config }


## Components

`esw-ts` exposes the following React components.

 - [AuthContextProvider](#AuthContextProvider)
 - [Consumer](#consumer)
 - [Login](#login)
 - [Logout](#logout)
 - [CheckLogin](#checklogin)
 - [RealmRole](#realmrole)

Components can be imported as shown in code snippet below

Javascript
:   @@snip [Import Components](../../../../example/src/components/NavComponent.tsx) { #import-components }


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
:   @@snip [AuthContextProvider.tsx](../../../../example/src/components/ExampleApp.tsx) { #AuthContextProvider-component-usage }

#### Source code for AuthContextProvider component

* @github[AuthContextProvider Component](../../../../lib/src/components/aas/context/AuthContextProvider.tsx)

### Consumer

`Consumer` is similar to a React [Context.Consumer](https://reactjs.org/docs/context.html#contextconsumer).
The shared `auth` object from the `AuthContextProvider` can be accessed using a `Consumer` component

Javascript
:   @@snip [Consumer.jsx](../../../../example/src/components/Read.tsx) { #Consumer-component-usage }

#### Source code for Consumer component

* @github[Consumer Component](/lib/src/components/aas/context/AuthContext.ts)

### Login

The `Login` component instantiates an AAS server with the configurations provided. It redirects to an AAS server login page
for the user to login. After login, the `auth` object in the context is updated with the appropriate values,
e.g. token, realm etc.

Javascript
:   @@snip [Login.tsx](../../../../example/src/components/NavComponent.tsx) { #login-component-usage }

#### Source code for Login component

* @github[Login Component](/lib/src/components/aas/Login.tsx)

### Logout

The `Logout` component logs out the user from the AAS server. It clears the `auth` object stored in the context.

Javascript
:   @@snip [Logout.tsx](../../../../example/src/components/NavComponent.tsx) { #logout-component-usage }

#### Source code for Logout component

* @github[Logout Component](/lib/src/components/aas/Logout.tsx)

### CheckLogin

`CheckLogin` components provide ability to show something only if the user is logged in.
In the following code snippet, `Write` is a react component that is shown only if the user is logged in.
The behavior if the user is not logged in can be defined by an HTML element or React component that is
passed into the component as an `error` property, shown as an `ExampleError` Component in following snippet.

Javascript
:   @@snip [CheckLogin.tsx](../../../../example/src/components/ExampleApp.tsx) { #checkLogin-component-usage }

#### Source code for CheckLogin component

* @github[CheckLogin Component](/lib/src/components/aas/authentication/CheckLogin.tsx)

### RealmRole

`RealmRole` components provide the ability to show something only if the user is logged in and has the specified realm role.
In the following code snippet, the contents of the `div` block are shown only if the user is logged in and
has the realm role specified in the `realmRole` prop.  Similar to `CheckLogin`,
the behaviour if the user is not logged in can be optionally defined by an HTML element or React component
that is passed into the component as an `error` property, shown as an `ExampleError` Component in following snippet.

Javascript
:   @@snip [RealmRole.tsx](../../../../example/src/components/ExampleApp.tsx) { #realmRole-component-usage }

#### Source code for RealmRole component

* @github[RealmRole Component](/lib/src/components/aas/authorization/RealmRole.tsx)

## Technical Description
See @ref:[csw-aas-js Technical Description](../technical/csw-aas-js.md).
