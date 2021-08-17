#!/bin/bash

git pull
npm install

cd $PWD/../frontend
git pull
npm install
rm -R /tmp/production_tmp
mkdir -p /tmp/production_tmp
mkdir -p $PWD/../production

ng config -g cli.warnings.versionMismatch false
ng build --prod --output-path=/tmp/production_tmp --source-map=false
mv /tmp/production_tmp/* $PWD/../production/
