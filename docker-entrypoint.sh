#!/bin/bash

set -e


if [ ${CLOUD_ENV} = development ];
then
    sleep 10

    cd /var/www/finance-react &&
    npm install &&
    npm run start;
else
    cd /var/www/finance-react &&
    rm -rf node_modules &&
    npm install &&    
    exec "$@"
fi

