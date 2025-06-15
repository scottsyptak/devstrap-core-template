#!/bin/bash
# scripts/dev.sh — Run backend, frontend, and Tailwind in parallel

echo "▶ Starting backend (FastAPI)..."
cd backend
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  source .venv/Scripts/activate
else
  source .venv/bin/activate
fi
uvicorn app.main:app --reload --host 0.0.0.0 --port 8080 &
BACKEND_PID=$!
cd ..

echo "▶ Starting styles monitor (Tailwind)..."
cd backend
echo "🔁 Watching ./app/templates/**/*.{jinja,j2,html} for Tailwind class changes..."
# (Don't background this process with `&`! Tailwind won't work properly on Git Bash if detached.)
npx tailwindcss \
  -i ./app/static/css/tailwind.css \
  -o ./app/static/css/app.css \
  --content "./app/templates/**/*.{jinja,j2,html}" \
  --minify \
  --watch
TAILWIND_PID=$!
cd ..

echo "▶ Starting frontend (Vite)..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Dev servers started."

# scripts/dev.sh

# Activate venv with cross-platform logic

