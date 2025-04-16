const mongoose = require('mongoose');
const crypto = require('crypto');
const apiKeyConfig = require('../config/api-keys.config');

const apiKeySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  key: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: apiKeyConfig.types
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  permissions: [{
    type: String,
    required: true
  }],
  usageCount: {
    type: Number,
    default: 0
  },
  usageLimit: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUsedAt: {
    type: Date
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes
apiKeySchema.index({ user: 1, createdAt: -1 });
apiKeySchema.index({ key: 1 }, { unique: true });

// Generate a new API key
apiKeySchema.methods.generateKey = async function() {
  const buffer = await new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buf) => {
      if (err) reject(err);
      resolve(buf);
    });
  });
  this.key = buffer.toString('base64');
};

// Check if the API key has expired
apiKeySchema.methods.isExpired = function() {
  return Date.now() >= this.expiresAt;
};

// Check if usage limit has been reached
apiKeySchema.methods.hasReachedUsageLimit = function() {
  return this.usageCount >= this.usageLimit;
};

// Check if the API key has a specific permission
apiKeySchema.methods.hasPermission = function(permission) {
  return this.permissions.includes(permission);
};

// Increment usage count
apiKeySchema.methods.incrementUsage = async function() {
  this.usageCount += 1;
  this.lastUsedAt = new Date();
  return this.save();
};

// Static method to get default expiration date
apiKeySchema.statics.getDefaultExpiration = function() {
  return new Date(Date.now() + apiKeyConfig.expirationDays * 24 * 60 * 60 * 1000);
};

// Hide sensitive information when converting to JSON
apiKeySchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

const ApiKey = mongoose.model('ApiKey', apiKeySchema);

module.exports = ApiKey; 