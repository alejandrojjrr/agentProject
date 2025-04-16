const Agent = require('../models/agent.model');
const AIService = require('../services/ai.service');

// Listar todos los agentes del usuario
exports.getUserAgents = async (req, res) => {
  try {
    const agents = await Agent.find({ user: req.user._id, isActive: true })
      .select('-apiConfig.apiKey')
      .sort({ updatedAt: -1 });
    res.json(agents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching agents' });
  }
};

// Obtener detalles de un agente específico
exports.getAgent = async (req, res) => {
  try {
    const agent = await Agent.findOne({
      _id: req.params.id,
      user: req.user._id,
      isActive: true
    }).select('-apiConfig.apiKey');

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    res.json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching agent' });
  }
};

// Crear un nuevo agente
exports.createAgent = async (req, res) => {
  try {
    const { name, description, apiConfig } = req.body;

    const agent = new Agent({
      name,
      description,
      apiConfig,
      user: req.user._id
    });

    await agent.save();
    res.status(201).json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating agent' });
  }
};

// Actualizar un agente existente
exports.updateAgent = async (req, res) => {
  try {
    const { name, description, apiConfig } = req.body;

    const agent = await Agent.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name, description, apiConfig },
      { new: true, runValidators: true }
    ).select('-apiConfig.apiKey');

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    res.json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating agent' });
  }
};

// Eliminar un agente (soft delete)
exports.deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isActive: false },
      { new: true }
    );

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    res.json({ message: 'Agent deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting agent' });
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