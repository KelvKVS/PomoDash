const express = require('express');
const { body, validationResult, param } = require('express-validator');

const School = require('../models/School');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/schools
// @desc    Listar todas as escolas (Global Admin) ou obter escola atual
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let schools;

    if (req.user.role === 'global_admin') {
      // Global admin vê todas as escolas
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const filter = {};
      if (req.query.status) {
        filter.status = req.query.status;
      }
      if (req.query.search) {
        filter.$or = [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } }
        ];
      }

      schools = await School.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await School.countDocuments(filter);

      return res.json({
        status: 'success',
        data: {
          schools,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            itemsPerPage: limit
          }
        }
      });

    } else {
      // Outros usuários veem apenas sua escola
      const school = await School.findById(req.user.school_id)
        .populate('userCount');

      if (!school) {
        return res.status(404).json({
          status: 'error',
          message: 'Escola não encontrada'
        });
      }

      return res.json({
        status: 'success',
        data: { school }
      });
    }

  } catch (error) {
    console.error('Erro ao listar escolas:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   POST /api/schools
// @desc    Criar nova escola
// @access  Private (Global Admin only)
router.post('/', [
  auth,
  body('name').notEmpty().withMessage('Nome da escola é obrigatório').trim(),
  body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  body('phone').optional().matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/).withMessage('Telefone deve estar no formato (XX) XXXXX-XXXX'),
  body('plan').optional().isIn(['free', 'basic', 'premium']).withMessage('Plano inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Dados de entrada inválidos',
        details: errors.array()
      });
    }

    const { name, email, phone, address, plan, limits, settings } = req.body;

    // Verificar se email já existe
    const existingSchool = await School.findOne({ email });
    if (existingSchool) {
      return res.status(400).json({
        status: 'error',
        message: 'Email já cadastrado'
      });
    }

    // Criar escola
    const school = new School({
      name,
      email,
      phone,
      address,
      plan: plan || 'free',
      limits: {
        maxUsers: limits?.maxUsers || 50,
        maxStorage: limits?.maxStorage || 100
      },
      settings: {
        ...settings,
        pomodoroDefaultTime: settings?.pomodoroDefaultTime || 25,
        shortBreakTime: settings?.shortBreakTime || 5,
        longBreakTime: settings?.longBreakTime || 30
      },
      createdBy: req.user._id
    });

    await school.save();

    res.status(201).json({
      status: 'success',
      message: 'Escola criada com sucesso',
      data: { school }
    });

  } catch (error) {
    console.error('Erro ao criar escola:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   GET /api/schools/:id
// @desc    Obter escola por ID
// @access  Private
router.get('/:id', [
  auth,
  param('id').isMongoId().withMessage('ID inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'ID inválido'
      });
    }

    const { id } = req.params;

    // Verificar permissão
    if (req.user.role !== 'global_admin' && req.user.school_id.toString() !== id) {
      return res.status(403).json({
        status: 'error',
        message: 'Acesso negado'
      });
    }

    const school = await School.findById(id)
      .populate('createdBy', 'name email');

    if (!school) {
      return res.status(404).json({
        status: 'error',
        message: 'Escola não encontrada'
      });
    }

    res.json({
      status: 'success',
      data: { school }
    });

  } catch (error) {
    console.error('Erro ao buscar escola:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   PUT /api/schools/:id
// @desc    Atualizar escola
// @access  Private (Global Admin ou School Admin)
router.put('/:id', [
  auth,
  param('id').isMongoId().withMessage('ID inválido'),
  body('name').optional().notEmpty().withMessage('Nome não pode estar vazio').trim(),
  body('email').optional().isEmail().withMessage('Email inválido').normalizeEmail(),
  body('phone').optional().matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/).withMessage('Telefone inválido')
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

    const { id } = req.params;

    // Verificar permissão
    if (req.user.role === 'school_admin' && req.user.school_id.toString() !== id) {
      return res.status(403).json({
        status: 'error',
        message: 'Acesso negado'
      });
    }

    const school = await School.findById(id);
    if (!school) {
      return res.status(404).json({
        status: 'error',
        message: 'Escola não encontrada'
      });
    }

    // Campos que podem ser atualizados
    const allowedUpdates = ['name', 'phone', 'address', 'settings'];
    const globalAdminUpdates = [...allowedUpdates, 'status', 'plan', 'limits', 'features'];

    const fieldsToUpdate = req.user.role === 'global_admin' ? globalAdminUpdates : allowedUpdates;

    // Atualizar campos permitidos
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'address' || field === 'settings' || field === 'limits' || field === 'features') {
          school[field] = { ...school[field]?.toObject(), ...req.body[field] };
        } else {
          school[field] = req.body[field];
        }
      }
    });

    // Verificar se email foi alterado (apenas Global Admin)
    if (req.user.role === 'global_admin' && req.body.email && req.body.email !== school.email) {
      const existingSchool = await School.findOne({ email: req.body.email, _id: { $ne: id } });
      if (existingSchool) {
        return res.status(400).json({
          status: 'error',
          message: 'Email já cadastrado'
        });
      }
      school.email = req.body.email;
    }

    school.updatedBy = req.user._id;
    await school.save();

    res.json({
      status: 'success',
      message: 'Escola atualizada com sucesso',
      data: { school }
    });

  } catch (error) {
    console.error('Erro ao atualizar escola:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   DELETE /api/schools/:id
// @desc    Deletar/Inativar escola
// @access  Private (Global Admin only)
router.delete('/:id', [
  auth,
  param('id').isMongoId().withMessage('ID inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'ID inválido'
      });
    }

    const { id } = req.params;
    const { permanent } = req.query;

    const school = await School.findById(id);
    if (!school) {
      return res.status(404).json({
        status: 'error',
        message: 'Escola não encontrada'
      });
    }

    if (permanent === 'true') {
      // Verificar se tem usuários
      const userCount = await User.countDocuments({ school_id: id });
      if (userCount > 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Não é possível deletar escola com usuários cadastrados'
        });
      }

      await School.findByIdAndDelete(id);
      
      res.json({
        status: 'success',
        message: 'Escola deletada permanentemente'
      });

    } else {
      // Inativar escola
      school.status = 'inactive';
      school.updatedBy = req.user._id;
      await school.save();

      // Inativar todos os usuários da escola
      await User.updateMany(
        { school_id: id },
        { status: 'inactive' }
      );

      res.json({
        status: 'success',
        message: 'Escola inativada com sucesso'
      });
    }

  } catch (error) {
    console.error('Erro ao deletar escola:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   GET /api/schools/:id/stats
// @desc    Obter estatísticas da escola
// @access  Private (Global Admin ou School Admin)
router.get('/:id/stats', [
  auth,

  param('id').isMongoId().withMessage('ID inválido')
], async (req, res) => {
  try {
    const { id } = req.params;

    // Obter o school_id do usuário (pode ser objeto ou string)
    const userSchoolId = req.user.school_id?._id?.toString() || req.user.school_id?.toString();
    
    // Verificar permissão - school_admin só pode ver sua própria escola
    // global_admin pode ver qualquer escola
    if (req.user.role !== 'global_admin' && req.user.role === 'school_admin' && userSchoolId !== id) {
      return res.status(403).json({
        status: 'error',
        message: 'Acesso negado'
      });
    }

    const school = await School.findById(id);
    if (!school) {
      return res.status(404).json({
        status: 'error',
        message: 'Escola não encontrada'
      });
    }

    // Estatísticas básicas
    const stats = await User.aggregate([
      { $match: { school_id: school._id } },
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
          active: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } }
        }
      }
    ]);

    const userStats = {
      total: 0,
      teachers: 0,
      students: 0,
      school_admins: 0,
      active: 0
    };

    stats.forEach(stat => {
      userStats.total += stat.count;
      userStats.active += stat.active;
      userStats[stat._id + 's'] = stat.count;
    });

    res.json({
      status: 'success',
      data: {
        school: {
          id: school._id,
          name: school.name,
          status: school.status,
          plan: school.plan
        },
        users: userStats,
        limits: school.limits,
        usage: {
          users: `${userStats.total}/${school.limits.maxUsers}`,
          usersPercentage: Math.round((userStats.total / school.limits.maxUsers) * 100)
        }
      }
    });

  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;