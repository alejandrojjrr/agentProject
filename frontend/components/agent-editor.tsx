"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Bot, Brain, Database, FileText, MessageSquare, Save, Settings, Upload, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

interface Agent {
  _id?: string
  name: string
  description: string
  apiConfig?: {
    type: string
    endpoint: string
    apiKey: string
    additionalConfig?: Record<string, any>
  }
  isActive?: boolean
}

interface AgentEditorProps {
  agent: Agent
  onSaveSuccess?: () => void
}

const DEFAULT_ENDPOINTS = {
  openai: 'https://api.openai.com/v1',
  anthropic: 'https://api.anthropic.com/v1',
  custom: ''
};

export default function AgentEditor({ agent, onSaveSuccess }: AgentEditorProps) {
  const router = useRouter()
  const [agentName, setAgentName] = useState(agent.name || "")
  const [description, setDescription] = useState(agent.description || "")
  const [apiConfig, setApiConfig] = useState(agent.apiConfig || {
    type: "openai",
    endpoint: "",
    apiKey: "",
    additionalConfig: {}
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [messages, setMessages] = useState([
    { role: "user", content: "How do I reset my password?" },
    {
      role: "assistant",
      content:
        "To reset your password, please go to the login page and click on the 'Forgot Password' link. You'll receive an email with instructions to create a new password.",
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    if (agent) {
      setAgentName(agent.name || "")
      setDescription(agent.description || "")
      setApiConfig(agent.apiConfig || {
        type: "openai",
        endpoint: "",
        apiKey: "",
        additionalConfig: {}
      })
    }
  }, [agent])

  const handleApiTypeChange = (type: string) => {
    setApiConfig({
      ...apiConfig,
      type,
      endpoint: DEFAULT_ENDPOINTS[type as keyof typeof DEFAULT_ENDPOINTS]
    });
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      setMessages([...messages, { role: "user", content: newMessage }]);
      setNewMessage("");

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch(`http://localhost:5000/api/agents/${agent._id}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            message: newMessage
          })
        });

        if (!response.ok) {
          throw new Error('Failed to get AI response');
        }

        const data = await response.json();
        setMessages(prev => [...prev, data]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I encountered an error while processing your message. Please try again later.'
        }]);
      }
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true)
      setError("")

      // Validación básica
      if (!agentName.trim()) {
        throw new Error("Agent name is required")
      }
      if (!description.trim()) {
        throw new Error("Description is required")
      }

      // Set default endpoints for known API types
      if (apiConfig.type === 'openai') {
        apiConfig.endpoint = 'https://api.openai.com/v1'
      } else if (apiConfig.type === 'anthropic') {
        apiConfig.endpoint = 'https://api.anthropic.com'
      }

      // Validate required fields
      if (!apiConfig.type || !apiConfig.apiKey) {
        throw new Error("API type and API key are required")
      }
      
      // Only validate endpoint for custom API type
      if (apiConfig.type === 'custom' && !apiConfig.endpoint) {
        throw new Error("Endpoint is required for custom API")
      }

      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      const agentData = {
        name: agentName,
        description,
        provider: apiConfig.type,
        apiConfig: {
          apiKey: apiConfig.apiKey,
          model: apiConfig.type === 'openai' ? 'gpt-3.5-turbo' : 
                 apiConfig.type === 'anthropic' ? 'claude-2' : 
                 'custom',
          additionalConfig: new Map(
            apiConfig.type === 'custom' 
              ? Object.entries({ endpoint: apiConfig.endpoint })
              : []
          )
        },
        isActive: true
      }

      console.log('Sending agent data:', JSON.stringify({
        ...agentData,
        apiConfig: {
          ...agentData.apiConfig,
          additionalConfig: Object.fromEntries(agentData.apiConfig.additionalConfig)
        }
      }, null, 2));

      const url = agent._id 
        ? `http://localhost:5000/api/agents/${agent._id}` 
        : 'http://localhost:5000/api/agents'
      
      const method = agent._id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(agentData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to save agent')
      }

      const savedAgent = await response.json()
      
      // Actualizar el ID del agente si es nuevo
      if (!agent._id) {
        agent._id = savedAgent._id
      }

      // Si todo fue exitoso
      if (onSaveSuccess) {
        onSaveSuccess()
      } else {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error saving agent:', error)
      setError(error instanceof Error ? error.message : 'An error occurred while saving')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left Panel - Configuration */}
      <div className="lg:col-span-1">
        <Card className="border-zinc-800 tech-card circuit-pattern">
          <CardContent className="p-6">
            {error && (
              <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-500">
                {error}
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="agentName" className="mb-2 block text-sm font-medium">
                Agent Name
              </label>
              <Input
                id="agentName"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="border-zinc-700 bg-zinc-800/50 text-zinc-100"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="mb-2 block text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-md border border-zinc-700 bg-zinc-800/50 p-2 text-zinc-100"
                rows={3}
              />
            </div>

            <Tabs defaultValue="settings" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-zinc-800/50">
                <TabsTrigger
                  value="knowledge"
                  className="text-xs data-[state=active]:bg-zinc-700/70 data-[state=active]:text-[#d08c60]"
                >
                  <Brain className="mr-1 h-3 w-3" /> Knowledge
                </TabsTrigger>
                <TabsTrigger
                  value="data"
                  className="text-xs data-[state=active]:bg-zinc-700/70 data-[state=active]:text-[#d08c60]"
                >
                  <Database className="mr-1 h-3 w-3" /> Data
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="text-xs data-[state=active]:bg-zinc-700/70 data-[state=active]:text-[#d08c60]"
                >
                  <Settings className="mr-1 h-3 w-3" /> Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="knowledge" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Knowledge Base</label>
                  <div className="rounded-md border border-zinc-700 bg-zinc-800/30 p-3">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-[#e3a857]" />
                      <span className="text-sm">Product Documentation</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full border-zinc-700 text-xs hover:border-[#d08c60] hover:text-[#d08c60]"
                  >
                    <Upload className="mr-1 h-3 w-3" /> Upload Knowledge
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="data" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Sources</label>
                  <div className="rounded-md border border-zinc-700 bg-zinc-800/30 p-3">
                    <div className="flex items-center">
                      <Database className="mr-2 h-4 w-4 text-[#e3a857]" />
                      <span className="text-sm">Customer Database</span>
                    </div>
                  </div>
                  <div className="rounded-md border border-zinc-700 bg-zinc-800/30 p-3">
                    <div className="flex items-center">
                      <Database className="mr-2 h-4 w-4 text-[#e3a857]" />
                      <span className="text-sm">Product Catalog</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full border-zinc-700 text-xs hover:border-[#d08c60] hover:text-[#d08c60]"
                  >
                    <Plus className="mr-1 h-3 w-3" /> Add Data Source
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">API Type</label>
                  <select 
                    value={apiConfig.type}
                    onChange={(e) => handleApiTypeChange(e.target.value)}
                    className="w-full rounded-md border border-zinc-700 bg-zinc-800/30 p-2 text-sm text-zinc-100"
                  >
                    <option value="openai">OpenAI (GPT-4, GPT-3.5)</option>
                    <option value="anthropic">Anthropic (Claude)</option>
                    <option value="custom">Custom API</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    API Endpoint
                    {apiConfig.type !== 'custom' && (
                      <span className="ml-2 text-xs text-zinc-400">(Pre-configured for {apiConfig.type})</span>
                    )}
                  </label>
                  <Input
                    value={apiConfig.endpoint}
                    onChange={(e) => setApiConfig({...apiConfig, endpoint: e.target.value})}
                    disabled={apiConfig.type !== 'custom'}
                    placeholder={apiConfig.type === 'custom' ? 'Enter your API endpoint' : undefined}
                    className="border-zinc-700 bg-zinc-800/30 text-zinc-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    API Key
                    <span className="ml-2 text-xs text-zinc-400">
                      (Get from {apiConfig.type === 'openai' ? 'OpenAI' : apiConfig.type === 'anthropic' ? 'Anthropic' : 'your provider'})
                    </span>
                  </label>
                  <Input
                    type="password"
                    value={apiConfig.apiKey}
                    onChange={(e) => setApiConfig({...apiConfig, apiKey: e.target.value})}
                    placeholder={`Enter your ${apiConfig.type} API key`}
                    className="border-zinc-700 bg-zinc-800/30 text-zinc-100"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button 
              onClick={handleSave}
              disabled={saving}
              className="mt-6 w-full bg-[#d08c60] hover:bg-[#c77c3c] button-glow copper-shine btn-primary"
            >
              {saving ? (
                "Saving..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Agent
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Preview */}
      <div className="lg:col-span-2">
        <Card className="border-zinc-800 nebula-bg">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#d08c60]">Agent Preview</h3>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-[#e3a857]"></div>
                <span className="text-sm text-[#e3a857]">Active</span>
              </div>
            </div>

            <div className="mb-4 rounded-lg border border-zinc-700 bg-[#030303] p-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-[#e3a857]" />
                <span className="font-medium text-[#d08c60]">{agentName}</span>
              </div>
            </div>

            <div className="mb-4 h-80 overflow-y-auto rounded-lg border border-zinc-700 bg-[#030303] p-4">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-[#d08c60] text-white" : "bg-zinc-800/50 text-zinc-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Type a message to test your agent..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="border-zinc-700 bg-zinc-800/30 text-zinc-100"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-[#d08c60] hover:bg-[#c77c3c] button-glow copper-shine btn-primary"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
