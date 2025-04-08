"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Bot, Brain, Database, FileText, MessageSquare, Save, Settings, Upload, Plus } from "lucide-react"

export default function AgentEditor() {
  const [agentName, setAgentName] = useState("Customer Support Agent")
  const [messages, setMessages] = useState([
    { role: "user", content: "How do I reset my password?" },
    {
      role: "assistant",
      content:
        "To reset your password, please go to the login page and click on the 'Forgot Password' link. You'll receive an email with instructions to create a new password.",
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { role: "user", content: newMessage }])
      setNewMessage("")

      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm a simulated response from your AI agent. In a real implementation, this would be connected to your backend AI service.",
          },
        ])
      }, 1000)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left Panel - Configuration */}
      <div className="lg:col-span-1">
        <Card className="border-zinc-800 tech-card circuit-pattern">
          <CardContent className="p-6">
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

            <Tabs defaultValue="knowledge" className="w-full">
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
                <div className="rounded-md border border-dashed border-zinc-700 bg-zinc-800/30 p-4 text-center">
                  <FileText className="mx-auto mb-2 h-8 w-8 text-zinc-500" />
                  <p className="mb-2 text-sm text-zinc-400">Drag and drop files or click to upload</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 text-xs hover:border-[#d08c60] hover:text-[#d08c60]"
                  >
                    <Upload className="mr-1 h-3 w-3" /> Upload Files
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-md border border-zinc-700 bg-zinc-800/30 p-2">
                    <span className="text-sm">product-manual.pdf</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-zinc-400 hover:text-[#d08c60]">
                      ×
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-zinc-700 bg-zinc-800/30 p-2">
                    <span className="text-sm">faq.docx</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-zinc-400 hover:text-[#d08c60]">
                      ×
                    </Button>
                  </div>
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
                  <label className="text-sm font-medium">Model</label>
                  <select className="w-full rounded-md border border-zinc-700 bg-zinc-800/30 p-2 text-sm text-zinc-100">
                    <option>GPT-4</option>
                    <option>Claude 3</option>
                    <option>Llama 3</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Temperature</label>
                  <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="w-full" />
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>Precise</span>
                    <span>Creative</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button className="mt-6 w-full bg-[#d08c60] hover:bg-[#c77c3c] button-glow copper-shine btn-primary">
              <Save className="mr-2 h-4 w-4" /> Save Agent
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

            <div className="flex space-x-2">
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
