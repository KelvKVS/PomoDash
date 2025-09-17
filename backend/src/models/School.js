const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome da escola é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome não pode exceder 100 caracteres']
  },
  
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens']
  },
  
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Email inválido'
    ]
  },
  
  phone: {
    type: String,
    trim: true,
    match: [/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone deve estar no formato (XX) XXXXX-XXXX']
  },
  
  address: {
    street: { type: String, trim: true },
    number: { type: String, trim: true },
    complement: { type: String, trim: true },
    neighborhood: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true, maxlength: 2 },
    zipCode: { 
      type: String, 
      trim: true,
      match: [/^\d{5}-?\d{3}$/, 'CEP inválido']
    }
  },
  
  settings: {
    pomodoroDefaultTime: {
      type: Number,
      default: 25,
      min: [5, 'Tempo mínimo do Pomodoro é 5 minutos'],
      max: [60, 'Tempo máximo do Pomodoro é 60 minutos']
    },
    shortBreakTime: {
      type: Number,
      default: 5,
      min: [2, 'Pausa curta mínima é 2 minutos'],
      max: [15, 'Pausa curta máxima é 15 minutos']
    },
    longBreakTime: {
      type: Number,
      default: 30,
      min: [10, 'Pausa longa mínima é 10 minutos'],
      max: [60, 'Pausa longa máxima é 60 minutos']
    },
    longBreakInterval: {
      type: Number,
      default: 4,
      min: 2,
      max: 8
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    },
    language: {
      type: String,
      enum: ['pt-BR', 'en-US'],
      default: 'pt-BR'
    },
    timezone: {
      type: String,
      default: 'America/Sao_Paulo'
    }
  },
  
  plan: {
    type: String,
    enum: ['free', 'basic', 'premium'],
    default: 'free'
  },
  
  limits: {
    maxUsers: {
      type: Number,
      default: 50
    },
    maxStorage: {
      type: Number, // em MB
      default: 100
    }
  },
  
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  
  features: {
    flashcards: { type: Boolean, default: true },
    reports: { type: Boolean, default: true },
    integrations: { type: Boolean, default: false },
    customThemes: { type: Boolean, default: false }
  },
  
  subscription: {
    startDate: { type: Date, default: Date.now },
    endDate: Date,
    isActive: { type: Boolean, default: true }
  },
  
  // Auditoria
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual para contar usuários da escola
schoolSchema.virtual('userCount', {
  ref: 'User',
  localField: '_id',
  foreignField: 'school_id',
  count: true
});

// Middleware para gerar slug antes de salvar
schoolSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');
  }
  next();
});

// Índices para otimização
schoolSchema.index({ slug: 1 });
schoolSchema.index({ email: 1 });
schoolSchema.index({ status: 1 });
schoolSchema.index({ 'subscription.endDate': 1 });

// Métodos estáticos
schoolSchema.statics.findActive = function() {
  return this.find({ status: 'active' });
};

schoolSchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug, status: 'active' });
};

// Métodos de instância
schoolSchema.methods.isSubscriptionActive = function() {
  if (!this.subscription.endDate) return true;
  return new Date() <= this.subscription.endDate;
};

schoolSchema.methods.canAddUsers = function(additionalUsers = 1) {
  return (this.userCount || 0) + additionalUsers <= this.limits.maxUsers;
};

module.exports = mongoose.model('School', schoolSchema);