const mongoose = require('mongoose');

const pomodoroSessionSchema = new mongoose.Schema({
  // Multi-tenant
  school_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
    index: true
  },
  
  // Usuário que executou a sessão
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  // Tarefa associada (opcional)
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  
  // Tipo de sessão
  type: {
    type: String,
    enum: ['work', 'short_break', 'long_break'],
    required: true
  },
  
  // Configurações da sessão
  settings: {
    planned_duration: {
      type: Number, // em minutos
      required: true,
      min: 1,
      max: 120
    },
    work_time: {
      type: Number,
      default: 25
    },
    break_time: {
      type: Number,
      default: 5
    }
  },
  
  // Tempos de execução
  timing: {
    started_at: {
      type: Date,
      required: true,
      default: Date.now
    },
    ended_at: Date,
    paused_at: Date,
    resumed_at: Date,
    actual_duration: {
      type: Number, // em segundos
      default: 0
    },
    paused_duration: {
      type: Number, // tempo total pausado em segundos
      default: 0
    }
  },
  
  // Status da sessão
  status: {
    type: String,
    enum: ['running', 'paused', 'completed', 'abandoned', 'interrupted'],
    default: 'running'
  },
  
  // Interrupções durante a sessão
  interruptions: [{
    type: {
      type: String,
      enum: ['internal', 'external', 'urgent', 'planned'],
      required: true
    },
    description: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    duration: Number // tempo perdido em segundos
  }],
  
  // Avaliação da sessão (feedback do usuário)
  feedback: {
    productivity_rating: {
      type: Number,
      min: 1,
      max: 5
    },
    focus_rating: {
      type: Number,
      min: 1,
      max: 5
    },
    difficulty_rating: {
      type: Number,
      min: 1,
      max: 5
    },
    notes: {
      type: String,
      maxlength: [500, 'Notas não podem exceder 500 caracteres']
    },
    mood: {
      type: String,
      enum: ['great', 'good', 'neutral', 'tired', 'stressed']
    }
  },
  
  // Métricas calculadas
  metrics: {
    completion_rate: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    efficiency_score: {
      type: Number,
      min: 0,
      max: 100
    },
    interruption_count: {
      type: Number,
      default: 0
    }
  },
  
  // Contexto/ambiente da sessão
  context: {
    device_type: {
      type: String,
      enum: ['desktop', 'tablet', 'mobile']
    },
    location: String, // casa, escola, biblioteca, etc.
    ambient_noise: {
      type: String,
      enum: ['silent', 'quiet', 'moderate', 'noisy']
    }
  },
  
  // Para análises futuras
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }]
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtuals
pomodoroSessionSchema.virtual('duration_minutes').get(function() {
  return Math.round(this.timing.actual_duration / 60);
});

pomodoroSessionSchema.virtual('was_completed').get(function() {
  return this.status === 'completed';
});

pomodoroSessionSchema.virtual('effectiveness').get(function() {
  if (!this.timing.actual_duration) return 0;
  const targetDuration = this.settings.planned_duration * 60;
  return Math.min((this.timing.actual_duration / targetDuration) * 100, 100);
});

// Índices para otimização
pomodoroSessionSchema.index({ school_id: 1, user_id: 1 });
pomodoroSessionSchema.index({ user_id: 1, createdAt: -1 });
pomodoroSessionSchema.index({ status: 1 });
pomodoroSessionSchema.index({ type: 1 });
pomodoroSessionSchema.index({ 'timing.started_at': -1 });

// Índices compostos
pomodoroSessionSchema.index({ school_id: 1, user_id: 1, type: 1 });
pomodoroSessionSchema.index({ user_id: 1, 'timing.started_at': -1 });

// Middleware para calcular métricas antes de salvar
pomodoroSessionSchema.pre('save', function(next) {
  if (this.isModified('timing.actual_duration') || this.isModified('settings.planned_duration')) {
    const targetDuration = this.settings.planned_duration * 60;
    this.metrics.completion_rate = Math.min((this.timing.actual_duration / targetDuration) * 100, 100);
  }
  
  if (this.isModified('interruptions')) {
    this.metrics.interruption_count = this.interruptions.length;
  }
  
  next();
});

