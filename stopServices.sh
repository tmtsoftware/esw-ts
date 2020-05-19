#!/usr/bin/env bash

TMT_BACKEND_LIB=com.github.tmtsoftware.tmt-backend:tmt-backend_2.13
jps -m | grep $TMT_BACKEND_LIB | awk '{print $1}' | xargs kill
