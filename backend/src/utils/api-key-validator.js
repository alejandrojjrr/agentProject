/**
 * Valida el formato de una API key según el proveedor
 * @param {string} provider - El proveedor de la API
 * @param {string} apiKey - La API key a validar
 * @returns {boolean} - True si la API key es válida
 */
const validateApiKey = (provider, apiKey) => {
  if (!apiKey || typeof apiKey !== 'string') {
    return false;
  }

  const validators = {
    openai: (key) => {
      // OpenAI API keys comienzan con 'sk-' y tienen 51 caracteres
      return /^sk-[A-Za-z0-9]{48}$/.test(key);
    },
    anthropic: (key) => {
      // Anthropic API keys comienzan con 'sk-ant-' y tienen longitud variable
      return /^sk-ant-[A-Za-z0-9]{32,}$/.test(key);
    },
    google: (key) => {
      // Google API keys son strings alfanuméricos
      return /^[A-Za-z0-9_-]{39}$/.test(key);
    },
    custom: (key) => {
      // Para proveedores personalizados, validación básica
      return key.length >= 16 && key.length <= 128;
    }
  };

  const validator = validators[provider];
  return validator ? validator(apiKey) : false;
};

/**
 * Sanitiza una API key para logging o almacenamiento seguro
 * @param {string} apiKey - La API key a sanitizar
 * @returns {string} - La API key sanitizada
 */
const sanitizeApiKey = (apiKey) => {
  if (!apiKey || typeof apiKey !== 'string') {
    return '';
  }
  
  const length = apiKey.length;
  if (length <= 8) {
    return '*'.repeat(length);
  }
  
  return apiKey.substring(0, 4) + '*'.repeat(length - 8) + apiKey.substring(length - 4);
};

module.exports = {
  validateApiKey,
  sanitizeApiKey
}; 