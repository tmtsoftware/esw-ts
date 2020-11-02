# Getting Started with ESW-TS

In this tutorial, you’ll see how to create a UI starter project using a [giter8](http://www.foundweekends.org/giter8/)
template which uses ESW-TS library. You can use this as a starting point for your own UI applications.

## Installation

`node` is mandatory to be installed on a machine for using ESW-TS. To install the latest version of node, visit the
[official website](https://nodejs.org/en/).

## Create a Starter Project

It is recommended to use Giter8 template `esw-ui-template.g8` to get started with building web application.
Follow @link:[readme.md]($esw_ui_template.base_url$/README.md) for more details on how to
use the template to create starter project. `ESW-TS` comes pre-packaged as a dependency in the template.

If you already have a UI application and want to add ESW-TS dependency, then

To install the latest version of ESW-TS from npm

`npm install @tmtsoftware/esw-ts`

Or, to install a specific version

`npm install @tmtsoftware/esw-ts@{version}`

## UI App Configuration for ESW-TS

If you have used `esw-ui-template.g8` template for generating the application source code. Template generates `AppConfig.ts` file with default ApplicationName same as the given `projectname`.
ESW-TS library will try to load this `ApplicationName` before making any backend service calls.
Therefore, it is required `AppConfig.ts` must export the @extref[AppConfig](ts-docs:modules/models.html#appconfig).

Follow the steps to add a configuration file if you have not used the template before
which has Application related information required by ESW-TS at application runtime.

- Add `AppConfig.ts` inside config folder.

Folder structure
:   @@snip [folder-path](../../../../example/src/documentation/common/AppPath.tsx) { #folder }

if you choose to add config file with some other name at random file path (i.e. `src/randomFolder/RandomFileName.ts`).
you must set the ESW-TS's internal variable(`APP_CONFIG_PATH`) pointing to the `RandomFileName.ts` using @extref[setAppConfigPath](ts-docs:modules/config.html#setappconfigpath) before creating any ESW-TS Service instance.

@@@warning
Next step is only required if you have file name other than `AppConfig.ts` or the file is located other than `config` folder.
@@@

Typescript
:   @@snip [settingpath](../../../../example/src/documentation/common/AppPath.tsx) { #set-app-config-path }
