#!/bin/bash

# Colors for better output
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PROJECT_ROOT=$(pwd)
BACKEND_DIR="$PROJECT_ROOT/apps/backend"
FRONTEND_DIR="$PROJECT_ROOT/apps/frontend-app"

echo -e "${BLUE}Starting Vizinn Development Environment${NC}"

# Check if tmux is installed
if ! command -v tmux &> /dev/null; then
    echo -e "${YELLOW}tmux is not installed. This script works best with tmux.${NC}"
    echo "Install tmux with: brew install tmux"
    echo -e "${YELLOW}Starting services in separate terminals...${NC}"

    # Start backend and frontend in separate terminals
    osascript -e 'tell application "Terminal" to do script "cd '$BACKEND_DIR' && python -m uvicorn backend.app:app --reload --port 8000"'
    osascript -e 'tell application "Terminal" to do script "cd '$FRONTEND_DIR' && npm start"'

    echo -e "${GREEN}Services started in separate terminal windows${NC}"
    exit 0
fi

# Create a new tmux session
SESSION_NAME="vizinn-dev"

# Kill the session if it already exists
tmux kill-session -t $SESSION_NAME 2>/dev/null

# Create a new session
tmux new-session -d -s $SESSION_NAME

# Split the window horizontally
tmux split-window -h -t $SESSION_NAME

# Select the first pane and start the backend
tmux select-pane -t 0
tmux send-keys -t $SESSION_NAME:0.0 "cd $BACKEND_DIR && python -m uvicorn backend.app:app --reload --port 8000" C-m

# Select the second pane and start the frontend
tmux select-pane -t 1
tmux send-keys -t $SESSION_NAME:0.1 "cd $FRONTEND_DIR && npm start" C-m

# Attach to the session
echo -e "${GREEN}Starting development environment in tmux...${NC}"
echo -e "${YELLOW}Press Ctrl+B then D to detach from tmux without stopping the services${NC}"
tmux attach-session -t $SESSION_NAME
