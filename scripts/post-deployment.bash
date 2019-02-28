#!/usr/bin/env bash

COMPOSER_FILE="~/composer.phar"

echo "Running git pull"
cd search
git pull

cd ../web-root

cd web/pages
echo "Installing composer packages"
exec ${COMPOSER_FILE} install


rm composer.json composer.lock

echo "Done."
