#!/bin/bash

# Script para iniciar o servidor backend

# Diretório do monorepo
MONOREPO_DIR="$(dirname "$0")"
cd "$MONOREPO_DIR" || exit 1

# Exibe uma mensagem explicativa
echo "Iniciando o servidor backend..."
echo ""

# Inicia o servidor backend
cd packages/backend && poetry run uvicorn backend.app:app --reload
