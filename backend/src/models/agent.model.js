const mongoose = require('mongoose');
const { validateApiKey } = require('../utils/api-key-validator');

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  provider: {
    type: String,
    required: true,
    enum: ['openai', 'anthropic', 'google', 'custom']
  },
  apiConfig: {
    apiKey: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          const validModels = {
            openai: ['gpt-4', 'gpt-3.5-turbo', 'gpt-3.5-turbo-16k'],
            anthropic: ['claude-2', 'claude-instant'],
            google: ['gemini-pro', 'gemini-ultra']
          };
          return validModels[this.parent().parent().provider]?.includes(v) || this.parent().parent().provider === 'custom';
        },
        message: props => `Invalid model for provider ${props.value}`
      }
    },
    additionalConfig: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      validate: {
        validator: function(v) {
          const provider = this.parent().parent().provider;
          const configValidators = {
            openai: (config) => {
              return !config.temperature || (config.temperature >= 0 && config.temperature <= 2);
            },
            anthropic: (config) => {
              return !config.max_tokens || (config.max_tokens >= 1 && config.max_tokens <= 100000);
            },
            google: (config) => {
              return !config.temperature || (config.temperature >= 0 && config.temperature <= 1);
            }
          };
          return !configValidators[provider] || configValidators[provider](v);
        },
        message: props => `Invalid additional configuration for provider`
      }
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
  this.updatedAt = new Date();
  next();
});

// Método para sanitizar la configuración antes de enviarla
agentSchema.methods.sanitizeConfig = function() {
  const config = this.toObject();
  delete config.apiConfig.apiKey;
  return config;
};

// Método para validar la configuración completa
agentSchema.methods.validateConfig = function() {
  const errors = [];
  
  console.log('Validating config:', JSON.stringify(this.toObject(), null, 2));
  
  if (!this.apiConfig.apiKey) {
    console.log('Missing API key');
    errors.push('API key is required');
  }
  
  if (!this.apiConfig.model) {
    console.log('Missing model');
    errors.push('Model is required');
  }
  
  if (this.provider === 'custom' && !this.apiConfig.additionalConfig?.get('endpoint')) {
    console.log('Missing endpoint for custom provider');
    errors.push('Custom provider requires an endpoint');
  }
  
  console.log('Validation errors:', errors);
  return errors.length === 0 ? null : errors;
};

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent; 