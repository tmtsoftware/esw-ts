#!/usr/bin/env bash

SCRIPTPATH="$(
  cd "$(dirname "$0")" >/dev/null 2>&1 || exit
  pwd -P
)"
COURSIER="$(command -v cs)" || COURSIER="$SCRIPTPATH/scripts/coursier"

RTM_VERSION="33b2359b23"

TEST_STORY_FILE="./RTM/testStoryMapping.txt"

STORY_REQUIREMENT_FILE="./RTM/storyRequirementMapping.csv"

OUTPUT_PATH="./RTM/testRequirementsMapping.txt"

APPS_PATH="https://raw.githubusercontent.com/tmtsoftware/osw-apps/master/apps.json"

STORY_REQUIREMENT_FILE_PATH="https://raw.githubusercontent.com/tmtsoftware/esw/master/tools/RTM/storyRequirementMapping.csv"

APP_NAME="rtm"

# update story requirement mapping file from ESW repo
curl $STORY_REQUIREMENT_FILE_PATH > $STORY_REQUIREMENT_FILE

"$COURSIER" launch --channel $APPS_PATH "$APP_NAME":$RTM_VERSION -- $TEST_STORY_FILE $STORY_REQUIREMENT_FILE $OUTPUT_PATH
