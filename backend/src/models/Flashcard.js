const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  school_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
    index: true
  },
  question: {
    type: String,
    required: [true, 'A pergunta é obrigatória.'],
    trim: true,
    maxlength: [500, 'A pergunta não pode exceder 500 caracteres.']
  },
  answer: {
    type: String,
    required: [true, 'A resposta é obrigatória.'],
    trim: true,
    maxlength: [1000, 'A resposta não pode exceder 1000 caracteres.']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }]
}, {
  timestamps: true
});

flashcardSchema.index({ user_id: 1, school_id: 1 });

module.exports = mongoose.model('Flashcard', flashcardSchema);