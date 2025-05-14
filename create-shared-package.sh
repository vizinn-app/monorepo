#!/bin/bash

# Script para facilitar a criação de novos pacotes compartilhados no monorepo Vizinn
# Uso: ./create-shared-package.sh nome-do-pacote "Descrição do Pacote"

set -e

if [ "$#" -lt 2 ]; then
    echo "Uso: $0 nome-do-pacote \"Descrição do Pacote\""
    exit 1
fi

PACKAGE_NAME=$1
PACKAGE_DESCRIPTION=$2
PACKAGE_DIR="packages/$PACKAGE_NAME"

# Criar diretório do pacote
mkdir -p "$PACKAGE_DIR/src"

# Criar package.json
cat > "$PACKAGE_DIR/package.json" << EOF
{
  "name": "$PACKAGE_NAME",
  "version": "0.1.0",
  "private": true,
  "description": "$PACKAGE_DESCRIPTION",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "eslint src/**/*.ts"
  },
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}
EOF

# Criar tsconfig.json
cat > "$PACKAGE_DIR/tsconfig.json" << EOF
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "declaration": true,
    "outDir": "dist",
    "esModuleInterop": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
EOF

# Criar index.ts
cat > "$PACKAGE_DIR/src/index.ts" << EOF
/**
 * $PACKAGE_NAME
 * $PACKAGE_DESCRIPTION
 */

// Exporte as funções, classes e constantes do seu pacote daqui
export const version = '0.1.0';
EOF

# README para o pacote
cat > "$PACKAGE_DIR/README.md" << EOF
# $PACKAGE_NAME

$PACKAGE_DESCRIPTION

## Uso

\`\`\`typescript
import { /* suas funções */ } from '$PACKAGE_NAME';

// Seu código aqui
\`\`\`

## Desenvolvimento

\`\`\`bash
# Instalar dependências
pnpm install

# Compilar o pacote
pnpm build

# Modo de desenvolvimento (watch)
pnpm dev
\`\`\`
EOF

# Instalar o pacote
cd "$(dirname "$PACKAGE_DIR")"
pnpm install

echo "✅ Pacote '$PACKAGE_NAME' criado com sucesso em $PACKAGE_DIR"
echo ""
echo "Para utilizar o pacote nos projetos frontend, execute:"
echo "pnpm --filter frontend-app add \"$PACKAGE_NAME@workspace:*\""
# Frontend LP has been removed from the monorepo
echo ""
echo "Para compilar o pacote:"
echo "pnpm --filter $PACKAGE_NAME build"
