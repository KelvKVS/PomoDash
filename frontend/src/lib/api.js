// src/lib/api.js
const API_BASE_URL = 'http://localhost:3001/api';

// Função para fazer requisições HTTP com tratamento de erro
const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Adiciona o token de autenticação se estiver disponível
  const token = localStorage.getItem('token');
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Erro ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('Erro na requisição:', error.message);
    throw error;
  }
};

// Funções de autenticação
export const authAPI = {
  // Obter escolas ativas
  getSchools: async (status = 'active', page = 1, limit = 100) => {
    return request(`/schools?status=${status}&page=${page}&limit=${limit}`, {
      method: 'GET',
    });
  },

  // Login
  login: async (email, password) => {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Registro
  register: async (userData) => {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Obter informações do usuário
  getUserInfo: async () => {
    return request('/auth/me');
  },

  // Obter informações de acesso
  getAccessInfo: async () => {
    return request('/auth/access-info');
  },

  // Atualizar perfil do usuário
  updateProfile: async (profileData) => {
    // Verifica se os dados incluem um arquivo para upload
    if (profileData instanceof FormData) {
      // Para upload de arquivos, precisamos construir a configuração manualmente
      // sem definir Content-Type para que o navegador defina automaticamente com o boundary
      const config = {
        method: 'PUT',
        body: profileData,
      };

      // Adiciona o token de autenticação
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`
        };
      }

      try {
        const url = `${API_BASE_URL}/auth/profile`;
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Erro ${response.status}: ${response.statusText}`);
        }

        return data;
      } catch (error) {
        console.error('Erro na requisição:', error.message);
        throw error;
      }
    } else {
      // Para dados normais em JSON
      return request('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      });
    }
  },

  // Logout
  logout: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        await request('/auth/logout', {
          method: 'POST',
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    }
    // Limpar tokens do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  // Solicitar redefinição de senha
  forgotPassword: async (email) => {
    return request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Redefinir senha
  resetPassword: async (token, newPassword) => {
    return request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password: newPassword }),
    });
  },

  // Alterar senha
  changePassword: async (currentPassword, newPassword) => {
    return request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  // Refresh token
  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Nenhum refresh token disponível');
    }

    const result = await request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    // Atualizar o token
    localStorage.setItem('token', result.data.access_token);
    return result.data.access_token;
  },
};

// Funções para relatórios
export const reportAPI = {
  // Obter todos os relatórios
  getReports: async (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return request(`/reports?${queryParams}`, {
      method: 'GET',
    });
  },

  // Obter relatório específico
  getReportById: async (reportId) => {
    return request(`/reports/${reportId}`, {
      method: 'GET',
    });
  },

  // Gerar relatório de desempenho de aluno
  generateStudentReport: async (studentId, period) => {
    return request(`/reports/generate/student/${studentId}`, {
      method: 'POST',
      body: JSON.stringify(period),
    });
  },

  // Obter relatórios de um aluno específico
  getStudentReports: async (studentId) => {
    return request(`/reports/student/${studentId}`, {
      method: 'GET',
    });
  },
};

