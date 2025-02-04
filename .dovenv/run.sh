#!/bin/bash

runOrg() {
  local FIRST_ARG=$1
  shift

  pnpm -F "@*/$FIRST_ARG*" $@
}

run() {
  local FIRST_ARG=$1
  shift
  pnpm -F "$FIRST_ARG" "$@"
}


if [[ "$1" == "--org" ]]; then
  shift  
  runOrg "$@"
else
  run "$@"
fi
