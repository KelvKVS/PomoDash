const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para verificar autenticação
const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'Token de acesso requerido'
      });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Buscar usuário no banco
      const user = await User.findById(decoded.user_id)
        .populate('school_id', 'name status')
        .select('-password');

      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Usuário não encontrado'
        });
      }

      if (user.status !== 'active') {
        return res.status(401).json({
          status: 'error',
          message: 'Usuário inativo'
        });
      }

      // Garantir que o usuário está associado a uma escola ativa
      if (!user.school_id || user.school_id.status !== 'active') {
        return res.status(403).json({
          status: 'error',
          message: 'Instituição inativa ou não encontrada'
        });
      }

      req.user = user;
      req.tenant_id = user.school_id._id;
      next();

    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 'error',
          message: 'Token expirado'
        });
      }
      
      return res.status(401).json({
        status: 'error',
        message: 'Token inválido'
      });
    }

  } catch (error) {
    console.error('Erro no middleware de autenticação:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
};

// Middleware para verificar permissões por role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Usuário não autenticado'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Acesso negado. Permissão insuficiente.'
      });
    }

    next();
  };
};

// Middleware específico para administrador global
function requireGlobalAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'global_admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Acesso restrito a administradores globais'
    });
  }
  next();
}

// Middleware para verificar se o usuário pertence à mesma escola (tenant)
const checkTenant = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'Usuário não autenticado'
    });
  }

  // Administrador global pode acessar qualquer tenant
  if (req.user.role === 'global_admin') {
    return next();
  }

  const userSchoolId = req.user.school_id._id.toString();
  const requestTenantId = req.tenant_id?.toString() || req.params.school_id;

  if (userSchoolId !== requestTenantId) {
    return res.status(403).json({
      status: 'error',
      message: 'Acesso negado. Usuário não pertence a esta instituição.'
    });
  }

  next();
};

module.exports = {
  auth,
  authorize,
  requireGlobalAdmin,
  checkTenant
};
