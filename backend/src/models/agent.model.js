const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  apiConfig: {
    type: {
      type: String,
      required: true,
      enum: ['openai', 'anthropic', 'custom']
    },
    endpoint: {
      type: String,
      required: true
    },
    apiKey: {
      type: String,
      required: true
    },
    additionalConfig: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar updatedAt
agentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Agent', agentSchema); 