#!/bin/bash
# chmod +x *.sh

echo 'PREDEPLOY  004 script running...'


source ./././.env

cd frontend && SHOPIFY_API_KEY=$SHOPIFY_API_KEY npm run build

echo 'checking built app location and contents'
pwd
ls