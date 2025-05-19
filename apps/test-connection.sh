#!/bin/bash

# This script tests the connection between the frontend and backend

# Colors for better output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Testing Vizinn API Connectivity${NC}"

# Test backend direct access
echo -e "\n${BLUE}Testing Backend API:${NC}"
BACKEND_URL="http://localhost:8000"
echo "GET $BACKEND_URL"

RESPONSE=$(curl -s -w "\nStatus: %{http_code}, Response time: %{time_total}s" "$BACKEND_URL")
STATUS_CODE=$(echo "$RESPONSE" | grep "Status:" | cut -d' ' -f2 | tr -d ',')

if [ "$STATUS_CODE" == "200" ]; then
  echo -e "${GREEN}✓ Backend API is accessible${NC}"
  echo "Response from backend:"
  echo "$RESPONSE" | head -n 1
else
  echo -e "${RED}✗ Cannot connect to backend at $BACKEND_URL${NC}"
  echo "Make sure the backend is running with: cd apps/backend && uvicorn backend.app:app --reload"
fi

# Test emulator specific IP (10.0.2.2)
echo -e "\n${BLUE}Testing Emulator-specific URL:${NC}"
EMULATOR_URL="http://10.0.2.2:8000"
echo "GET $EMULATOR_URL (Android Emulator IP)"

EMULATOR_RESPONSE=$(curl -s -w "\nStatus: %{http_code}, Response time: %{time_total}s" --connect-timeout 3 "$EMULATOR_URL" || echo "Connection timed out\nStatus: 0, Response time: 0s")
EMULATOR_STATUS=$(echo "$EMULATOR_RESPONSE" | grep "Status:" | cut -d' ' -f2 | tr -d ',')

if [ "$EMULATOR_STATUS" == "200" ]; then
  echo -e "${GREEN}✓ Emulator URL is accessible${NC}"
else
  echo -e "${YELLOW}! Emulator URL not accessible (expected if not running in an emulator)${NC}"
  echo "$EMULATOR_RESPONSE"
fi

# Get local network IP
LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -n 1 | awk '{print $2}')

# Test local network IP
if [ -n "$LOCAL_IP" ]; then
  echo -e "\n${BLUE}Testing Local Network IP:${NC}"
  LOCAL_URL="http://$LOCAL_IP:8000"
  echo "GET $LOCAL_URL (Local Network IP for physical devices)"

  LOCAL_RESPONSE=$(curl -s -w "\nStatus: %{http_code}, Response time: %{time_total}s" --connect-timeout 3 "$LOCAL_URL" || echo "Connection timed out\nStatus: 0, Response time: 0s")
  LOCAL_STATUS=$(echo "$LOCAL_RESPONSE" | grep "Status:" | cut -d' ' -f2 | tr -d ',')

  if [ "$LOCAL_STATUS" == "200" ]; then
    echo -e "${GREEN}✓ Local network URL is accessible${NC}"
    echo -e "Use this URL in your config.dev.ts: ${GREEN}API_URL: \"$LOCAL_URL\"${NC}"
  else
    echo -e "${RED}✗ Local network URL not accessible${NC}"
    echo "$LOCAL_RESPONSE"
  fi
fi

# Test users endpoint
echo -e "\n${BLUE}Testing Users Endpoint:${NC}"
USERS_URL="$BACKEND_URL/users/"
echo "GET $USERS_URL"

USERS_RESPONSE=$(curl -s -w "\nStatus: %{http_code}, Response time: %{time_total}s" "$USERS_URL")
USERS_STATUS=$(echo "$USERS_RESPONSE" | grep "Status:" | cut -d' ' -f2 | tr -d ',')

if [ "$USERS_STATUS" == "200" ] || [ "$USERS_STATUS" == "401" ] || [ "$USERS_STATUS" == "403" ]; then
  echo -e "${GREEN}✓ Users endpoint is accessible (Status: $USERS_STATUS)${NC}"
else
  echo -e "${RED}✗ Users endpoint not accessible (Status: $USERS_STATUS)${NC}"
fi

# Test auth endpoint specifically
echo -e "\n${BLUE}Testing Auth Endpoint:${NC}"
AUTH_URL="$BACKEND_URL/auth/login/"
echo "POST $AUTH_URL (with test email)"

AUTH_RESPONSE=$(curl -s -X POST "$AUTH_URL" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}' \
  -w "\nStatus: %{http_code}, Response time: %{time_total}s")
AUTH_STATUS=$(echo "$AUTH_RESPONSE" | grep "Status:" | cut -d' ' -f2 | tr -d ',')

if [ "$AUTH_STATUS" == "200" ] || [ "$AUTH_STATUS" == "401" ] || [ "$AUTH_STATUS" == "422" ]; then
  echo -e "${GREEN}✓ Auth endpoint is accessible (Status: $AUTH_STATUS)${NC}"
  echo "Response from auth endpoint:"
  echo "$AUTH_RESPONSE" | head -n 1
else
  echo -e "${RED}✗ Auth endpoint not accessible (Status: $AUTH_STATUS)${NC}"
fi

# Check CORS headers
echo -e "\n${BLUE}Checking CORS Configuration:${NC}"
CORS_RESPONSE=$(curl -s -I -X OPTIONS "$BACKEND_URL/users/" | grep -i "Access-Control-Allow")

if [ -n "$CORS_RESPONSE" ]; then
  echo -e "${GREEN}✓ CORS headers configured:${NC}"
  echo "$CORS_RESPONSE"
else
  echo -e "${RED}✗ CORS headers not found!${NC}"
fi

# Check Twilio configuration
echo -e "\n${BLUE}Checking if Twilio configuration exists:${NC}"
if [ -f "/Users/adamsnows/Projects/vizinn/apps/backend/.env" ]; then
  if grep -q "account_sid" "/Users/adamsnows/Projects/vizinn/apps/backend/.env"; then
    echo -e "${GREEN}✓ Twilio configuration found in .env file${NC}"
  else
    echo -e "${RED}✗ Twilio configuration may be missing from .env file${NC}"
    echo "Make sure .env contains: account_sid, auth_token, and twilio_phone_number"
  fi
else
  echo -e "${RED}✗ .env file not found in backend directory${NC}"
  echo "Create a .env file with Twilio configuration"
fi

echo -e "\n${BLUE}Connectivity testing completed.${NC}"
echo -e "\n${YELLOW}RECOMMENDATIONS:${NC}"
echo "1. For testing on a physical device, use this URL in config.dev.ts: API_URL: \"http://$LOCAL_IP:8000\""
echo "2. For testing on Android Emulator, use: API_URL: \"http://10.0.2.2:8000\""
echo "3. For iOS Simulator, use: API_URL: \"http://localhost:8000\""
echo "4. Increase API timeout for user registration (now set to 30s)"
