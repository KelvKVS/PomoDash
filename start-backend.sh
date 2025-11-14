#!/bin/bash
# Script de inicialização do backend para o Render

# Obter o diretório atual do projeto
PROJECT_DIR=$(pwd)

# Navegar para o diretório backend
cd "$PROJECT_DIR/backend"

# Instalar dependências no backend
echo "Instalando dependências do backend..."
npm install

# Iniciar o servidor backend
echo "Iniciando o servidor backend..."
node src/server.js