#!/bin/bash
# scripts/health.sh — Hit health and status routes

API_URL=${1:-http://localhost:8080}
FRONTEND_URL=${2:-http://localhost:5173}

echo "▶ Testing Backend API..."
curl --silent --show-error "$API_URL/api/health" && echo
curl --silent --show-error "$API_URL/api/version" && echo

echo "▶ Testing Frontend..."
curl --silent --show-error "$FRONTEND_URL/healthz" && echo

echo "▶ Reminder: Manually check /api-status in browser:"
echo "   $FRONTEND_URL/api-status"
