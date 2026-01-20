#!/usr/bin/env bash
set -euo pipefail

PORT=3100

if [[ ! -x ./node_modules/.bin/next ]]; then
  echo "Error: ./node_modules/.bin/next not found. Run npm install first." >&2
  exit 1
fi

echo "Starting Next.js dev server on port ${PORT}..."
./node_modules/.bin/next dev -p "${PORT}"
