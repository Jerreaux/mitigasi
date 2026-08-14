#!/bin/sh
BACKEND_PORT=5001 node /app/backend/server.js &
PORT=3000 HOSTNAME=0.0.0.0 exec node /app/server.js
