#!/usr/bin/env bash

# Copyright 2015 Remi Even
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

old_ifs=$IFS

# You can modify the following variables
offset=0

author="Thirty Meter Telescope International Observatory"
year="2025"

ext="(ts|tsx)"

comment_start='/*'
comment_middle=' *'
comment_end=' */'

license='Copyright (C) {{year}} {{author}}
SPDX-License-Identifier: Apache-2.0'

# End of modifiable variables



verbose=true

function generate_header_content {
file_name=$1
    echo -e "$license" \
    | sed -e "s/{{author}}/$author/g" \
    | sed -e "s/{{year}}/$year/g" \
    | sed -e "s/\(.*\)/$comment_middle \1/" \
    | sed -e "s/[ \t]*$//" \
    >> .licensifytmp
}

function add_header {
    goal=$1
    if [[ ! -f $goal ]]; then
        echo "Warning : Can not find file \"$goal\""
        return
    fi
    line2=$(head -2 $goal)
    if [[ $line2 == *"Copyright (C)"* ]]; then
      return
    fi

    file_name=$(basename $goal)
    i=0
    touch .licensifytmp
    while IFS='' read -r line || [[ -n $line ]]; do
        if (( $i == $offset )); then
            echo "$comment_start" >> .licensifytmp
            generate_header_content $file_name
            echo -e "$comment_end\n" >> .licensifytmp
            if [[ $verbose = true ]]; then
                echo "Info : Added copyright header to $(basename $goal)"
            fi
        fi
        (( i++ ))
        echo "$line" >> .licensifytmp
    done < $goal
    mv .licensifytmp $goal
}

if [[ $1 = '-v' ]]; then
    verbose=true
    shift
fi

if (( $# == 0 )); then
    srcDirectory=$(pwd)/src
    testDirectory=$(pwd)/test
    goals=$(find $srcDirectory -name \*.ts -o -name \*.tsx -type f)
    goals+=" "
    goals+=$(find $testDirectory -name \*.ts -o -name \*.tsx -type f)
else
    goals=$*
fi

for goal in $goals; do
    add_header $goal
done

IFS=$old_ifs