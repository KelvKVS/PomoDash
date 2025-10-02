const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const School = require('../models/School');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Utilitários para JWT
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { user_id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '15m' }
  );
  
  const refreshToken = jwt.sign(
    { user_id: userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
  );
  
  return { accessToken, refreshToken };
};

// Validadores
const registerValidation = [
  body('name').notEmpty().withMessage('Nome é obrigatório').trim(),
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('role').isIn(['school_admin', 'teacher', 'student']).withMessage('Role inválido')
];

const loginValidation = [
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('password').notEmpty().withMessage('Senha é obrigatória')
];

// @route   POST /api/auth/register
// @desc    Registrar novo usuário
// @access  Public (mas validado pelo school_admin)
router.post('/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Dados de entrada inválidos',
        details: errors.array()
      });
    }

    const { name, email, password, role } = req.body;

    // Verificar se email já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email já cadastrado'
      });
    }

    // Procurar pela instituição AESA como padrão - garantir que ela existe
    const aesaSchool = await School.findOne({ slug: 'aesa', status: 'active' });
    if (!aesaSchool) {
      // Se AESA não existir, usar uma escola ativa qualquer como fallback
      const fallbackSchool = await School.findOne({ status: 'active' });
      if (!fallbackSchool) {
        return res.status(500).json({
          status: 'error',
          message: 'Nenhuma instituição disponível para registro'
        });
      }
      var targetSchool = fallbackSchool;
    } else {
      var targetSchool = aesaSchool;
    }

    // Criar usuário com instituição AESA
    const user = new User({
      name,
      email,
      password,
      role,
      school_id: targetSchool._id,
      status: 'active', // Direto ativo por enquanto, depois implementar aprovação
      emailVerified: false
    });

    await user.save();

    // Gerar tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Salvar refresh token
    user.addRefreshToken(refreshToken);
    await user.save();

    res.status(201).json({
      status: 'success',
      message: 'Usuário registrado com sucesso',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          school_id: user.school_id
        },
        tokens: {
          access_token: accessToken,
          refresh_token: refreshToken
        }
      }
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// Função para determinar as áreas de acesso com base na role
const getAccessAreas = (role) => {
  const areas = {
    dashboard: true,
    profile: true,
    settings: true
  };

  switch (role) {
    case 'global_admin':
      areas.dashboard = 'admin';
      areas.adminPanel = true;
      areas.userManagement = true;
      areas.schoolManagement = true;
      areas.reports = true;
      break;
    
    case 'school_admin':
      areas.dashboard = 'school';
      areas.userManagement = true;
      areas.classManagement = true;
      areas.subjectManagement = true;
      areas.reports = true;
      break;
    
    case 'teacher':
      areas.dashboard = 'teacher';
      areas.classManagement = true;
      areas.subjectManagement = true;
      areas.studentTracking = true;
      areas.pomodoro = true;
      areas.flashcards = true;
      areas.tasks = true;
      break;
    
    case 'student':
      areas.dashboard = 'student';
      areas.pomodoro = true;
      areas.flashcards = true;
      areas.tasks = true;
      areas.myProgress = true;
      areas.myClasses = true;
      break;
  }

  return areas;
};

