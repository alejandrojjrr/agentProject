const { cleanEnv, str, port, num } = require('envalid');
const path = require('path');

// Cargar variables de entorno desde .env
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Validar y limpiar variables de entorno
const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
  PORT: port({ default: 5000 }),
  MONGODB_URI: str(),
  JWT_SECRET: str(),
  JWT_EXPIRATION: str({ default: '24h' }),
  RATE_LIMIT_WINDOW: num({ default: 15 * 60 * 1000 }), // 15 minutos en ms
  RATE_LIMIT_MAX: num({ default: 100 }), // máximo de solicitudes por ventana
  CORS_ORIGIN: str({ default: 'http://localhost:3000' }),
  API_KEY_EXPIRATION_DAYS: num({ default: 90 }),
});

// Configuración de la aplicación
const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  mongo: {
    uri: env.MONGODB_URI,
    options: {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiration: env.JWT_EXPIRATION,
    refreshExpiration: '7d',
  },
  security: {
    rateLimit: {
      windowMs: env.RATE_LIMIT_WINDOW,
      max: env.RATE_LIMIT_MAX,
    },
    cors: {
      origin: env.CORS_ORIGIN,
      credentials: true,
    },
  },
  apiKeys: {
    expirationDays: env.API_KEY_EXPIRATION_DAYS,
    types: ['read', 'write', 'admin'],
  },
  logging: {
    level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: env.NODE_ENV === 'production' ? 'json' : 'pretty',
  },
};

module.exports = config; 