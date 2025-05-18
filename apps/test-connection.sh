#!/bin/bash

# This script tests the connection between the frontend and backend

# Colors for better output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Testing Vizinn API Connectivity${NC}"

# Test backend direct access
echo -e "\n${BLUE}Testing Backend API:${NC}"
BACKEND_URL="http://localhost:8000"
echo "GET $BACKEND_URL"

if curl -s "$BACKEND_URL" > /dev/null; then
  echo -e "${GREEN}✓ Backend API is accessible${NC}"
  echo "Response from backend:"
  curl -s "$BACKEND_URL" | jq
else
  echo -e "${RED}✗ Cannot connect to backend at $BACKEND_URL${NC}"
  echo "Make sure the backend is running with: cd apps/backend && uvicorn backend.app:app --reload"
fi

# Test auth endpoint specifically
echo -e "\n${BLUE}Testing Auth Endpoint:${NC}"
AUTH_URL="$BACKEND_URL/auth/login"
echo "POST $AUTH_URL (with test email)"

RESPONSE=$(curl -s -X POST "$AUTH_URL" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}')

if [ -n "$RESPONSE" ]; then
  echo -e "${GREEN}✓ Auth endpoint is accessible${NC}"
  echo "Response from auth endpoint:"
  echo "$RESPONSE" | jq
else
  echo -e "${RED}✗ Cannot connect to auth endpoint at $AUTH_URL${NC}"
fi

echo -e "\n${BLUE}Connectivity testing completed.${NC}"
