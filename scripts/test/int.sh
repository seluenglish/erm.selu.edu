#!/usr/bin/env bash

mocha --exit \
  'test/integration/**/*.test.js' $@
