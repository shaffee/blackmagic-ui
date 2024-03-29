#!/bin/bash

cd $PWD/../
git pull

cd backend
npm install

cd $PWD/../frontend
git pull
npm install
rm -Rf /tmp/production_tmp
mkdir -p /tmp/production_tmp


ng config -g cli.warnings.versionMismatch false
ng build --prod --output-path=/tmp/production_tmp --source-map=false
rm -Rf $PWD/../production/
mkdir -p $PWD/../production
mv /tmp/production_tmp/* $PWD/../production/