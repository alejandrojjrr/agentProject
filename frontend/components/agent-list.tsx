"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, Plus, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Agent {
  _id: string
  name: string
  description: string
  isActive: boolean
  createdAt: string
}

export default function AgentList({ onSelectAgent }: { onSelectAgent: (agent: Agent) => void }) {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchAgents()
  }, [])

  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        console.log('No token found, redirecting to login')
        router.push('/login')
        return
      }

      const response = await fetch('http://localhost:5000/api/agents', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 401 || response.status === 403) {
        console.log('Token expired or invalid, redirecting to login')
        localStorage.removeItem('token')
        router.push('/login')
        return
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to fetch agents')
      }

      const data = await response.json()
      setAgents(data)
    } catch (error) {
      console.error('Error fetching agents:', error)
      setAgents([])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAgent = async (agentId: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch(`http://localhost:5000/api/agents/${agentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to delete agent')
      }

      setAgents(agents.filter(agent => agent._id !== agentId))
    } catch (error) {
      console.error('Error deleting agent:', error)
      alert('Error al eliminar el agente: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  if (loading) {
    return <div className="text-center">Loading agents...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Agents</h2>
        <Button 
          onClick={() => onSelectAgent({} as Agent)}
          className="bg-[#d08c60] hover:bg-[#c77c3c] button-glow copper-shine"
        >
          <Plus className="mr-2 h-4 w-4" /> Create New Agent
        </Button>
      </div>

      {agents.length === 0 ? (
        <Card className="border-zinc-800 tech-card circuit-pattern">
          <CardContent className="p-6 text-center">
            <Bot className="mx-auto h-12 w-12 text-[#d08c60] mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Agents Yet</h3>
            <p className="text-zinc-400 mb-4">Create your first AI agent to get started</p>
            <Button 
              onClick={() => onSelectAgent({} as Agent)}
              className="bg-[#d08c60] hover:bg-[#c77c3c] button-glow copper-shine"
            >
              <Plus className="mr-2 h-4 w-4" /> Create New Agent
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent._id} className="border-zinc-800 tech-card circuit-pattern">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Bot className="h-6 w-6 text-[#d08c60] mr-2" />
                    <h3 className="font-semibold">{agent.name}</h3>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelectAgent(agent)}
                      className="text-[#d08c60] hover:bg-zinc-800"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAgent(agent._id)}
                      className="text-red-500 hover:bg-zinc-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 mb-4">{agent.description}</p>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>Created: {new Date(agent.createdAt).toLocaleDateString()}</span>
                  <span className={`px-2 py-1 rounded-full ${agent.isActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {agent.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 