// Funções para gerenciamento de usuários
export const userAPI = {
  // Criar novo usuário
  createUser: async (userData) => {
    return request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Obter todos os usuários da escola
  getUsers: async (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return request(`/users?${queryParams}`, {
      method: 'GET',
    });
  },

  // Obter usuário específico
  getUserById: async (userId) => {
    return request(`/users/${userId}`, {
      method: 'GET',
    });
  },

  // Atualizar usuário
  updateUser: async (userId, userData) => {
    return request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Inativar usuário
  deleteUser: async (userId) => {
    return request(`/users/${userId}`, {
      method: 'DELETE',
    });
  },
};

// Funções para Pomodoro
export const pomodoroAPI = {
  // Iniciar nova sessão de pomodoro
  startSession: async (sessionData) => {
    return request('/pomodoro/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  },

  // Obter sessões de pomodoro
  getSessions: async (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return request(`/pomodoro/sessions?${queryParams}`, {
      method: 'GET',
    });
  },

  // Obter sessão ativa
  getActiveSession: async () => {
    return request('/pomodoro/sessions/active', {
      method: 'GET',
    });
  },

  // Obter sessão específica
  getSessionById: async (sessionId) => {
    return request(`/pomodoro/sessions/${sessionId}`, {
      method: 'GET',
    });
  },

  // Pausar sessão
  pauseSession: async (sessionId) => {
    return request(`/pomodoro/sessions/${sessionId}/pause`, {
      method: 'PUT',
    });
  },

  // Retomar sessão
  resumeSession: async (sessionId) => {
    return request(`/pomodoro/sessions/${sessionId}/resume`, {
      method: 'PUT',
    });
  },

  // Completar sessão
  completeSession: async (sessionId, feedback = {}) => {
    return request(`/pomodoro/sessions/${sessionId}/complete`, {
      method: 'PUT',
      body: JSON.stringify({ feedback }),
    });
  },

  // Abandonar sessão
  abandonSession: async (sessionId) => {
    return request(`/pomodoro/sessions/${sessionId}/abandon`, {
      method: 'PUT',
    });
  },

  // Obter estatísticas de pomodoro
  getStats: async () => {
    return request('/pomodoro/stats', {
      method: 'GET',
    });
  },
};

// Funções para Tarefas
export const taskAPI = {
  // Obter tarefas
  getTasks: async (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return request(`/tasks?${queryParams}`, {
      method: 'GET',
    });
  },

  // Criar tarefa
  createTask: async (taskData) => {
    return request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  // Obter tarefa específica
  getTaskById: async (taskId) => {
    return request(`/tasks/${taskId}`, {
      method: 'GET',
    });
  },

  // Atualizar tarefa
  updateTask: async (taskId, taskData) => {
    return request(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  },

  // Atualizar status de tarefa
  updateTaskStatus: async (taskId, status) => {
    return request(`/tasks/${taskId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Arquivar tarefa
  archiveTask: async (taskId) => {
    return request(`/tasks/${taskId}`, {
      method: 'DELETE',
    });
  },
};

// Funções para Flashcards
export const flashcardAPI = {
  // Obter todos os flashcards
  getFlashcards: async () => {
    return request('/flashcards', {
      method: 'GET',
    });
  },

  // Criar novo flashcard
  createFlashcard: async (flashcardData) => {
    return request('/flashcards', {
      method: 'POST',
      body: JSON.stringify(flashcardData),
    });
  },

  // Obter flashcard por ID
  getFlashcardById: async (flashcardId) => {
    return request(`/flashcards/${flashcardId}`, {
      method: 'GET',
    });
  },

  // Atualizar flashcard
  updateFlashcard: async (flashcardId, flashcardData) => {
    return request(`/flashcards/${flashcardId}`, {
      method: 'PUT',
      body: JSON.stringify(flashcardData),
    });
  },

  // Deletar flashcard
  deleteFlashcard: async (flashcardId) => {
    return request(`/flashcards/${flashcardId}`, {
      method: 'DELETE',
    });
  },
};

// Interceptor para refresh automático de token
export const setupTokenInterceptor = () => {
  // Adiciona um interceptor para refresh automático de token
  const originalFetch = window.fetch;
  
  window.fetch = async (...args) => {
    let [resource, config] = args;
    
    try {
      let response = await originalFetch(resource, config);
      
      // Se receber 401, tenta refresh do token
      if (response.status === 401) {
        try {
          await authAPI.refreshToken();
          // Reenvia a requisição original com o novo token
          if (config && config.headers) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
          } else {
            config = {
              ...config,
              headers: {
                ...config?.headers,
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            };
          }
          response = await originalFetch(resource, config);
        } catch (refreshError) {
          // Se não conseguir refresh, limpa o usuário
          authAPI.logout();
          window.location.href = '/login';
        }
      }
      
      return response;
    } catch (error) {
      console.error('Erro na requisição interceptada:', error);
      throw error;
    }
  };
};

// Função para inicializar a aplicação com interceptors
export const initializeApp = () => {
  setupTokenInterceptor();
  
  // Verifica se o usuário já está logado ao inicializar
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      // Opcional: validar o token ou atualizar informações do usuário
      console.log('Usuário encontrado no localStorage:', user);
    } catch (error) {
      console.error('Erro ao parsear usuário do localStorage:', error);
      // Limpa o usuário inválido
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  }
};