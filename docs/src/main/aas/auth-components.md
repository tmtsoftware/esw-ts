# Auth Components

`ESW-TS` provides React components that integrate with the CSW
Authentication and Authorization Service. UI applications can use these React components to
enable the application to show or hide components based on the authentication and authorization policy.

## Application Configuration

Web application needs following configurations in order to get access token from keycloak server. This application specific
config object should be passed in `AuthContextProvider` component. There are two configurations needed for a web application
i.e. `realm`, `clientId`

`realm` is a mandatory configuration which specifies in keycloak server under which client your application is registered.

`clientId` is a mandatory configuration which specifies the client id of the app as per registration
in keycloak server.

See, how to configure realm & client-id [here](../common/getting-started.md#ui-app-configuration-for-esw-ts)

## Components

`ESW-TS` exposes the following React components.

- @ref[Auth Components](#auth-components)
  - @ref[Application Configuration](#application-configuration)
  - @ref[Components](#components)
    - @ref[AuthContextProvider](#authcontextprovider)
    - @ref[Consumer](#consumer)
    - @ref[Login](#login)
    - @ref[Logout](#logout)
    - @ref[CheckLogin](#checklogin)
    - @ref[RealmRole](#realmrole)
  - @ref[Example](#example)
  - @ref[Technical Description](#technical-description)

Type definition for all components used by services can be found @extref:[here](ts-docs:modules/components.html)

Components can be imported as shown in code snippet below

Typescript
:   @@snip [Import Components](../../../../example/src/components/NavComponent.tsx) { #import-components }

### AuthContextProvider

`AuthContextProvider` is wrapper over a React [Context.Provider](https://reactjs.org/docs/context.html#contextprovider).
A JSON configuration must be passed in that contains the application specific AAS server configuration
(e.g. clientId, realm). When a user logs in, an AAS Server is instantiated, with the UI application specific
configuration overriding the predefined configuration.
Once the AAS sever is instantiated, an `auth` object is created with the needed attributes and APIs. This `auth` object
is available to other React components; since `AuthContextProvider` is a `Provider`, its data can be shared with any of
the children React components in its tree in a `Consumer` component (see below). All `Consumer`s that are
descendants of a `Provider` will re-render whenever the `AuthContextProvider`’s state changes, e.g. a user authorizes.
It is recommended to use `AuthContextProvider` to wrap the entire application so that data can be shared anywhere in
application via a `Consumer`.

Typescript
:   @@snip [AuthContextProvider.tsx](../../../../example/src/components/ExampleApp.tsx) { #AuthContextProvider-component-usage }

### Consumer

`Consumer` is similar to a React [Context.Consumer](https://reactjs.org/docs/context.html#contextconsumer).
The shared `auth` object from the `AuthContextProvider` can be accessed using a `Consumer` component.

Typescript
:   @@snip [Consumer.tsx](../../../../example/src/components/Read.tsx) { #Consumer-component-usage }

### Login

The `Login` component instantiates an AAS server with the configurations provided. It redirects to an AAS server login page
for the user to login. After login, the `auth` object in the context is updated with the appropriate values,
e.g. token, realm etc.

Typescript
:   @@snip [Login.tsx](../../../../example/src/components/NavComponent.tsx) { #login-component-usage }

### Logout

The `Logout` component logs out the user from the AAS server. It clears the `auth` object stored in the context.

Typescript
:   @@snip [Logout.tsx](../../../../example/src/components/NavComponent.tsx) { #logout-component-usage }

### CheckLogin

`CheckLogin` component provides ability to show something only if the user is logged in.
In the following code snippet, `Write` is a React component that is shown only if the user is logged in.
The behavior if the user is not logged in can be defined by an HTML element or React component that is
passed into the component as an `error` property, shown as an `ExampleError` Component in following snippet.

Typescript
:   @@snip [CheckLogin.tsx](../../../../example/src/components/ExampleApp.tsx) { #checkLogin-component-usage }

### RealmRole

`RealmRole` component provides the ability to show something only if the user is logged in and has the specified realm role.
In the following code snippet, the contents of the `div` block are shown only if the user is logged in and
has the realm role specified in the `realmRole` prop.  Similar to `CheckLogin`,
the behaviour if the user is not logged in can be optionally defined by an HTML element or React component
that is passed into the component as an `error` property, shown as an `ExampleError` Component in following snippet.

Typescript
:   @@snip [RealmRole.tsx](../../../../example/src/components/ExampleApp.tsx) { #realmRole-component-usage }

## Example

Here is an example of a Config App(React App) which uses ConfigService client
and Auth components in order to authorize ConfigService

Typescript
:   @@snip [ExampleApp.tsx](../../../../example/src/components/ExampleApp.tsx) { #example-app }

ConfigApp component which uses Config Service APIs:

Typescript
:   @@snip [ConfigApp.tsx](../../../../example/src/components/config/ConfigApp.tsx) { #config-app }

ConfigServiceProvider is the component where instance of Config Service gets created:

Typescript
:   @@snip [ConfigServiceProvider.tsx](../../../../example/src/components/config/context/ConfigServiceProvider.tsx) { #config-service-provider }

Source code for the full example can be found [here]($github.dir.base_url$/example/src)

## Technical Description

See @ref:[Auth Components Technical Description](../technical/auth-components.md).
