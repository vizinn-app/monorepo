#!/bin/bash

# Script para iniciar o servidor backend

# Cores para os terminais
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Diretório do monorepo
MONOREPO_DIR="$(dirname "$0")"
cd "$MONOREPO_DIR" || exit 1

# Determina qual terminal está disponível
if command -v osascript &> /dev/null; then
    # macOS - usa Apple Script para abrir terminais
    echo -e "${GREEN}Iniciando servidor Backend (FastAPI)...${NC}"
    osascript -e 'tell application "Terminal" to do script "cd '"$MONOREPO_DIR"'/packages/backend && poetry run uvicorn backend.app:app --reload"'
elif command -v gnome-terminal &> /dev/null; then
    # Linux com GNOME Terminal
    echo -e "${GREEN}Iniciando servidor Backend (FastAPI)...${NC}"
    gnome-terminal -- bash -c "cd '$MONOREPO_DIR/packages/backend' && poetry run uvicorn backend.app:app --reload; exec bash"
elif command -v xterm &> /dev/null; then
    # Linux com xterm
    echo -e "${GREEN}Iniciando servidor Backend (FastAPI)...${NC}"
    xterm -e "cd '$MONOREPO_DIR/packages/backend' && poetry run uvicorn backend.app:app --reload; bash" &
else
    echo "Não foi possível determinar qual terminal usar."
    echo "Por favor, inicie o servidor manualmente:"
    echo "  Terminal: cd $MONOREPO_DIR/packages/backend && poetry run uvicorn backend.app:app --reload"
    exit 1
fi

echo -e "${GREEN}Servidor backend iniciado em terminal separado.${NC}"
