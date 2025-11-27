// src/lib/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

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
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        data,
      });
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
      try {
        let avatarUrl = null;
        
        // Verifica se há uma imagem para upload
        const imageFile = profileData.get('profilePicture');
        console.log('📸 Arquivo de imagem:', imageFile);
        
        if (imageFile && imageFile instanceof File) {
          // Primeiro faz o upload da imagem
          const uploadFormData = new FormData();
          uploadFormData.append('file', imageFile);
          
          const token = localStorage.getItem('token');
          console.log('🔑 Token presente:', !!token);
          console.log('📤 Enviando upload para:', `${API_BASE_URL}/upload`);
          
          const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: uploadFormData,
          });
          
          console.log('📥 Status do upload:', uploadResponse.status);
          
          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json();
            console.error('❌ Erro no upload:', errorData);
            throw new Error(errorData.message || 'Erro ao fazer upload da imagem');
          }
          
          const uploadResult = await uploadResponse.json();
          console.log('✅ Resultado do upload:', uploadResult);
          avatarUrl = uploadResult.data.url;
          console.log('🔗 URL do avatar:', avatarUrl);
        }
        
        // Agora atualiza o perfil com a URL da imagem (se houver)
        const updateData = {
          name: profileData.get('name'),
        };
        
        if (avatarUrl) {
          updateData.profile = {
            avatar: avatarUrl
          };
        }
        
        console.log('📝 Dados para atualizar perfil:', updateData);
        
        const result = await request('/auth/profile', {
          method: 'PUT',
          body: JSON.stringify(updateData),
        });
        
        console.log('✅ Resultado da atualização do perfil:', result);
        return result;
      } catch (error) {
        console.error('❌ Erro na requisição:', error.message);
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

  // Criar/registrar um relatório exportado
  createReport: async (reportData) => {
    return request('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
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

  // Obter tarefas por turma
  getTasksByClass: async (classId) => {
    return request(`/tasks/class/${classId}`, {
      method: 'GET',
    });
  },

  // Obter tarefas por professor
  getTasksByTeacher: async (teacherId) => {
    return request(`/tasks/teacher/${teacherId}`, {
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

  // Obter estatísticas de flashcards por usuário
  getFlashcardStatsByUser: async (userId) => {
    return request(`/flashcards/stats/user/${userId}`, {
      method: 'GET',
    });
  },

  // Obter estatísticas de flashcards por turma
  getFlashcardStatsByClass: async (classId) => {
    return request(`/flashcards/stats/class/${classId}`, {
      method: 'GET',
    });
  },

  // Obter estatísticas agregadas de flashcards
  getAggregateFlashcardStats: async (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return request(`/flashcards/stats/aggregate?${queryParams}`, {
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

  // Obter flashcards por professor
  getFlashcardsByTeacher: async (teacherId) => {
    return request(`/flashcards/teacher/${teacherId}`, {
      method: 'GET',
    });
  },

  // Obter flashcards por turma
  getFlashcardsByClass: async (classId) => {
    return request(`/flashcards/class/${classId}`, {
      method: 'GET',
    });
  },
};

// Funções para Turmas
export const classAPI = {
  // Obter todas as turmas
  getClasses: async (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return request(`/classes?${queryParams}`, {
      method: 'GET',
    });
  },

  // Obter turmas por professor
  getClassesByTeacher: async (teacherId) => {
    return request(`/classes/teacher/${teacherId}`, {
      method: 'GET',
    });
  },

  // Obter turma específica
  getClassById: async (classId) => {
    return request(`/classes/${classId}`, {
      method: 'GET',
    });
  },

  // Criar nova turma
  createClass: async (classData) => {
    return request('/classes', {
      method: 'POST',
      body: JSON.stringify(classData),
    });
  },

  // Atualizar turma
  updateClass: async (classId, classData) => {
    return request(`/classes/${classId}`, {
      method: 'PUT',
      body: JSON.stringify(classData),
    });
  },

  // Arquivar turma
  archiveClass: async (classId) => {
    return request(`/classes/${classId}`, {
      method: 'DELETE',
    });
  },

  // Adicionar aluno à turma
  addStudentToClass: async (classId, studentData) => {
    return request(`/classes/${classId}/students`, {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
  },

  // Remover aluno da turma
  removeStudentFromClass: async (classId, studentId) => {
    return request(`/classes/${classId}/students/${studentId}`, {
      method: 'DELETE',
    });
  },

  // Obter alunos de uma turma
  getClassStudents: async (classId) => {
    return request(`/classes/${classId}/students`, {
      method: 'GET',
    });
  },
};

// Funções para Escolas
export const schoolAPI = {
  // Obter todas as escolas
  getSchools: async (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return request(`/schools?${queryParams}`, {
      method: 'GET',
    });
  },

  // Obter escola específica
  getSchoolById: async (schoolId) => {
    return request(`/schools/${schoolId}`, {
      method: 'GET',
    });
  },

  // Obter estatísticas da escola
  getSchoolStats: async (schoolId) => {
    return request(`/schools/${schoolId}/stats`, {
      method: 'GET',
    });
  },

  // Criar nova escola
  createSchool: async (schoolData) => {
    return request('/schools', {
      method: 'POST',
      body: JSON.stringify(schoolData),
    });
  },

  // Atualizar escola
  updateSchool: async (schoolId, schoolData) => {
    return request(`/schools/${schoolId}`, {
      method: 'PUT',
      body: JSON.stringify(schoolData),
    });
  },

  // Inativar/deletar escola
  deleteSchool: async (schoolId, permanent = false) => {
    const url = permanent ? `/schools/${schoolId}?permanent=true` : `/schools/${schoolId}`;
    return request(url, {
      method: 'DELETE',
    });
  },
};

// Funções para Desempenho
export const performanceAPI = {
  // Obter desempenho das turmas do professor
  getTeacherPerformance: async (teacherId) => {
    return request(`/performance/teacher/${teacherId}`, {
      method: 'GET',
    });
  },

  // Obter desempenho de uma turma específica
  getClassPerformance: async (classId) => {
    return request(`/performance/class/${classId}`, {
      method: 'GET',
    });
  },

  // Obter desempenho de um aluno específico
  getStudentPerformance: async (studentId) => {
    return request(`/performance/student/${studentId}`, {
      method: 'GET',
    });
  },
};

// Funções para Upload de arquivos
export const uploadAPI = {
  // Upload de arquivo único
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao fazer upload');
    }
    
    return response.json();
  },

  // Upload de múltiplos arquivos
  uploadFiles: async (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/upload/multiple`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao fazer upload');
    }
    
    return response.json();
  },

  // Deletar arquivo
  deleteFile: async (filename) => {
    return request(`/upload/${filename}`, {
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
        // eslint-disable-next-line no-unused-vars
        } catch (refreshError) {
          // Se não conseguir refresh, limpa o usuário
          authAPI.logout();
          window.location.href = '/login';
        }
      }
      
      return response;
    } catch (error) {
      // Verifica se é um erro de rede (não é um erro 401, 404, etc., mas falha de conexão)
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        // Erros de rede como "Failed to fetch", "NetworkError", etc.
        // Não logar esses erros para reduzir o spam no console
        console.warn('Erro de conexão com o servidor:', error.message);
      } else {
        console.error('Erro na requisição interceptada:', error);
      }
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