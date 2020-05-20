#!/usr/bin/env bash

jps -m | grep BackendService | awk '{print $1}' | xargs kill
jps -m | grep ContainerCmdApp | awk '{print $1}' | xargs kill
