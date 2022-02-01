#!/usr/bin/env bash

RTM_VERSION="0.3.0"

TEST_STORY_FILE="./RTM/testStoryMapping.txt"

STORY_REQUIREMENT_FILE="./RTM/storyRequirementMapping.csv"

OUTPUT_PATH="./RTM/testRequirementsMapping.txt"

APPS_PATH="https://raw.githubusercontent.com/tmtsoftware/osw-apps/master/apps.json"

STORY_REQUIREMENT_FILE_PATH="https://raw.githubusercontent.com/tmtsoftware/esw/master/tools/RTM/storyRequirementMapping.csv"

APP_NAME="rtm"

cs launch --channel $APPS_PATH "$APP_NAME":$RTM_VERSION -- $TEST_STORY_FILE $STORY_REQUIREMENT_FILE $OUTPUT_PATH
