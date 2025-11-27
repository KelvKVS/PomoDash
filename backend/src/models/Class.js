const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  // Nome da turma
  name: {
    type: String,
    required: [true, 'Nome da turma é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome não pode exceder 100 caracteres']
  },
  
  // Descrição opcional da turma
  description: {
    type: String,
    maxlength: [500, 'Descrição não pode exceder 500 caracteres']
  },
  
  // Disciplina/Assunto
  subject: {
    type: String,
    required: [true, 'Disciplina é obrigatória'],
    trim: true,
    maxlength: [100, 'Disciplina não pode exceder 100 caracteres']
  },
  
  // Professor responsável
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Escola à qual a turma pertence
  school_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  
  // Ano letivo
  academic_year: {
    type: String,
    required: [true, 'Ano letivo é obrigatório'],
    validate: {
      validator: function(v) {
        return /^\d{4}$/.test(v) || /^\d{4}-\d{2}$/.test(v); // Ex: 2025 ou 2025-26
      },
      message: 'Ano letivo inválido. Use o formato YYYY ou YYYY-YY'
    }
  },
  
  // Código da turma
  code: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    uppercase: true
  },
  
  // Status da turma
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived'],
    default: 'active'
  },
  
  // Alunos matriculados na turma
  students: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    enrolled_at: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'transferred', 'graduated'],
      default: 'active'
    }
  }],
  
  // Configurações da turma
  settings: {
    // Definições de Pomodoro específicas da turma
    pomodoro: {
      workTime: {
        type: Number,
        default: 25, // minutos
        min: 5,
        max: 60
      },
      shortBreak: {
        type: Number,
        default: 5, // minutos
        min: 2,
        max: 15
      },
      longBreak: {
        type: Number,
        default: 30, // minutos
        min: 10,
        max: 60
      },
      longBreakInterval: {
        type: Number,
        default: 4 // a cada quantos pomodoros
      }
    },
    // Configurações de notificações
    notifications: {
      taskReminders: { type: Boolean, default: true },
      classUpdates: { type: Boolean, default: true },
      gradeUpdates: { type: Boolean, default: true }
    }
  },
  
  // Recursos associados à turma
  resources: {
    syllabus: String, // URL ou caminho para plano de aula
    materials: [{
      title: String,
      url: String,
      type: { type: String }, // pdf, doc, video, etc.
      uploaded_at: { type: Date, default: Date.now }
    }]
  }

}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      // Remover campos sensíveis ao retornar JSON
      return ret;
    }
  },
  toObject: { virtuals: true }
});

// Virtual para obter o número de alunos
classSchema.virtual('studentCount').get(function() {
  return this.students.filter(student => student.status === 'active').length;
});

// Índices para otimização
classSchema.index({ school_id: 1, status: 1 });
classSchema.index({ teacher_id: 1, status: 1 });
classSchema.index({ academic_year: 1, school_id: 1 });
classSchema.index({ 'students.user_id': 1 });

// Middleware para gerar código único da turma ANTES da validação
classSchema.pre('validate', async function(next) {
  if (this.isNew && !this.code) {
    // Gerar código único baseado no nome da turma e ano acadêmico
    const namePart = (this.name || 'CLS').substring(0, 3).toUpperCase().replace(/\s/g, '');
    const yearPart = (this.academic_year || new Date().getFullYear().toString()).substring(2, 4);
    const randomPart = Math.floor(1000 + Math.random() * 9000).toString(); // 4 dígitos aleatórios
    
    this.code = `${namePart}${yearPart}${randomPart}`;
  }
  next();
});

// Validações antes de salvar
classSchema.pre('save', function(next) {
  // Garantir que o professor seja realmente um professor
  if (this.teacher_id) {
    // Esta validação será feita no middleware ou na criação da turma
  }
  
  next();
});

// Métodos estáticos
classSchema.statics.findByTeacher = function(teacherId) {
  return this.find({ teacher_id: teacherId, status: 'active' });
};

classSchema.statics.findBySchool = function(schoolId) {
  return this.find({ school_id: schoolId, status: 'active' });
};

classSchema.statics.findByCode = function(code) {
  return this.findOne({ code: code.toUpperCase() });
};

// Método de instância para adicionar aluno à turma
classSchema.methods.addStudent = async function(studentId) {
  // Verificar se aluno já está matriculado
  const existingStudent = this.students.find(s => s.user_id.toString() === studentId.toString());
  if (existingStudent) {
    if (existingStudent.status !== 'active') {
      // Reativar aluno
      existingStudent.status = 'active';
      existingStudent.enrolled_at = new Date();
    }
    return this.save();
  }
  
  // Adicionar novo aluno
  this.students.push({
    user_id: studentId,
    enrolled_at: new Date()
  });
  
  return this.save();
};

// Método de instância para remover aluno da turma
classSchema.methods.removeStudent = async function(studentId) {
  this.students = this.students.map(s => {
    if (s.user_id.toString() === studentId.toString()) {
      s.status = 'inactive'; // Inativar ao invés de remover
    }
    return s;
  });
  
  return this.save();
};

// Método de instância para verificar se aluno está na turma
classSchema.methods.hasStudent = function(studentId) {
  const student = this.students.find(s => 
    s.user_id.toString() === studentId.toString() && s.status === 'active'
  );
  return !!student;
};

// Método de instância para atualizar configurações da turma
classSchema.methods.updateSettings = async function(settings) {
  this.settings = { ...this.settings, ...settings };
  return this.save();
};

module.exports = mongoose.model('Class', classSchema);