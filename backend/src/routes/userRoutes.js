const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Middleware de validação
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', message: 'Dados inválidos', details: errors.array() });
  }
  next();
};

// @route   GET /api/users
// @desc    Listar usuários da escola
// @access  Private (admin/teacher)
router.get('/', auth, authorize(['school_admin', 'teacher']), [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    query('role').optional().isIn(['school_admin', 'teacher', 'student']),
    query('search').optional().trim(),
], validateRequest, async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const skip = (page - 1) * limit;

    let filter = { school_id: req.user.school_id };
    if (req.user.role === 'teacher') {
      filter.role = 'student';
    } else if (role) {
      filter.role = role;
    }

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const users = await User.find(filter).sort({ name: 1 }).skip(skip).limit(limit);
    const total = await User.countDocuments(filter);

    res.json({ 
        status: 'success', 
        data: users, 
        pagination: { page, limit, total, pages: Math.ceil(total / limit) } 
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

// @route   POST /api/users
// @desc    Criar novo usuário
// @access  Private (admin)
router.post('/', auth, authorize(['school_admin']), [
    body('email').isEmail().normalizeEmail(),
    body('name').trim().notEmpty(),
    body('password').isLength({ min: 6 }),
    body('role').isIn(['school_admin', 'teacher', 'student']),
], validateRequest, async (req, res) => {
  try {
    const { name, email, password, role, studentId, grade } = req.body;

    let user = await User.findOne({ email, school_id: req.user.school_id });
    if (user) {
      return res.status(400).json({ status: 'error', message: 'Email já está em uso nesta escola' });
    }

    const userData = {
      name,
      email,
      password,
      role,
      school_id: req.user.school_id,
      status: 'active'
    };

    if (role === 'student') {
        userData.academic = { studentId, grade };
    }

    user = new User(userData);
    await user.save();

    res.status(201).json({ status: 'success', data: user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

// @route   GET /api/users/:id
// @desc    Obter usuário específico
// @access  Private (admin/teacher)
router.get('/:id', auth, authorize(['school_admin', 'teacher']), [param('id').isMongoId()], validateRequest, async (req, res) => {
  try {
    const filter = { _id: req.params.id, school_id: req.user.school_id };
    if (req.user.role === 'teacher') {
      filter.role = 'student';
    }

    const user = await User.findOne(filter);
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuário não encontrado' });

    res.json({ status: 'success', data: user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

// @route   PUT /api/users/:id
// @desc    Atualizar usuário
// @access  Private (admin)
router.put('/:id', auth, authorize(['school_admin']), [param('id').isMongoId()], validateRequest, async (req, res) => {
  try {
    const { name, role, status, studentId, grade } = req.body;

    const user = await User.findOne({ _id: req.params.id, school_id: req.user.school_id });
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuário não encontrado' });

    const updates = { name, role, status };
    if (user.role === 'student') {
        updates.academic = { studentId: studentId || user.academic.studentId, grade: grade || user.academic.grade };
    }

    Object.assign(user, updates);
    await user.save();

    res.json({ status: 'success', data: user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

// @route   DELETE /api/users/:id
// @desc    Inativar usuário
// @access  Private (admin)
router.delete('/:id', auth, authorize(['school_admin']), [param('id').isMongoId()], validateRequest, async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
        return res.status(400).json({ status: 'error', message: 'Você não pode inativar a si mesmo.' });
    }

    const user = await User.findOne({ _id: req.params.id, school_id: req.user.school_id });
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuário não encontrado' });

    user.status = 'inactive';
    await user.save();

    res.json({ status: 'success', message: 'Usuário inativado com sucesso.' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro interno do servidor' });
  }
});

module.exports = router;
