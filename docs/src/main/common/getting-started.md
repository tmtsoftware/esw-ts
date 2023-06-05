# Getting Started with ESW-TS

In this tutorial, you’ll see how to create a UI starter project using a [giter8](https://www.foundweekends.org/giter8/)
template which uses ESW-TS library. You can use this as a starting point for your own UI applications.

## Installation

`node` is mandatory to be installed on a machine for using ESW-TS. To install the latest version of node, visit the
[official website](https://nodejs.org/en).

## Create a Starter Project

It is recommended to use Giter8 template `esw-gateway-ui-template.g8` to get started with building web application.
Follow @link:[readme.md](https://github.com/tmtsoftware/esw-gateway-ui-template.g8) for more details on how to
use the template to create starter project. `ESW-TS` comes pre-packaged as a dependency in the template.

If you already have a UI application and want to add ESW-TS dependency, then

To install the latest version of ESW-TS from npm

`npm install @tmtsoftware/esw-ts`

Or, to install a specific version

`npm install @tmtsoftware/esw-ts@{version}`

## UI App Configuration for ESW-TS

If you have used `esw-gateway-ui-template.g8` template for generating the application source code. Template generates a `AppConfig.js` file in `src/config/AppConfig.js`. It has applicationName that you provided while creating template. if you wish to change your application name this is the place where you can change it. Note that this change effects metrics & the deployment time folder name.

Note: ESW-TS library will try to load this `applicationName` before making any backend service calls.
@extref[AppConfig](ts-docs:modules/models.html#AppConfig).

Typescript
:   @@snip [settingpath](../../../../example/src/documentation/common/AppPath.tsx) { #set-app-name }

## UI App Deployment for ESW-TS

Applications that are built using `ui-template.g8` are meant to be deployed under one common folder `/apps`.
this folder will contain all tmt ui applications which can be together deployed using any static server(nginx, python http server, s3 static server, etc).

ESW-TS assumes that static server contains a `config.js` file which has configuration related to all applications.

Refer @extref:[this](ts-docs:modules/models.html#AppConfigModule) for the structure of config module.

In future if needed, other configuration can be added here which are applicable to all tmt applications.

Refer @extref:[this](ts-docs:modules/models.html#AppConfig) for the structure of config.

Note:

1. Without this file, Application won't be able to communicate to tmt backend service's.
2. Folder name of the application which is getting copied at the static server should have exactly same name as it is in the AppConfig.js's applicationName field. (g8 template by default takes care of this, only if you wish to change your application name, Make a note of this configuration).
