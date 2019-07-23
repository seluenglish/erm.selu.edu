#!/usr/bin/env bash

REMOTE_HOST="erm.selu.edu"
REMOTE_USER="webmaster"
REMOTE_ROOT="/home/webmaster/ruskin-stuffs"
REMOTE_PORT="4422"

LOCAL_ASSETS_DIR="./build"


CUR_DIR=$(dirname "$0")

echo "Copying assets"
rsync -aP ${LOCAL_ASSETS_DIR}/ -e "ssh -p ${REMOTE_PORT} " ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_ROOT}/web-root

echo "Running post deployment scripts"
ssh -p 4422 -l ${REMOTE_USER} ${REMOTE_HOST} \
  "cd ${REMOTE_ROOT}/ && bash -s" < ${CUR_DIR}/post-deployment.bash

