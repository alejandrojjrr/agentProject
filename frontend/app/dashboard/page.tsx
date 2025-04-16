"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import AgentList from "@/components/agent-list"
import AgentEditor from "@/components/agent-editor"
import { useRouter } from "next/navigation"

interface Agent {
  _id: string
  name: string
  description: string
  isActive: boolean
  createdAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch('http://localhost:5000/api/auth/check', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem('token')
        router.push('/login')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('token')
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent)
  }

  const handleBackToList = () => {
    setSelectedAgent(null)
  }

  const handleSaveSuccess = () => {
    handleBackToList()
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">AI Agent Dashboard</h1>
          <p className="text-slate-400">Manage and customize your AI agents</p>
        </div>
        <Button 
          variant="destructive" 
          className="button-glow"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      {selectedAgent ? (
        <div>
          <div className="mb-4">
            <Button
              variant="outline"
              onClick={handleBackToList}
              className="mb-4"
            >
              ← Back to Agents
            </Button>
          </div>
          <AgentEditor 
            agent={selectedAgent} 
            onSaveSuccess={handleSaveSuccess}
          />
        </div>
      ) : (
        <AgentList onSelectAgent={handleSelectAgent} />
      )}
    </div>
  )
}
