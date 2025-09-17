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
  body('role').isIn(['school_admin', 'teacher', 'student']).withMessage('Role inválido'),
  body('school_id').notEmpty().withMessage('ID da escola é obrigatório').isMongoId().withMessage('ID da escola inválido')
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

    const { name, email, password, role, school_id } = req.body;

    // Verificar se a escola existe e está ativa
    const school = await School.findById(school_id);
    if (!school || school.status !== 'active') {
      return res.status(400).json({
        status: 'error',
        message: 'Escola não encontrada ou inativa'
      });
    }

    // Verificar se email já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email já cadastrado'
      });
    }

    // Verificar limites da escola
    const userCount = await User.countDocuments({ school_id, status: { $ne: 'inactive' } });
    if (userCount >= school.limits.maxUsers) {
      return res.status(400).json({
        status: 'error',
        message: 'Limite de usuários da escola atingido'
      });
    }

    // Criar usuário
    const user = new User({
      name,
      email,
      password,
      role,
      school_id,
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

    // Verificar se escola está ativa
    if (!user.school_id || user.school_id.status !== 'active') {
      return res.status(403).json({
        status: 'error',
        message: 'Escola inativa'
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

    res.json({
      status: 'success',
      message: 'Login realizado com sucesso',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          school: {
            id: user.school_id._id,
            name: user.school_id.name
          }
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

module.exports = router;