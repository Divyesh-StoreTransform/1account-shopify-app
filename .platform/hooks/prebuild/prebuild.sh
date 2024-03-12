#!/bin/bash
# chmod +x *.sh

echo 'PREBUILD  004 script running....'

cd /var/app/staging
echo 'copying contents of /web into root, removing /web'
cp -r web/. .
rm -r web
sudo -u webapp npm install

echo 'root contents... now there should be node_modules & ENV'
ls -a

echo 'entering /frontend and installing deps'
cd frontend
sudo npm install
echo 'installed fe node_modules... are they there?'
ls