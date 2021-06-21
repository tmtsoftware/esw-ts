# Getting Started with ESW-TS

In this tutorial, you’ll see how to create a UI starter project using a [giter8](http://www.foundweekends.org/giter8/)
template which uses ESW-TS library. You can use this as a starting point for your own UI applications.

## Installation

`node` is mandatory to be installed on a machine for using ESW-TS. To install the latest version of node, visit the
[official website](https://nodejs.org/en/).

## Create a Starter Project

It is recommended to use Giter8 template `esw-ui-template.g8` to get started with building web application.
Follow @link:[readme.md](https://github.com/tmtsoftware/esw-ui-template.g8/blob/master/README.md) for more details on how to
use the template to create starter project. `ESW-TS` comes pre-packaged as a dependency in the template.

If you already have a UI application and want to add ESW-TS dependency, then

To install the latest version of ESW-TS from npm

`npm install @tmtsoftware/esw-ts`

Or, to install a specific version

`npm install @tmtsoftware/esw-ts@{version}`

## UI App Configuration for ESW-TS

If you have used `esw-ui-template.g8` template for generating the application source code. Template generates a code snippet in the index.tsx file which showcases a call being made `setConfigPath`. this sets a default value to `template-folder-name`. if you wish to change your application name this is the place where you can change it. Note that this change effects metrics.

ESW-TS library will try to load this `ApplicationName` before making any backend service calls.
@extref[AppConfig](ts-docs:modules/models.html#appconfig).

Typescript
:   @@snip [settingpath](../../../../example/src/documentation/common/AppPath.tsx) { #set-app-config }
