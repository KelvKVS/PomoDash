# Documentação do Sistema de Autenticação - PomoDash

## Visão Geral
O sistema de autenticação do PomoDash implementa um modelo de autenticação baseado em JWT com suporte a múltiplas instituições (multi-tenant) e diferentes papéis de usuário.

## Esquema de Autenticação

### Tokens JWT
- **Access Token**: Expira em 15 minutos (configurável via `JWT_EXPIRE`)
- **Refresh Token**: Expira em 7 dias (configurável via `JWT_REFRESH_EXPIRE`)
- Algoritmo: HS256

## Tipos de Usuários e Acesso

### Funções (Roles) Disponíveis

1. **Global Admin (`global_admin`)**
   - Acesso ao painel administrativo global
   - Gerenciamento de todas as instituições
   - Gerenciamento de todos os usuários
   - Relatórios globais

2. **Admin da Escola (`school_admin`)**
   - Acesso ao painel da instituição
   - Gerenciamento de usuários da instituição
   - Gerenciamento de turmas e disciplinas
   - Relatórios da instituição

3. **Professor (`teacher`)**
   - Acesso ao painel de professor
   - Gerenciamento de turmas e disciplinas
   - Acompanhamento de alunos
   - Cadastro de tarefas e flashcards

4. **Aluno (`student`)**
   - Acesso ao painel de aluno
   - Acompanhamento de tarefas e progresso
   - Acesso ao temporizador Pomodoro
   - Estudo com flashcards

## Rotas de Autenticação

### POST `/api/auth/login`
Autentica um usuário e retorna tokens JWT e informações de acesso.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response bem-sucedido:**
```json
{
  "status": "success",
  "message": "Login realizado com sucesso",
  "data": {
    "user": {
      "id": "ObjectId",
      "name": "string",
      "email": "string",
      "role": "string",
      "roleDescription": "string",
      "school": {
        "id": "ObjectId",
        "name": "string"
      }
    },
    "access": {
      "dashboard": "string",
      "allowedAreas": ["string"],
      "permissions": {
        "read": ["string"],
        "write": ["string"],
        "delete": ["string"],
        "admin": true
      }
    },
    "tokens": {
      "access_token": "string",
      "refresh_token": "string"
    }
  }
}
```

### GET `/api/auth/access-info`
Retorna as informações de acesso e permissões do usuário autenticado.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "status": "success",
  "message": "Informações de acesso obtidas com sucesso",
  "data": {
    "user": {
      "id": "ObjectId",
      "name": "string",
      "email": "string",
      "role": "string",
      "roleDescription": "string",
      "school": {
        "id": "ObjectId",
        "name": "string"
      }
    },
    "access": {
      "dashboard": "string",
      "allowedAreas": ["string"],
      "permissions": {
        "read": ["string"],
        "write": ["string"],
        "delete": ["string"],
        "admin": true
      }
    }
  }
}
```

### POST `/api/auth/refresh`
Renova o access token usando o refresh token.

**Request Body:**
```json
{
  "refresh_token": "string"
}
```

### POST `/api/auth/logout`
Realiza o logout do usuário, invalidando o token.

## Regras de Direcionamento por Role

### Acesso ao Dashboard
- **Global Admin**: `/admin`
- **School Admin**: `/school`
- **Teacher**: `/teacher`
- **Student**: `/student`

### Áreas de Acesso por Role

#### Global Admin
- Dashboard: `admin`
- Áreas: `['dashboard', 'admin-panel', 'user-management', 'school-management', 'reports', 'settings', 'profile']`
- Permissões: Leitura/escrita/apagamento de todos os recursos

#### School Admin
- Dashboard: `school`
- Áreas: `['dashboard', 'user-management', 'class-management', 'subject-management', 'reports', 'settings', 'profile']`
- Permissões: Gerenciamento dentro da instituição

#### Teacher
- Dashboard: `teacher`
- Áreas: `['dashboard', 'class-management', 'subject-management', 'student-tracking', 'pomodoro', 'flashcards', 'tasks', 'settings', 'profile']`
- Permissões: Gerenciamento de turmas e conteúdo educacional

#### Student
- Dashboard: `student`
- Áreas: `['dashboard', 'pomodoro', 'flashcards', 'tasks', 'my-progress', 'my-classes', 'settings', 'profile']`
- Permissões: Acesso pessoal ao aprendizado

## Segurança

- Senhas são hasheadas com bcrypt (custo 12)
- Limite de tentativas de login (5 tentativas, bloqueio de 30 minutos)
- Refresh tokens expirados automaticamente
- Verificação de e-mail (não implementado completamente)
- Controle de acesso baseado em roles
- Isolamento de dados por instituição (multi-tenant)