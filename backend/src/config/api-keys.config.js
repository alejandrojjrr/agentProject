module.exports = {
  // Available API key types
  types: ['standard', 'admin', 'readonly'],

  // Default expiration in days
  expirationDays: 90,

  // Default usage limits by type
  usageLimits: {
    standard: 10000,
    admin: 50000,
    readonly: 5000
  },

  // Default permissions by type
  defaultPermissions: {
    standard: [
      'agents:read',
      'agents:write',
      'chat:read',
      'chat:write'
    ],
    admin: [
      'agents:read',
      'agents:write',
      'agents:delete',
      'chat:read',
      'chat:write',
      'chat:delete',
      'admin:access'
    ],
    readonly: [
      'agents:read',
      'chat:read'
    ]
  },

  // List of all possible permissions
  permissions: [
    'agents:read',
    'agents:write',
    'agents:delete',
    'chat:read',
    'chat:write',
    'chat:delete',
    'admin:access'
  ]
}; 