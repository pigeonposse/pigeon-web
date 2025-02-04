#!/usr/bin/env bash

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


case "$1" in
  --org)
    shift
    runOrg "$@"
    ;;
  *)
    run "$@"
    ;;
esac
