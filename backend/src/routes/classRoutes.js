const express = require('express');
const { body, validationResult, query } = require('express-validator');
const mongoose = require('mongoose');

const Class = require('../models/Class');
const User = require('../models/User');
const School = require('../models/School');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/classes
// @desc    Obter todas as turmas (com filtros)
// @access  Private
router.get('/', auth, [
  query('status').optional().isIn(['active', 'inactive', 'archived']).withMessage('Status inválido'),
  query('academic_year').optional().matches(/^\d{4}$|^\d{4}-\d{2}$/).withMessage('Ano acadêmico inválido'),
  query('teacher_id').optional().isMongoId().withMessage('ID do professor inválido'),
  query('school_id').optional().isMongoId().withMessage('ID da escola inválido'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limite deve ser entre 1 e 100'),
  query('page').optional().isInt({ min: 1 }).withMessage('Página deve ser um número positivo')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Parâmetros de consulta inválidos',
        details: errors.array()
      });
    }

    const { status, academic_year, teacher_id, school_id, limit = 10, page = 1 } = req.query;

    // Verificar permissões
    let queryFilters = {};
    
    // Permissões baseadas na role
    if (req.user.role === 'teacher') {
      queryFilters.teacher_id = req.user._id;
    } else if (req.user.role === 'school_admin' || req.user.role === 'global_admin') {
      if (req.user.role === 'school_admin') {
        queryFilters.school_id = req.user.school_id;
      } else if (school_id) {
        queryFilters.school_id = school_id;
      }
    }
    
    // Adicionar filtros adicionais
    if (status) queryFilters.status = status;
    if (academic_year) queryFilters.academic_year = academic_year;
    if (teacher_id) queryFilters.teacher_id = teacher_id;

    // Paginação
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const classes = await Class.find(queryFilters)
      .populate('teacher_id', 'name email')
      .populate('school_id', 'name')
      .populate('students.user_id', 'name email academic.grade')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Class.countDocuments(queryFilters);

    res.json({
      status: 'success',
      data: {
        classes,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Erro ao buscar turmas:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   GET /api/classes/:id
// @desc    Obter uma turma específica
// @access  Private - teacher, school_admin, global_admin
router.get('/:id', auth, async (req, res) => {
  try {
    const classId = req.params.id;

    // Validar ID
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({
        status: 'error',
        message: 'ID da turma inválido'
      });
    }

    // Verificar permissões
    let query = { _id: classId };
    
    if (req.user.role === 'teacher') {
      query.teacher_id = req.user._id;
    } else if (req.user.role === 'school_admin') {
      query.school_id = req.user.school_id;
    }

    const classObj = await Class.findOne(query)
      .populate('teacher_id', 'name email profile.avatar')
      .populate('school_id', 'name')
      .populate('students.user_id', 'name email profile.avatar academic.grade');

    if (!classObj) {
      return res.status(404).json({
        status: 'error',
        message: 'Turma não encontrada ou sem permissão para acessar'
      });
    }

    res.json({
      status: 'success',
      data: { class: classObj }
    });

  } catch (error) {
    console.error('Erro ao buscar turma:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   POST /api/classes
// @desc    Criar nova turma
// @access  Private - teacher, school_admin
router.post('/', auth, [
  body('name').notEmpty().withMessage('Nome da turma é obrigatório'),
  body('subject').notEmpty().withMessage('Disciplina é obrigatória'),
  body('academic_year').matches(/^\d{4}$|^\d{4}-\d{2}$/).withMessage('Ano acadêmico inválido'),
  body('teacher_id').optional().isMongoId().withMessage('ID do professor inválido')
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

    const { name, subject, description, academic_year, teacher_id } = req.body;

    // Verificar permissões
    let finalTeacherId = teacher_id || req.user._id;
    
    if (req.user.role === 'school_admin') {
      // Se for admin da escola, pode criar turma para qualquer professor da mesma escola
      if (teacher_id) {
        const teacher = await User.findById(teacher_id);
        if (!teacher || teacher.school_id.toString() !== req.user.school_id.toString() || teacher.role !== 'teacher') {
          return res.status(400).json({
            status: 'error',
            message: 'Professor inválido ou não pertence à escola'
          });
        }
      }
    } else if (req.user.role === 'teacher') {
      // Professor só pode criar turmas para si mesmo
      finalTeacherId = req.user._id;
    }

    // Verificar se o professor existe e é realmente um professor
    const teacher = await User.findById(finalTeacherId);
    if (!teacher || (teacher.role !== 'teacher' && req.user.role !== 'global_admin')) {
      return res.status(400).json({
        status: 'error',
        message: 'Professor inválido'
      });
    }

    // Verificar se a escola existe
    let schoolId = req.user.school_id;
    const school = await School.findById(schoolId);
    if (!school || school.status !== 'active') {
      return res.status(400).json({
        status: 'error',
        message: 'Escola inválida ou inativa'
      });
    }

    // Criar nova turma
    const newClass = new Class({
      name,
      subject,
      description,
      academic_year,
      teacher_id: finalTeacherId,
      school_id: schoolId
    });

    await newClass.save();

    // Atualizar o professor para incluir esta turma
    await User.findByIdAndUpdate(finalTeacherId, {
      $addToSet: { 'teaching.classes': newClass._id }
    });

    res.status(201).json({
      status: 'success',
      message: 'Turma criada com sucesso',
      data: { class: newClass }
    });

  } catch (error) {
    console.error('Erro ao criar turma:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   PUT /api/classes/:id
// @desc    Atualizar turma
// @access  Private - teacher, school_admin
router.put('/:id', auth, [
  body('name').optional().notEmpty().withMessage('Nome da turma não pode estar vazio'),
  body('subject').optional().notEmpty().withMessage('Disciplina não pode estar vazia'),
  body('academic_year').optional().matches(/^\d{4}$|^\d{4}-\d{2}$/).withMessage('Ano acadêmico inválido'),
  body('status').optional().isIn(['active', 'inactive', 'archived']).withMessage('Status inválido')
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

    const classId = req.params.id;

    // Validar ID
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({
        status: 'error',
        message: 'ID da turma inválido'
      });
    }

    // Verificar permissões
    let query = { _id: classId };
    
    if (req.user.role === 'teacher') {
      query.teacher_id = req.user._id;
    } else if (req.user.role === 'school_admin') {
      query.school_id = req.user.school_id;
    }

    const classObj = await Class.findOne(query);
    if (!classObj) {
      return res.status(404).json({
        status: 'error',
        message: 'Turma não encontrada ou sem permissão para atualizar'
      });
    }

    // Atualizar campos
    const updateData = {};
    const updatableFields = ['name', 'description', 'subject', 'academic_year', 'status', 'settings'];
    
    for (const field of updatableFields) {
      if (req.body.hasOwnProperty(field)) {
        updateData[field] = req.body[field];
      }
    }

    // Atualizar turma
    const updatedClass = await Class.findOneAndUpdate(
      { _id: classId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({
      status: 'success',
      message: 'Turma atualizada com sucesso',
      data: { class: updatedClass }
    });

  } catch (error) {
    console.error('Erro ao atualizar turma:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   DELETE /api/classes/:id
// @desc    Arquivar turma (soft delete)
// @access  Private - teacher, school_admin
router.delete('/:id', auth, async (req, res) => {
  try {
    const classId = req.params.id;

    // Validar ID
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({
        status: 'error',
        message: 'ID da turma inválido'
      });
    }

    // Verificar permissões
    let query = { _id: classId };
    
    if (req.user.role === 'teacher') {
      query.teacher_id = req.user._id;
    } else if (req.user.role === 'school_admin') {
      query.school_id = req.user.school_id;
    }

    const classObj = await Class.findOne(query);
    if (!classObj) {
      return res.status(404).json({
        status: 'error',
        message: 'Turma não encontrada ou sem permissão para arquivar'
      });
    }

    // Atualizar status para arquivado
    await Class.findByIdAndUpdate(classId, { 
      $set: { status: 'archived' } 
    });

    // Remover referência da turma dos professores
    await User.updateMany(
      { 'teaching.classes': classId },
      { $pull: { 'teaching.classes': classId } }
    );

    res.json({
      status: 'success',
      message: 'Turma arquivada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao arquivar turma:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   POST /api/classes/:id/students
// @desc    Adicionar aluno à turma
// @access  Private - teacher, school_admin
router.post('/:id/students', auth, [
  body('student_id').isMongoId().withMessage('ID do aluno inválido')
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

    const classId = req.params.id;
    const { student_id } = req.body;

    // Validar IDs
    if (!mongoose.Types.ObjectId.isValid(classId) || !mongoose.Types.ObjectId.isValid(student_id)) {
      return res.status(400).json({
        status: 'error',
        message: 'IDs inválidos'
      });
    }

    // Verificar permissões
    let query = { _id: classId };
    
    if (req.user.role === 'teacher') {
      query.teacher_id = req.user._id;
    } else if (req.user.role === 'school_admin') {
      query.school_id = req.user.school_id;
    }

    const classObj = await Class.findOne(query);
    if (!classObj) {
      return res.status(404).json({
        status: 'error',
        message: 'Turma não encontrada ou sem permissão para adicionar alunos'
      });
    }

    // Verificar se o aluno existe e é realmente um aluno
    const student = await User.findById(student_id);
    if (!student || student.role !== 'student') {
      return res.status(400).json({
        status: 'error',
        message: 'Aluno inválido'
      });
    }

    // Verificar se o aluno pertence à mesma escola
    if (student.school_id.toString() !== classObj.school_id.toString()) {
      return res.status(400).json({
        status: 'error',
        message: 'Aluno não pertence à mesma escola'
      });
    }

    // Adicionar aluno à turma
    await classObj.addStudent(student_id);

    // Atualizar o aluno para incluir esta turma
    await User.findByIdAndUpdate(student_id, {
      $addToSet: { 'academic.classes': classObj._id }
    });

    // Retornar turma atualizada
    const updatedClass = await Class.findById(classId)
      .populate('teacher_id', 'name email')
      .populate('students.user_id', 'name email academic.grade');

    res.status(200).json({
      status: 'success',
      message: 'Aluno adicionado à turma com sucesso',
      data: { class: updatedClass }
    });

  } catch (error) {
    console.error('Erro ao adicionar aluno à turma:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   DELETE /api/classes/:id/students/:studentId
// @desc    Remover aluno da turma
// @access  Private - teacher, school_admin
router.delete('/:id/students/:studentId', auth, async (req, res) => {
  try {
    const classId = req.params.id;
    const studentId = req.params.studentId;

    // Validar IDs
    if (!mongoose.Types.ObjectId.isValid(classId) || !mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        status: 'error',
        message: 'IDs inválidos'
      });
    }

    // Verificar permissões
    let query = { _id: classId };
    
    if (req.user.role === 'teacher') {
      query.teacher_id = req.user._id;
    } else if (req.user.role === 'school_admin') {
      query.school_id = req.user.school_id;
    }

    const classObj = await Class.findOne(query);
    if (!classObj) {
      return res.status(404).json({
        status: 'error',
        message: 'Turma não encontrada ou sem permissão para remover alunos'
      });
    }

    // Remover aluno da turma
    await classObj.removeStudent(studentId);

    // Remover referência da turma do aluno
    await User.findByIdAndUpdate(studentId, {
      $pull: { 'academic.classes': classObj._id }
    });

    // Retornar turma atualizada
    const updatedClass = await Class.findById(classId)
      .populate('teacher_id', 'name email')
      .populate('students.user_id', 'name email academic.grade');

    res.json({
      status: 'success',
      message: 'Aluno removido da turma com sucesso',
      data: { class: updatedClass }
    });

  } catch (error) {
    console.error('Erro ao remover aluno da turma:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   GET /api/classes/:id/students
// @desc    Obter alunos da turma
// @access  Private - teacher, school_admin
router.get('/:id/students', auth, async (req, res) => {
  try {
    const classId = req.params.id;

    // Validar ID
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({
        status: 'error',
        message: 'ID da turma inválido'
      });
    }

    // Verificar permissões
    let query = { _id: classId };
    
    if (req.user.role === 'teacher') {
      query.teacher_id = req.user._id;
    } else if (req.user.role === 'school_admin') {
      query.school_id = req.user.school_id;
    }

    const classObj = await Class.findOne(query)
      .populate({
        path: 'students.user_id',
        select: 'name email profile.avatar academic.grade academic.studentId'
      });

    if (!classObj) {
      return res.status(404).json({
        status: 'error',
        message: 'Turma não encontrada ou sem permissão para acessar'
      });
    }

    // Filtrar apenas alunos ativos e com user_id populado
    const activeStudents = classObj.students.filter(s => 
      s.status === 'active' && s.user_id != null
    );

    res.json({
      status: 'success',
      data: { 
        students: activeStudents
      }
    });

  } catch (error) {
    console.error('Erro ao buscar alunos da turma:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

// @route   GET /api/classes/teacher/:teacherId
// @desc    Obter turmas de um professor específico
// @access  Private - school_admin, global_admin, ou o próprio professor
router.get('/teacher/:teacherId', auth, async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    // Validar ID
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({
        status: 'error',
        message: 'ID do professor inválido'
      });
    }

    // Verificar permissões
    if (req.user.role === 'teacher' && req.user._id.toString() !== teacherId.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'Permissão negada: só pode acessar suas próprias turmas'
      });
    }

    if (req.user.role === 'school_admin') {
      const teacher = await User.findById(teacherId);
      if (!teacher || teacher.school_id.toString() !== req.user.school_id.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'Professor não pertence à sua escola'
        });
      }
    }

    const classes = await Class.find({ 
      teacher_id: teacherId,
      status: { $ne: 'archived' } // Não mostrar turmas arquivadas
    })
      .populate('school_id', 'name')
      .populate('students.user_id', 'name email academic.grade')
      .sort({ createdAt: -1 });

    res.json({
      status: 'success',
      data: { classes }
    });

  } catch (error) {
    console.error('Erro ao buscar turmas do professor:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;