// Métodos estáticos
pomodoroSessionSchema.statics.findByUser = function(userId, filters = {}) {
  return this.find({ user_id: userId, ...filters })
    .populate('task_id', 'title subject priority')
    .sort({ 'timing.started_at': -1 });
};

pomodoroSessionSchema.statics.getUserStats = function(userId, dateRange = {}) {
  const match = { user_id: userId };
  
  if (dateRange.start || dateRange.end) {
    match['timing.started_at'] = {};
    if (dateRange.start) match['timing.started_at'].$gte = dateRange.start;
    if (dateRange.end) match['timing.started_at'].$lte = dateRange.end;
  }
  
  return this.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        totalSessions: { $sum: 1 },
        completedSessions: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
        },
        totalMinutes: { $sum: { $divide: ['$timing.actual_duration', 60] } },
        averageProductivity: { $avg: '$feedback.productivity_rating' },
        averageFocus: { $avg: '$feedback.focus_rating' },
        totalInterruptions: { $sum: '$metrics.interruption_count' }
      }
    }
  ]);
};

pomodoroSessionSchema.statics.getSchoolStats = function(schoolId, dateRange = {}) {
  const match = { school_id: schoolId };
  
  if (dateRange.start || dateRange.end) {
    match['timing.started_at'] = {};
    if (dateRange.start) match['timing.started_at'].$gte = dateRange.start;
    if (dateRange.end) match['timing.started_at'].$lte = dateRange.end;
  }
  
  return this.aggregate([
    { $match: match },
    {
      $group: {
        _id: '$user_id',
        totalSessions: { $sum: 1 },
        totalMinutes: { $sum: { $divide: ['$timing.actual_duration', 60] } },
        completionRate: {
          $avg: { $cond: [{ $eq: ['$status', 'completed'] }, 100, 0] }
        }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' },
    {
      $project: {
        userName: '$user.name',
        userEmail: '$user.email',
        totalSessions: 1,
        totalMinutes: 1,
        completionRate: 1
      }
    }
  ]);
};

// Métodos de instância
pomodoroSessionSchema.methods.pause = function() {
  if (this.status === 'running') {
    this.timing.paused_at = new Date();
    this.status = 'paused';
  }
  return this.save();
};

pomodoroSessionSchema.methods.resume = function() {
  if (this.status === 'paused' && this.timing.paused_at) {
    const pausedDuration = (new Date() - this.timing.paused_at) / 1000;
    this.timing.paused_duration += pausedDuration;
    this.timing.resumed_at = new Date();
    this.status = 'running';
    this.timing.paused_at = undefined;
  }
  return this.save();
};

pomodoroSessionSchema.methods.complete = function() {
  if (this.status === 'running' || this.status === 'paused') {
    this.timing.ended_at = new Date();
    this.status = 'completed';
    
    // Calcular duração real
    let actualDuration = (this.timing.ended_at - this.timing.started_at) / 1000;
    actualDuration -= this.timing.paused_duration;
    this.timing.actual_duration = Math.max(0, actualDuration);
  }
  return this.save();
};

pomodoroSessionSchema.methods.abandon = function() {
  this.timing.ended_at = new Date();
  this.status = 'abandoned';
  
  // Calcular duração real até o abandono
  let actualDuration = (this.timing.ended_at - this.timing.started_at) / 1000;
  actualDuration -= this.timing.paused_duration;
  this.timing.actual_duration = Math.max(0, actualDuration);
  
  return this.save();
};

pomodoroSessionSchema.methods.addInterruption = function(type, description, duration = 0) {
  this.interruptions.push({
    type,
    description,
    duration
  });
  return this.save();
};

module.exports = mongoose.model('PomodoroSession', pomodoroSessionSchema);