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