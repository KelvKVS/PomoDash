# PomoDash

PomoDash é uma plataforma de gerenciamento educacional multi-tenant que combina técnicas de produtividade, como o método Pomodoro, com ferramentas de gerenciamento para alunos, professores e instituições.

## Recursos

### Para Alunos
- **Dashboard Pessoal**: Visualização de estatísticas de produtividade e desempenho
- **Tarefas**: Gerenciamento de tarefas com prazos e prioridades
- **Timer Pomodoro**: Cronômetro integrado com sessões de trabalho e pausa
- **Flashcards**: Estudos interativos com decks personalizados
- **Estatísticas**: Acompanhamento de tempo de foco, tarefas concluídas e progresso

### Para Professores
- **Gerenciamento de Turmas**: Criação e organização de turmas
- **Criação de Tarefas**: Atribuição de tarefas para alunos
- **Flashcards Pedagógicos**: Criação de decks educacionais
- **Acompanhamento de Desempenho**: Monitoramento de alunos e resultados
- **Dashboard de Professor**: Painel com métricas e informações relevantes

### Para Instituições
- **Gestão Escolar**: Administração de múltiplas escolas
- **Gerenciamento de Usuários**: Controle de contas e permissões para professores e alunos
- **Supervisão de Alunos**: Visão geral de todos os alunos
- **Relatórios Institucionais**: Análise de desempenho institucional
- **Registro de Professores**: Interface para cadastro de professores com informações específicas (disciplinas lecionadas)
- **Relatórios e Estatísticas**: Dados consolidados para tomada de decisão

### Para Administradores
- **Central de Controle**: Gerenciamento de todas as instituições
- **Gerenciamento Multi-tenant**: Controle de múltiplas instituições
- **Administração do Sistema**: Configurações e parâmetros globais
- **Monitoramento Geral**: Visão completa do sistema

## Características Visuais

- **Design Moderno**: Interface clean e intuitiva
- **Modo Escuro/Claro**: Alternância entre temas para melhor conforto visual
- **Responsividade**: Totalmente adaptável para desktop e dispositivos móveis
- **Animações Suaves**: Transições e efeitos visuais agradáveis
- **Cores Harmoniosas**: Paleta de cores cuidadosamente escolhida

## 🛠 Tecnologias

- **Frontend**: React com Vite
- **Estilização**: CSS moderno com variáveis e gradientes
- **Design Responsivo**: Flexbox e Grid
- **Modo Escuro**: Sistema de temas com persistência de preferências
- **Ícones**: Font Awesome

## Estrutura do Projeto

```
PomoDash/
├── backend/              # Código do backend (Node.js)
├── frontend/             # Código do frontend (React)
├── package.json          # Scripts para iniciar ambos os servidores
└── README.md             # Este arquivo
```

## Inicialização Rápida

### Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd PomoDash
```

2. Instale as dependências para ambos os lados:
```bash
# Instalar dependências do frontend
cd frontend
npm install
cd ..

# Instalar dependências do backend
cd backend
npm install
cd ..
```

### Execução

#### Iniciar Frontend e Backend Simultaneamente

Execute um único comando para iniciar ambos os servidores:

```bash
npm run dev
```

Este comando iniciará ambos os servidores:
- Frontend em `http://localhost:5173`
- Backend em `http://localhost:3000` (ou conforme configurado)

#### Iniciar Separadamente

**Frontend:**
```bash
cd frontend
npm run dev
```

**Backend:**
```bash
cd backend
npm run dev
```

## Funcionalidades

### Autenticação
- Sistema de login com múltiplos perfis de usuário
- Seleção de tipo de usuário (aluno, professor, instituição, administrador)
- Persistência de sessão

### Gerenciamento de Perfil
- Visualização de informações do perfil
- Troca de foto de perfil
- Edição de informações pessoais

### Sistema Multi-tenant
- Isolamento de dados entre instituições
- Gerenciamento de múltiplas instituições por administrador
- Controle de acesso baseado em permissões

### Modo Escuro
- Alternância entre temas claro e escuro
- Persistência da preferência do usuário
- Transições suaves entre modos

## Telas Disponíveis

- **Área do Aluno**: Dashboard, Tarefas, Pomodoro, Flashcards, Estatísticas
- **Área do Professor**: Turmas, Tarefas, Flashcards, Desempenho
- **Área da Instituição**: Escolas, Professores, Alunos, Relatórios
- **Área do Administrador**: Gerenciamento de instituições, configurações

## Scripts Disponíveis

No diretório raiz, você pode executar:

- `npm run dev` - Inicia frontend e backend simultaneamente
- `npm run frontend` - Inicia apenas o frontend
- `npm run backend` - Inicia apenas o backend

## Deploy

### Deploy do Backend no Render

1. Crie uma conta no Render
2. Crie um novo serviço Web Service
3. Conecte ao seu repositório Git
4. Escolha o diretório `backend`
5. Na seção "Environment Variables", adicione:
   - `MONGODB_URI`: Sua string de conexão MongoDB Atlas
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: Sua chave secreta JWT
   - `JWT_REFRESH_SECRET`: Sua chave secreta para refresh tokens
   - `FRONTEND_URL`: URL do seu frontend (ex: `https://seu-frontend.vercel.app`)
6. Defina o comando de build como: `cd backend && npm install`
7. Defina o comando de start como: `cd backend && npm start`

### Deploy do Frontend no Vercel

1. Crie uma conta no Vercel
2. Importe seu projeto do repositório Git
3. **Importante**: Durante a importação, configure o "Root Directory" para `frontend`
4. Na seção "Build & Output Settings", configure:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Na seção "Environment Variables", adicione:
   - `VITE_API_BASE_URL`: A URL do seu backend no Render (ex: `https://seu-backend.onrender.com/api`)

**Importante**: O arquivo `vercel.json` já está configurado corretamente no diretório frontend para funcionar com React Router.