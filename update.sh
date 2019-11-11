#!/usr/bin/env bash
git reset --hard
git pull
npm i
pm2 restart all
wall "updated"
