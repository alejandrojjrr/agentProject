const jwt = require('jsonwebtoken');
const config = require('../config');
const ApiKey = require('../models/api-key.model');

/**
 * Middleware para verificar el token JWT
 */
const authenticateJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = {
      id: decoded.userId,
      permissions: decoded.permissions || []
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

/**
 * Middleware para verificar API key
 */
const authenticateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
      return res.status(401).json({ message: 'No API key provided' });
    }

    const key = await ApiKey.findOne({ key: apiKey });
    
    if (!key || !key.isActive) {
      return res.status(401).json({ message: 'Invalid API key' });
    }

    if (key.isExpired()) {
      return res.status(401).json({ message: 'API key has expired' });
    }

    if (key.hasReachedUsageLimit()) {
      return res.status(429).json({ message: 'API key usage limit reached' });
    }

    req.apiKey = key;
    await key.incrementUsage();
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error validating API key' });
  }
};

/**
 * Middleware para verificar permisos específicos
 */
const checkPermission = (permission) => {
  return async (req, res, next) => {
    try {
      if (req.user) {
        // Verificar permisos de usuario
        if (!req.user.permissions?.includes(permission)) {
          return res.status(403).json({ message: 'Insufficient permissions' });
        }
      } else if (req.apiKey) {
        // Verificar permisos de API key
        if (!req.apiKey.hasPermission(permission)) {
          return res.status(403).json({ message: 'Insufficient API key permissions' });
        }
      } else {
        return res.status(401).json({ message: 'Authentication required' });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Error checking permissions' });
    }
  };
};

module.exports = {
  authenticateJWT,
  authenticateApiKey,
  checkPermission
}; 