#!/bin/bash

cd $PWD/../frontend
npm install
rm -R /tmp/production_tmp
mkdir -p /tmp/production_tmp
mkdir -p $PWD/../production

ng build --prod --output-path=/tmp/production_tmp --source-map=false
mv /tmp/production_tmp/* $PWD/../production/
