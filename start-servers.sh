#!/bin/bash

# Script para iniciar os servidores frontend e backend em diferentes terminais

# Cores para os terminais
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Diretório do monorepo
MONOREPO_DIR="$(dirname "$0")"
cd "$MONOREPO_DIR" || exit 1

# Determina qual terminal está disponível
if command -v osascript &> /dev/null; then
    # macOS - usa Apple Script para abrir terminais
    echo -e "${BLUE}Iniciando servidor Frontend (Expo)...${NC}"
    osascript -e 'tell application "Terminal" to do script "cd '"$MONOREPO_DIR"'/packages/frontend-app && npx expo start"'

    echo -e "${GREEN}Iniciando servidor Backend (FastAPI)...${NC}"
    osascript -e 'tell application "Terminal" to do script "cd '"$MONOREPO_DIR"'/packages/backend && poetry run uvicorn backend.app:app --reload"'
elif command -v gnome-terminal &> /dev/null; then
    # Linux com GNOME
    echo -e "${BLUE}Iniciando servidor Frontend (Expo)...${NC}"
    gnome-terminal -- bash -c "cd '$MONOREPO_DIR/packages/frontend-app' && npx expo start; exec bash"

    echo -e "${GREEN}Iniciando servidor Backend (FastAPI)...${NC}"
    gnome-terminal -- bash -c "cd '$MONOREPO_DIR/packages/backend' && poetry run uvicorn backend.app:app --reload; exec bash"
elif command -v xterm &> /dev/null; then
    # Linux com xterm
    echo -e "${BLUE}Iniciando servidor Frontend (Expo)...${NC}"
    xterm -e "cd '$MONOREPO_DIR/packages/frontend-app' && npx expo start; bash" &

    echo -e "${GREEN}Iniciando servidor Backend (FastAPI)...${NC}"
    xterm -e "cd '$MONOREPO_DIR/packages/backend' && poetry run uvicorn backend.app:app --reload; bash" &
else
    echo "Não foi possível determinar qual terminal usar."
    echo "Por favor, inicie os servidores manualmente:"
    echo "  1. Terminal 1: cd $MONOREPO_DIR/packages/frontend-app && npx expo start"
    echo "  2. Terminal 2: cd $MONOREPO_DIR/packages/backend && poetry run uvicorn backend.app:app --reload"
    exit 1
fi

echo -e "${BLUE}Servidores iniciados em terminais separados.${NC}"
echo -e "Você pode ver o QR code e opções completas do Expo no terminal do Frontend."
