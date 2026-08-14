#!/bin/sh
node /app/backend/server.js &
exec node /app/server.js
