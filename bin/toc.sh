#!/bin/bash

egrep "^# |^#$" -h -A 3 * | grep "^##" | sed 's/##/\|/' | sed  "s|$| \||"

