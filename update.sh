#!/usr/bin/env bash
cd /srv/lock-c2
git reset --hard
git pull
npm i
pm2 restart all
wall "updated"
