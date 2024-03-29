/*
 * Copyright (C) 2023 Thirty Meter Telescope International Observatory
 * SPDX-License-Identifier: Apache-2.0
 */

import { EventName } from './EventName'

const eventName = (name: string) => new EventName(`ObserveEvent.${name}`)

/**
 * @category Event Service
 */
export const ObserveEventNames = {
  // common
  ObserveStart: eventName('ObserveStart'),
  ObserveEnd: eventName('ObserveEnd'),
  ExposureStart: eventName('ExposureStart'),
  ExposureEnd: eventName('ExposureEnd'),
  ReadoutEnd: eventName('ReadoutEnd'),
  ReadoutFailed: eventName('ReadoutFailed'),
  DataWriteStart: eventName('DataWriteStart'),
  DataWriteEnd: eventName('DataWriteEnd'),
  ExposureAborted: eventName('ExposureAborted'),
  PrepareStart: eventName('PrepareStart'),

  // IRDetector specific
  IRDetectorExposureData: eventName('IRDetectorExposureData'),
  IRDetectorExposureState: eventName('IRDetectorExposureState'),

  // OpticalDetector specific
  OpticalDetectorExposureData: eventName('OpticalDetectorExposureData'),
  OpticalDetectorExposureState: eventName('OpticalDetectorExposureState'),

  // WFSDetector specific
  WfsDetectorExposureState: eventName('WfsDetectorExposureState'),
  PublishSuccess: eventName('PublishSuccess'),
  PublishFail: eventName('PublishFail'),

  // Sequencer specific
  PresetStart: eventName('PresetStart'),
  PresetEnd: eventName('PresetEnd'),
  GuidestarAcqStart: eventName('GuidestarAcqStart'),
  GuidestarAcqEnd: eventName('GuidestarAcqEnd'),
  ScitargetAcqStart: eventName('ScitargetAcqStart'),
  ScitargetAcqEnd: eventName('ScitargetAcqEnd'),
  ObservationStart: eventName('ObservationStart'),
  ObservationEnd: eventName('ObservationEnd'),
  ObservePaused: eventName('ObservePaused'),
  ObserveResumed: eventName('ObserveResumed'),
  DowntimeStart: eventName('DowntimeStart'),
  OffsetStart: eventName('OffsetStart'),
  OffsetEnd: eventName('OffsetEnd'),
  InputRequestStart: eventName('InputRequestStart'),
  InputRequestEnd: eventName('InputRequestEnd'),

  // DMS specific
  MetadataAvailable: eventName('MetadataAvailable'),
  ExposureAvailable: eventName('ExposureAvailable')
}
