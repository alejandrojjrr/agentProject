const express = require('express');
const router = express.Router();
const { authenticateJWT, checkPermission } = require('../middleware/auth.middleware');
const agentController = require('../controllers/agent.controller');

// Middleware para todas las rutas
router.use(authenticateJWT);

// Rutas para agentes
router.get('/', checkPermission('agents:read'), agentController.getAllAgents);
router.post('/', checkPermission('agents:write'), agentController.createAgent);
router.get('/:id', checkPermission('agents:read'), agentController.getAgentById);
router.put('/:id', checkPermission('agents:write'), agentController.updateAgent);
router.delete('/:id', checkPermission('agents:delete'), agentController.deleteAgent);

// Ruta para chat
router.post('/:id/chat', agentController.chat);

module.exports = router; 