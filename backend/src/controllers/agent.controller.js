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
    console.log('Received agent data:', JSON.stringify(req.body, null, 2));
    
    const agentData = {
      ...req.body,
      user: req.user.id
    };

    console.log('Creating agent with data:', JSON.stringify(agentData, null, 2));

    const agent = new Agent(agentData);
    const validationErrors = agent.validateConfig();
    
    if (validationErrors) {
      console.log('Validation errors:', validationErrors);
      return res.status(400).json({ errors: validationErrors });
    }

    await agent.save();
    const savedAgent = agent.toObject();
    delete savedAgent.apiConfig.apiKey;  // No devolver la API key
    res.status(201).json(savedAgent);
  } catch (error) {
    console.error('Error details:', error);
    res.status(400).json({ 
      message: 'Error al crear el agente', 
      error: error.message,
      details: error.errors ? Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      })) : undefined
    });
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
    console.log('Attempting to delete agent:', req.params.id, 'for user:', req.user.id);
    
    const agent = await Agent.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id 
    });
    
    if (!agent) {
      console.log('Agent not found for deletion');
      return res.status(404).json({ message: 'Agente no encontrado' });
    }

    console.log('Agent deleted successfully:', agent._id);
    res.json({ message: 'Agente eliminado correctamente' });
  } catch (error) {
    console.error('Error deleting agent:', error);
    res.status(500).json({ 
      message: 'Error al eliminar el agente',
      error: error.message 
    });
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
      user: req.user.id,
      isActive: true
    });

    if (!agent) {
      console.log('Agent not found. ID:', agentId, 'User:', req.user.id);
      return res.status(404).json({ message: 'Agent not found' });
    }

    console.log('Found agent:', agent);

    // Crear instancia del servicio AI con la configuración del agente
    const aiService = new AIService({
      provider: agent.provider,
      apiKey: agent.apiConfig.apiKey,
      model: agent.apiConfig.model,
      endpoint: agent.apiConfig.additionalConfig?.get('endpoint')
    });

    // Preparar los mensajes incluyendo el system prompt si existe
    const messages = [];
    if (agent.systemPrompt) {
      messages.push({ role: 'system', content: agent.systemPrompt });
    }
    messages.push({ role: 'user', content: message });

    // Enviar mensaje y obtener respuesta
    const response = await aiService.chat(messages);

    res.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      message: 'Error processing chat message',
      error: error.message 
    });
  }
}; 