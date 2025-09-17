const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título da tarefa é obrigatório'],
    trim: true,
    maxlength: [200, 'Título não pode exceder 200 caracteres']
  },
  
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Descrição não pode exceder 1000 caracteres']
  },
  
  // Multi-tenant
  school_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
    index: true
  },
  
  // Criador da tarefa (professor ou aluno)
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Atribuída para (se for tarefa de professor para alunos)
  assigned_to: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    assigned_at: {
      type: Date,
      default: Date.now
    },
    completed_at: Date,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'overdue'],
      default: 'pending'
    }
  }],
  
  // Categoria/Matéria
  subject: {
    type: String,
    trim: true,
    maxlength: [50, 'Matéria não pode exceder 50 caracteres']
  },
  
  // Prioridade
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Status geral da tarefa
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  
  // Datas
  due_date: Date,
  start_date: {
    type: Date,
    default: Date.now
  },
  
  // Configurações do Pomodoro para esta tarefa
  pomodoro_settings: {
    estimated_pomodoros: {
      type: Number,
      min: 1,
      max: 20,
      default: 1
    },
    work_time: {
      type: Number,
      min: 5,
      max: 60,
      default: 25
    },
    break_time: {
      type: Number,
      min: 2,
      max: 15,
      default: 5
    }
  },
  
  // Tags para organização
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Anexos (URLs ou referências)
  attachments: [{
    name: String,
    url: String,
    type: {
      type: String,
      enum: ['link', 'file', 'image', 'video']
    },
    size: Number, // em bytes
    uploaded_at: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Configurações de notificação
  notifications: {
    remind_before: {
      type: Number, // minutos antes do due_date
      default: 60
    },
    send_reminders: {
      type: Boolean,
      default: true
    }
  },
  
  // Métricas de conclusão
  completion_stats: {
    total_assigned: {
      type: Number,
      default: 0
    },
    completed: {
      type: Number,
      default: 0
    },
    in_progress: {
      type: Number,
      default: 0
    },
    overdue: {
      type: Number,
      default: 0
    }
  },
  
  // Para tarefas recorrentes (futuro)
  recurrence: {
    type: {
      type: String,
      enum: ['none', 'daily', 'weekly', 'monthly'],
      default: 'none'
    },
    interval: {
      type: Number,
      default: 1
    },
    end_date: Date
  }
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtuals
taskSchema.virtual('is_overdue').get(function() {
  return this.due_date && new Date() > this.due_date && this.status !== 'completed';
});

taskSchema.virtual('days_until_due').get(function() {
  if (!this.due_date) return null;
  const diffTime = this.due_date - new Date();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

taskSchema.virtual('completion_rate').get(function() {
  if (this.completion_stats.total_assigned === 0) return 0;
  return (this.completion_stats.completed / this.completion_stats.total_assigned) * 100;
});

// Índices para otimização
taskSchema.index({ school_id: 1, status: 1 });
taskSchema.index({ created_by: 1 });
taskSchema.index({ 'assigned_to.user': 1 });
taskSchema.index({ due_date: 1 });
taskSchema.index({ subject: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ tags: 1 });
taskSchema.index({ createdAt: -1 });

// Índices compostos
taskSchema.index({ school_id: 1, created_by: 1, status: 1 });
taskSchema.index({ school_id: 1, due_date: 1, status: 1 });

// Middleware para atualizar estatísticas antes de salvar
taskSchema.pre('save', function(next) {
  if (this.isModified('assigned_to')) {
    this.completion_stats.total_assigned = this.assigned_to.length;
    this.completion_stats.completed = this.assigned_to.filter(a => a.status === 'completed').length;
    this.completion_stats.in_progress = this.assigned_to.filter(a => a.status === 'in_progress').length;
    this.completion_stats.overdue = this.assigned_to.filter(a => a.status === 'overdue').length;
  }
  next();
});

// Métodos estáticos
taskSchema.statics.findBySchool = function(schoolId, filters = {}) {
  return this.find({ school_id: schoolId, ...filters })
    .populate('created_by', 'name email role')
    .populate('assigned_to.user', 'name email');
};

taskSchema.statics.findOverdueTasks = function(schoolId) {
  return this.find({
    school_id: schoolId,
    due_date: { $lt: new Date() },
    status: { $ne: 'archived' },
    'assigned_to.status': { $ne: 'completed' }
  });
};

taskSchema.statics.findTasksByUser = function(userId, filters = {}) {
  return this.find({
    $or: [
      { created_by: userId },
      { 'assigned_to.user': userId }
    ],
    ...filters
  }).populate('created_by', 'name email role');
};

// Métodos de instância
taskSchema.methods.assignToUsers = function(userIds) {
  const existingUserIds = this.assigned_to.map(a => a.user.toString());
  
  userIds.forEach(userId => {
    if (!existingUserIds.includes(userId.toString())) {
      this.assigned_to.push({
        user: userId,
        status: 'pending'
      });
    }
  });
  
  return this.save();
};

taskSchema.methods.updateUserStatus = function(userId, status, completedAt = null) {
  const assignment = this.assigned_to.find(a => a.user.toString() === userId.toString());
  
  if (assignment) {
    assignment.status = status;
    if (status === 'completed' && !assignment.completed_at) {
      assignment.completed_at = completedAt || new Date();
    }
  }
  
  return this.save();
};

taskSchema.methods.isAssignedTo = function(userId) {
  return this.assigned_to.some(a => a.user.toString() === userId.toString());
};

taskSchema.methods.getStatusForUser = function(userId) {
  const assignment = this.assigned_to.find(a => a.user.toString() === userId.toString());
  return assignment ? assignment.status : null;
};

module.exports = mongoose.model('Task', taskSchema);