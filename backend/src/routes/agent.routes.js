const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agent.controller');
const { authenticate } = require('../middleware/auth.middleware');

// Todas las rutas requieren autenticación
router.use(authenticate);

// Rutas para agentes
router.get('/', agentController.getUserAgents);
router.get('/:id', agentController.getAgent);
router.post('/', agentController.createAgent);
router.put('/:id', agentController.updateAgent);
router.delete('/:id', agentController.deleteAgent);

// Ruta para chat
router.post('/:id/chat', agentController.chat);

module.exports = router; 