#!/bin/bash
# scripts/build.sh — Build frontend and backend styles

set -e  # Exit on error

# Always work relative to project root
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
BACKEND_DIR="$ROOT_DIR/backend"

echo "▶ Building frontend (Vite)..."
cd "$FRONTEND_DIR"
npm run build
echo "✅ Frontend built to backend/app/static/build/"

echo "▶ Building backend styles (Tailwind)..."
cd "$BACKEND_DIR"
npx tailwindcss \
  -i ./app/static/css/tailwind.css \
  -o ./app/static/css/app.css \
  --content './app/templates/**/*.{jinja,j2,html}' \
  --minify
echo "✅ Backend styles compiled"
