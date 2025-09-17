# Pomodash Backend

Backend da plataforma Pomodash - Sistema de produtividade educacional multi-tenant.

## 📋 Pré-requisitos

- Node.js v18+ 
- MongoDB v5+
- NPM ou Yarn

## 🚀 Instalação e Configuração

### 1. Clone o repositório e instale dependências

```bash
# Instalar dependências
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

**Variáveis obrigatórias:**
- `MONGODB_URI` - String de conexão do MongoDB
- `JWT_SECRET` - Chave secreta para JWT (mínimo 32 caracteres)
- `JWT_REFRESH_SECRET` - Chave secreta para refresh token

### 3. Iniciar o servidor

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

O servidor rodará na porta configurada (padrão: 3001).

## 🏗️ Estrutura do Projeto

```
src/
├── config/          # Configurações (banco, etc.)
├── middleware/      # Middlewares personalizados
├── models/          # Models do MongoDB/Mongoose  
├── routes/          # Rotas da API
├── controllers/     # Controladores (futuro)
├── utils/           # Utilitários
└── server.js        # Arquivo principal
```

## 📊 Models Implementados

### School (Multi-tenant)
- Gerenciamento de instituições de ensino
- Configurações por escola (Pomodoro, temas, etc.)
- Limites por plano (usuários, armazenamento)
- Status e controle de assinatura

### User
- Perfis: global_admin, school_admin, teacher, student
- Autenticação JWT + Refresh Token
- Configurações personalizadas de Pomodoro
- Controle de tentativas de login
- Suporte a OAuth Google (preparado)

### Task
- Criação por professores e alunos
- Atribuição para múltiplos usuários
- Configurações específicas de Pomodoro por tarefa
- Tags, anexos e prioridades
- Métricas de conclusão

### PomodoroSession
- Registro completo de sessões
- Controle de pausas e interrupções
- Feedback do usuário (produtividade, foco)
- Métricas e estatísticas
- Associação com tarefas

## 🔐 Autenticação

Sistema de autenticação baseado em JWT com refresh tokens:

- **Access Token**: Curta duração (15min padrão)
- **Refresh Token**: Longa duração (7 dias padrão) 
- **Multi-tenant**: Isolamento automático por escola

### Endpoints de Auth

```
POST /api/auth/register     # Registrar usuário
POST /api/auth/login        # Login
POST /api/auth/refresh      # Renovar access token
POST /api/auth/logout       # Logout
GET  /api/auth/me           # Dados do usuário logado
POST /api/auth/forgot-password    # Solicitar reset de senha
POST /api/auth/reset-password     # Redefinir senha
PUT  /api/auth/change-password    # Alterar senha
```

## 🏢 Multi-tenant

O sistema implementa multi-tenancy através do `school_id`:

- **Isolamento automático**: Todos os dados são filtrados por escola
- **Middleware**: Adiciona `tenant_id` automaticamente às requests
- **Global Admin**: Pode acessar dados de qualquer escola
- **Verificações**: Usuários só acessam dados de sua escola

## 🔧 API Endpoints

### Health Check
```
GET /api/health
```

### Schools
```
GET    /api/schools         # Listar escolas
POST   /api/schools         # Criar escola (Global Admin)
GET    /api/schools/:id     # Obter escola
PUT    /api/schools/:id     # Atualizar escola
DELETE /api/schools/:id     # Deletar/Inativar escola
GET    /api/schools/:id/stats # Estatísticas da escola
```

### Users (próxima implementação)
```
GET    /api/users           # Listar usuários da escola
POST   /api/users           # Criar usuário
GET    /api/users/:id       # Obter usuário
PUT    /api/users/:id       # Atualizar usuário
DELETE /api/users/:id       # Deletar usuário
```

## 🧪 Testes

```bash
# Executar testes
npm test

# Testes em modo watch
npm run test:watch
```

## 🔒 Segurança Implementada

- ✅ Helmet para headers de segurança
- ✅ Rate limiting (100 req/15min por IP)
- ✅ CORS configurado
- ✅ Validação de entrada com express-validator
- ✅ Hash de senhas com bcrypt
- ✅ JWT com refresh tokens
- ✅ Controle de tentativas de login
- ✅ HTTPS obrigatório em produção

## 📈 Performance

- ✅ Compressão gzip
- ✅ Índices otimizados no MongoDB
- ✅ Populate seletivo
- ✅ Paginação implementada
- ✅ Connection pooling MongoDB

## 🚦 Status dos Requisitos

### Essenciais (RF)
- ✅ RF-001: Manutenção de Escolas (Multi-tenant)
- ✅ RF-002: Gerenciamento de Usuários da Escola  
- ✅ RF-003: Autenticação e Autorização Seguras
- ✅ RF-004: Timer Pomodoro Educacional (Model)
- ✅ RF-005: Gerenciamento de Tarefas e Atividades (Model)

### Importantes (RF)
- 🚧 RF-006: Módulo de Flashcards (próximo)
- 🚧 RF-007: Dashboard e Relatórios (próximo)

### Não Funcionais (NF)
- ✅ NF-001: Usabilidade/Responsivo (preparado)
- ✅ NF-002: Desempenho (<3s)
- ✅ NF-003: Segurança (JWT, HTTPS, bcrypt)
- ✅ NF-004: Escalabilidade (arquitetura modular)
- ✅ NF-005: Disponibilidade (preparado)
- 🚧 NF-006: Acessibilidade (frontend)

## 📝 Próximos Passos

1. **Implementar rotas restantes:**
   - Users CRUD
   - Tasks CRUD  
   - Pomodoro Sessions CRUD
   - Flashcards (futuro)

2. **Testes unitários e integração**

3. **Documentação da API (Swagger)**

4. **Setup de CI/CD**

5. **Frontend React + Vite**

## 🐛 Debugging

### Logs importantes
- Conexões MongoDB
- Erros de autenticação
- Rate limiting hits
- Validações de entrada

### Comandos úteis

```bash
# Ver logs detalhados
DEBUG=* npm run dev

# Testar conexão MongoDB
node -e "require('./src/config/database')()"

# Verificar estrutura do banco
mongo pomodash --eval "db.getCollectionNames()"
```

## 🔧 Configuração de Desenvolvimento

### MongoDB Local
```bash
# Instalar MongoDB
# Ubuntu/Debian
sudo apt install mongodb

# macOS
brew install mongodb-community

# Iniciar serviço
sudo systemctl start mongod
# ou
brew services start mongodb-community
```

### Variáveis .env para desenvolvimento
```env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pomodash
JWT_SECRET=sua_chave_super_secreta_com_pelo_menos_32_caracteres
JWT_EXPIRE=15m
JWT_REFRESH_SECRET=sua_chave_refresh_super_secreta_diferente_da_primeira
JWT_REFRESH_EXPIRE=7d
```

## 📚 Recursos

- [Documentação Mongoose](https://mongoosejs.com/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)  
- [JWT.io](https://jwt.io/) - Debugger de tokens
- [MongoDB Compass](https://www.mongodb.com/products/compass) - GUI para MongoDB

## 🤝 Contribuição

1. Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.