#!/usr/bin/env bash
jps -m | grep "backend-testkit-component" | awk '{print $1}' | xargs kill
jps -m | grep "backend-testkit-services" | awk '{print $1}' | xargs kill
jps -m | grep "backend-testkit-sequencer" | awk '{print $1}' | xargs kill
jps -m | grep "embedded-keycloak" | awk '{print $1}' | xargs kill
jps -m | grep ContainerCmdApp | awk '{print $1}' | xargs kill
jps -m | grep BackendService | awk '{print $1}' | xargs kill
jps -m | grep SequencerApp | awk '{print $1}' | xargs kill