// @route   POST /api/auth/login
// @desc    Login de usuário
// @access  Public
router.post('/login', loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Dados de entrada inválidos',
        details: errors.array()
      });
    }

    const { email, password } = req.body;

    // Buscar usuário com senha
    const user = await User.findOne({ email }).select('+password').populate('school_id', 'name status');
    
    if (!user || !(await user.comparePassword(password))) {
      // Incrementar tentativas de login se usuário existir
      if (user) {
        await user.incrementLoginAttempts();
      }
      
      return res.status(401).json({
        status: 'error',
        message: 'Credenciais inválidas'
      });
    }

    // Verificar se conta não está bloqueada
    if (user.isLocked) {
      return res.status(423).json({
        status: 'error',
        message: 'Conta temporariamente bloqueada devido a muitas tentativas de login'
      });
    }

    // Verificar status do usuário
    if (user.status !== 'active') {
      return res.status(401).json({
        status: 'error',
        message: 'Conta inativa ou pendente de aprovação'
      });
    }

    // Reset tentativas de login
    await user.resetLoginAttempts();

    // Atualizar último login
    user.lastLogin = new Date();
    await user.save();

    // Gerar tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Salvar refresh token
    user.addRefreshToken(refreshToken);
    await user.save();

    // Determinar áreas de acesso
    const accessAreas = getAccessAreas(user.role);

    res.json({
      status: 'success',
      message: 'Login realizado com sucesso',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          roleDescription: getRoleDescription(user.role),
          school: {
            id: user.school_id._id,
            name: user.school_id.name
          }
        },
        access: {
          dashboard: accessAreas.dashboard,
          allowedAreas: getAccessibleAreas(user.role),
          permissions: getPermissionsByRole(user.role)
        },
        tokens: {
          access_token: accessToken,
          refresh_token: refreshToken
        }
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// Função para obter descrição da role
function getRoleDescription(role) {
  const descriptions = {
    global_admin: 'Administrador Global',
    school_admin: 'Administrador Escolar',
    teacher: 'Professor',
    student: 'Aluno'
  };
  return descriptions[role] || 'Função desconhecida';
}

// Função para obter áreas acessíveis por role
function getAccessibleAreas(role) {
  const areas = {
    global_admin: ['dashboard', 'admin-panel', 'user-management', 'school-management', 'reports', 'settings', 'profile'],
    school_admin: ['dashboard', 'user-management', 'class-management', 'subject-management', 'reports', 'settings', 'profile'],
    teacher: ['dashboard', 'class-management', 'subject-management', 'student-tracking', 'pomodoro', 'flashcards', 'tasks', 'settings', 'profile'],
    student: ['dashboard', 'pomodoro', 'flashcards', 'tasks', 'my-progress', 'my-classes', 'settings', 'profile']
  };
  
  return areas[role] || areas.student;
}

// Função para obter permissões por role
function getPermissionsByRole(role) {
  const permissions = {
    global_admin: {
      read: ['users', 'schools', 'classes', 'students', 'teachers'],
      write: ['users', 'schools', 'classes', 'students', 'teachers'],
      delete: ['users', 'schools', 'classes', 'students', 'teachers'],
      admin: true
    },
    school_admin: {
      read: ['users', 'classes', 'students', 'teachers'],
      write: ['users', 'classes', 'students', 'teachers'],
      delete: ['users', 'classes', 'students', 'teachers'],
      admin: true
    },
    teacher: {
      read: ['classes', 'students', 'tasks', 'flashcards'],
      write: ['tasks', 'flashcards', 'student-grades'],
      delete: ['tasks', 'flashcards'],
      admin: false
    },
    student: {
      read: ['tasks', 'flashcards', 'own-grades'],
      write: ['task-completions', 'flashcard-reviews'],
      delete: [],
      admin: false
    }
  };
  
  return permissions[role] || permissions.student;
}

// @route   POST /api/auth/refresh
// @desc    Renovar access token usando refresh token
// @access  Public
router.post('/refresh', async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(401).json({
        status: 'error',
        message: 'Refresh token requerido'
      });
    }

    // Verificar refresh token
    const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);

    // Buscar usuário
    const user = await User.findById(decoded.user_id);
    if (!user || user.status !== 'active') {
      return res.status(401).json({
        status: 'error',
        message: 'Usuário inválido'
      });
    }

    // Verificar se refresh token existe no banco
    const tokenExists = user.refreshTokens.some(t => t.token === refresh_token && t.expiresAt > new Date());
    if (!tokenExists) {
      return res.status(401).json({
        status: 'error',
        message: 'Refresh token inválido ou expirado'
      });
    }

    // Gerar novo access token
    const { accessToken } = generateTokens(user._id);

    res.json({
      status: 'success',
      data: {
        access_token: accessToken
      }
    });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Refresh token expirado'
      });
    }

    console.error('Erro ao renovar token:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout do usuário
// @access  Private
router.post('/logout', auth, async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (refresh_token) {
      // Remover refresh token específico
      req.user.removeRefreshToken(refresh_token);
    } else {
      // Remover todos os refresh tokens (logout de todos dispositivos)
      req.user.refreshTokens = [];
    }

    await req.user.save();

    res.json({
      status: 'success',
      message: 'Logout realizado com sucesso'
    });

  } catch (error) {
    console.error('Erro no logout:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Obter dados do usuário logado
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('school_id', 'name settings features')
      .select('-refreshTokens');

    res.json({
      status: 'success',
      data: { user }
    });

  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Solicitar reset de senha
// @access  Public
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Email inválido').normalizeEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Email inválido'
      });
    }

    const { email } = req.body;

    const user = await User.findOne({ email, status: 'active' });
    if (!user) {
      // Por segurança, sempre retorna sucesso
      return res.json({
        status: 'success',
        message: 'Se o email existir, você receberá instruções para redefinir sua senha'
      });
    }

    // Gerar token de reset
    const resetToken = user.generatePasswordResetToken();
    await user.save();

    // TODO: Implementar envio de email
    console.log(`Reset token para ${email}: ${resetToken}`);

    res.json({
      status: 'success',
      message: 'Se o email existir, você receberá instruções para redefinir sua senha'
    });

  } catch (error) {
    console.error('Erro ao solicitar reset:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Redefinir senha
// @access  Public
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Token é obrigatório'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Dados inválidos',
        details: errors.array()
      });
    }

    const { token, password } = req.body;

    // Hash do token para comparar
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Token inválido ou expirado'
      });
    }

    // Redefinir senha
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.refreshTokens = []; // Invalidar todos os refresh tokens

    await user.save();

    res.json({
      status: 'success',
      message: 'Senha redefinida com sucesso'
    });

  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   PUT /api/auth/change-password
// @desc    Alterar senha do usuário logado
// @access  Private
router.put('/change-password', [
  auth,
  body('currentPassword').notEmpty().withMessage('Senha atual é obrigatória'),
  body('newPassword').isLength({ min: 6 }).withMessage('Nova senha deve ter pelo menos 6 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Dados inválidos',
        details: errors.array()
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Buscar usuário com senha
    const user = await User.findById(req.user._id).select('+password');

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(400).json({
        status: 'error',
        message: 'Senha atual incorreta'
      });
    }

    // Atualizar senha
    user.password = newPassword;
    user.refreshTokens = []; // Invalidar refresh tokens existentes
    await user.save();

    res.json({
      status: 'success',
      message: 'Senha alterada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   GET /api/auth/access-info
// @desc    Obter informações de acesso e permissões do usuário logado
// @access  Private
router.get('/access-info', auth, (req, res) => {
  try {
    const accessAreas = getAccessAreas(req.user.role);
    
    res.json({
      status: 'success',
      message: 'Informações de acesso obtidas com sucesso',
      data: {
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
          roleDescription: getRoleDescription(req.user.role),
          school: {
            id: req.user.school_id._id,
            name: req.user.school_id.name
          }
        },
        access: {
          dashboard: accessAreas.dashboard,
          allowedAreas: getAccessibleAreas(req.user.role),
          permissions: getPermissionsByRole(req.user.role)
        }
      }
    });
  } catch (error) {
    console.error('Erro ao buscar informações de acesso:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;