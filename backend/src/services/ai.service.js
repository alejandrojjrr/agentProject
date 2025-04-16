const axios = require('axios');

class AIService {
  constructor(config) {
    this.type = config.type;
    this.endpoint = config.endpoint;
    this.apiKey = config.apiKey;
  }

  async chat(messages) {
    try {
      switch (this.type) {
        case 'openai':
          return await this.chatWithOpenAI(messages);
        case 'anthropic':
          return await this.chatWithAnthropic(messages);
        case 'custom':
          return await this.chatWithCustomAPI(messages);
        default:
          throw new Error('Unsupported AI provider');
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  async chatWithOpenAI(messages) {
    try {
      const response = await axios.post(
        `${this.endpoint}/chat/completions`,
        {
          model: "gpt-4",
          messages: messages,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        role: 'assistant',
        content: response.data.choices[0].message.content
      };
    } catch (error) {
      throw new Error(`OpenAI API Error: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async chatWithAnthropic(messages) {
    try {
      // Convertir el formato de mensajes al formato de Anthropic
      const prompt = messages
        .map(msg => `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
        .join('\n\n');

      const response = await axios.post(
        `${this.endpoint}/messages`,
        {
          model: "claude-3-opus-20240229",
          max_tokens: 1024,
          messages: [{
            role: "user",
            content: prompt
          }]
        },
        {
          headers: {
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        role: 'assistant',
        content: response.data.content[0].text
      };
    } catch (error) {
      throw new Error(`Anthropic API Error: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async chatWithCustomAPI(messages) {
    try {
      const response = await axios.post(
        this.endpoint,
        { messages },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        role: 'assistant',
        content: response.data.response || response.data.message || response.data.content
      };
    } catch (error) {
      throw new Error(`Custom API Error: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  static getDefaultEndpoint(type) {
    switch (type) {
      case 'openai':
        return 'https://api.openai.com/v1';
      case 'anthropic':
        return 'https://api.anthropic.com/v1';
      default:
        return '';
    }
  }
}

module.exports = AIService; 