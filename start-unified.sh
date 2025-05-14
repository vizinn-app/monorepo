#!/bin/bash

# Script para iniciar os servidores frontend e backend em um único terminal usando concurrently

# Diretório do monorepo
MONOREPO_DIR="$(dirname "$0")"
cd "$MONOREPO_DIR" || exit 1

# Exibe uma mensagem explicativa
echo "Iniciando ambos os servidores em um único terminal..."
echo "Nota: O QR code e opções interativas do Expo podem não ser exibidos corretamente neste modo."
echo "Se preferir ver todas as opções do Expo, use 'pnpm start' para iniciar em terminais separados."
echo ""

# Inicia os servidores usando concurrently
pnpm concurrently \
  --names "FRONTEND,BACKEND" \
  --prefix-colors "blue,green" \
  --kill-others-on-fail \
  "cd packages/frontend-app && npx expo start" \
  "cd packages/backend && poetry run uvicorn backend.app:app --reload"
