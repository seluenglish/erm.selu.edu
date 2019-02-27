#!/usr/bin/env bash

RUSKIN_ROOT=".."
TMP_DIR="$(mktemp -d -t 'ruskin')"

echo "Temporary directory: $TMP_DIR"

mkdir -p ${TMP_DIR}/web

echo "Copying XML"
cp -r ${RUSKIN_ROOT}/_xml/_Completed ${TMP_DIR}/web/xml

echo "Copying PHP and HTML"
cp -r ${RUSKIN_ROOT}/gen/_xml/_Completed ${TMP_DIR}/web/pages
cp -r ${RUSKIN_ROOT}/gen/_xml/{config.json.php,header.inc.php,style.php,layout_includes} ${TMP_DIR}/web/pages
rsync -a ${RUSKIN_ROOT}/_xml/_In_Process/essays/. ${TMP_DIR}/web/pages/essays

rm -rf build
mv ${TMP_DIR} build

echo "All done."
