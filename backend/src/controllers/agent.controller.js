const Agent = require('../models/agent.model');
const AIService = require('../services/ai.service');

/**
 * Obtener todos los agentes del usuario
 */
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find({ user: req.user.id });
    res.json(agents.map(agent => agent.sanitizeConfig()));
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los agentes' });
  }
};

/**
 * Crear un nuevo agente
 */
exports.createAgent = async (req, res) => {
  try {
    const agentData = {
      ...req.body,
      user: req.user.id
    };

    const agent = new Agent(agentData);
    const validationErrors = agent.validateConfig();
    
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    await agent.save();
    res.status(201).json(agent.sanitizeConfig());
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el agente', error: error.message });
  }
};

/**
 * Obtener un agente por ID
 */
exports.getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!agent) {
      return res.status(404).json({ message: 'Agente no encontrado' });
    }

    res.json(agent.sanitizeConfig());
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el agente' });
  }
};

/**
 * Actualizar un agente
 */
exports.updateAgent = async (req, res) => {
  try {
    const agent = await Agent.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!agent) {
      return res.status(404).json({ message: 'Agente no encontrado' });
    }

    Object.assign(agent, req.body);
    const validationErrors = agent.validateConfig();
    
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    await agent.save();
    res.json(agent.sanitizeConfig());
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el agente', error: error.message });
  }
};

/**
 * Eliminar un agente
 */
exports.deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    
    if (!agent) {
      return res.status(404).json({ message: 'Agente no encontrado' });
    }

    res.json({ message: 'Agente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el agente' });
  }
};

// Manejar chat con el agente
exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    const agentId = req.params.id;

    // Obtener el agente
    const agent = await Agent.findOne({
      _id: agentId,
      user: req.user._id,
      isActive: true
    });

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    // Crear instancia del servicio AI con la configuración del agente
    const aiService = new AIService(agent.apiConfig);

    // Enviar mensaje y obtener respuesta
    const response = await aiService.chat([
      { role: 'user', content: message }
    ]);

    res.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      message: 'Error processing chat message',
      error: error.message 
    });
  }
}; 