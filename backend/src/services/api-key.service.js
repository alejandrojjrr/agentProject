const ApiKey = require('../models/api-key.model');
const apiKeyConfig = require('../config/api-keys.config');

class ApiKeyService {
  /**
   * Create a new API key
   * @param {Object} data - API key data
   * @returns {Promise<Object>} Created API key
   */
  async createKey(data) {
    const { type = 'development', name, userId } = data;
    
    if (!apiKeyConfig.types.includes(type)) {
      throw new Error(`Invalid API key type. Must be one of: ${apiKeyConfig.types.join(', ')}`);
    }

    const apiKey = new ApiKey({
      name,
      user: userId,
      type,
      permissions: apiKeyConfig.defaultPermissions[type],
      usageLimit: apiKeyConfig.defaultLimits[type],
      expiresAt: ApiKey.getDefaultExpiration()
    });

    await apiKey.generateKey();
    return apiKey.save();
  }

  /**
   * Get API key by ID
   * @param {string} id - API key ID
   * @returns {Promise<Object>} API key
   */
  async getKeyById(id) {
    return ApiKey.findById(id);
  }

  /**
   * Get API key by key string
   * @param {string} key - API key string
   * @returns {Promise<Object>} API key
   */
  async getKeyByKey(key) {
    return ApiKey.findOne({ key });
  }

  /**
   * List API keys for a user
   * @param {string} userId - User ID
   * @param {Object} options - Query options
   * @returns {Promise<Array>} List of API keys
   */
  async listKeys(userId, options = {}) {
    const query = { user: userId };
    if (options.type) {
      query.type = options.type;
    }
    if (options.isActive !== undefined) {
      query.isActive = options.isActive;
    }
    return ApiKey.find(query).sort({ createdAt: -1 });
  }

  /**
   * Update API key
   * @param {string} id - API key ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated API key
   */
  async updateKey(id, updates) {
    const allowedUpdates = ['name', 'permissions', 'usageLimit', 'isActive'];
    const updateData = {};
    
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updateData[key] = updates[key];
      }
    });

    return ApiKey.findByIdAndUpdate(id, updateData, { new: true });
  }

  /**
   * Delete API key
   * @param {string} id - API key ID
   * @returns {Promise<Object>} Deleted API key
   */
  async deleteKey(id) {
    return ApiKey.findByIdAndDelete(id);
  }

  /**
   * Validate API key and check permissions
   * @param {string} key - API key string
   * @param {string} requiredPermission - Required permission
   * @returns {Promise<boolean>} Whether the key is valid and has permission
   */
  async validateKey(key, requiredPermission) {
    const apiKey = await this.getKeyByKey(key);
    if (!apiKey || !apiKey.isActive) {
      return false;
    }

    if (apiKey.isExpired()) {
      return false;
    }

    if (apiKey.hasReachedUsageLimit()) {
      return false;
    }

    if (requiredPermission && !apiKey.hasPermission(requiredPermission)) {
      return false;
    }

    await apiKey.incrementUsage();
    return true;
  }
}

module.exports = new ApiKeyService(); 