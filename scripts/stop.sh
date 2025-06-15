#!/bin/bash
# scripts/stop.sh — Kill backend, frontend, and Tailwind processes

echo "🛑 Stopping backend (uvicorn)..."
pkill -f "uvicorn.*app.main:app"
taskkill //IM "uvicorn.exe" //F 2>/dev/null || echo "  (uvicorn not running)"

echo "🛑 Stopping frontend (vite)..."
pkill -f "vite"
taskkill //IM "node.exe" //F 2>/dev/null || echo "  (vite not running)"

echo "🛑 Stopping Tailwind CLI watcher..."
pkill -f "tailwindcss.*--watch"
taskkill //IM "tailwindcss.exe" //F 2>/dev/null || echo "  (tailwind not running)"

echo "✅ All known dev processes terminated."
