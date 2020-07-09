#!/usr/bin/env bash

SCRIPTPATH="$(
  cd "$(dirname "$0")" >/dev/null 2>&1 || exit
  pwd -P
)"
COURSIER="$(command -v cs)" || COURSIER="$SCRIPTPATH/lib/scripts/coursier"

RTM_VERSION="97d880571f"

TEST_STORY_FILE="./RTM/testStoryMapping.txt"

STORY_REQUIREMENT_FILE="./RTM/storyRequirementMapping.csv"

OUTPUT_PATH="./RTM/testRequirementsMapping.txt"

APPS_PATH="https://raw.githubusercontent.com/tmtsoftware/apps/master/apps.json"

APP_NAME="rtm"

"$COURSIER" launch --channel $APPS_PATH "$APP_NAME":$RTM_VERSION -- $TEST_STORY_FILE $STORY_REQUIREMENT_FILE $OUTPUT_PATH
