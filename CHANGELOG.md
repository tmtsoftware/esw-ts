# Change log

ESW-TS is a Javascript/Typescript wrapper for TMT backend services.
This source code is in github repository: [ESW-TS](https://github.com/tmtsoftware/esw-ts)
Npm module published for ESW-TS can be found [here](https://www.npmjs.com/package/@tmtsoftware/esw-ts)

## [UPCOMING CHANGES]

* Movement of `getAgentStatus` api from SequenceManager service to AgentService
* Add `getSequencerState` api in SequencerService
* Add `subscribeSequencerState` api in SequenceManager Service
* Add `getObsModesDetails` & `getResources` api in SequenceManager Service
* Removed `Struct` from `Key`. It was mentioned in the earlier release that `Struct` will be removed.
* Added provision for providing locationUrl through configuration file `config.js` in the static server.
* Added UTC & TAI entries in units list.
* Changed default unit for `UTCTimeKey` & `TAITimeKey` from `second` to `utc` & `tai` respectively.
* Added Component & Container level actions in Admin Service.
* Add support for setting AppName for metrics using `setAppName`.
* Removed `RaDec` from `KeyType`. Alternatively user can use `Coord` special KeyType to capture original use cases for RaDec.
* Subsystem list got updated as per [document](https://docushare.tmt.org/docushare/dsweb/Services/Document-4780).

### Supporting Releases

<a name="0-2-0-1"></a>1: [ESW-TS v0.2.0-RC1](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.2.0-RC1) - 2021-08-23<br>

## [ESW-TS v0.1.0] - 2021-02-01

This is the first minor release of ESW-TS for project stakeholders.

### Changes

Two main components are delivered as part of ESW-TS <sup>[1](#0-1-0-1)</sup>:

* AAS React Components
* Typescript Clients for backend services

### Documentation

* Reference paradox documentation: https://github.com/tmtsoftware/esw-ts/0.1.0/

### Supporting Releases

<a name="0-1-0-1"></a>1: [ESW-TS v0.1.0-RC1](https://github.com/tmtsoftware/esw-ts/releases/tag/v0.1.0-RC1) - 2020-11-11<br>
