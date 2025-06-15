#!/bin/bash
# scripts/deploy.sh — Build assets and deploy to Fly.io

./scripts/build.sh || exit

echo "▶ Deploying to Fly.io..."
cd backend || exit
fly deploy
